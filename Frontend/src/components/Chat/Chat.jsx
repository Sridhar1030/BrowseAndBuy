import React, { useEffect, useRef, useState } from "react";
import LogoSearch from "./LogoSearch.jsx";
import "./Chat.css";
import axios from "axios";
import Conversation from "./Conversation.jsx";
import ChatBox from "./ChatBox.jsx";
import { io } from "socket.io-client";

function Chat() {
    const [chats, setChats] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [sendMessage, setSendMessage] = useState(null);
    const [receivedMessage, setReceivedMessage] = useState(null);

    const socket = useRef();
    const [user, setUser] = useState(
        localStorage.getItem("user")
            ? JSON.parse(localStorage.getItem("user"))
            : null
    );

    useEffect(() => {
        setUser(
            localStorage.getItem("user")
                ? JSON.parse(localStorage.getItem("user"))
                : null
        );
    }, [user._id]);

    useEffect(() => {
        socket.current = io("http://localhost:8800");
        socket.current.emit("new-user-add", user?._id);
        socket.current.on("get-users", (users) => {
            setOnlineUsers(users);
        });

        socket.current.on("recieve-message", (data) => {
            setReceivedMessage(data);
        });

        return () => {
            socket.current.disconnect();
        };
    }, [user]);

    useEffect(() => {
        const getChats = async () => {
            if (user) {
                try {
                    const response = await axios.get(
                        `/api/chat/${user?._id}`
                    );

                    setChats(response.data.data);
                } catch (error) {
                    console.error("Error fetching chats:", error);
                }
            }
        };
        getChats();
    }, [user]);

    useEffect(() => {
        if (sendMessage !== null) {
            socket.current.emit("send-message", sendMessage);
            setSendMessage(null);
        }
    }, [sendMessage]);

    const handleNewChat = (newChat) => {
        setChats((prevChats) => [...prevChats, newChat]);
    };

    const checkOnlineStatus = (chat) => {
        const chatMember = chat.members.find((member) => member !== user._id);
        return onlineUsers.some((user) => user.userId === chatMember);
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="Chat">
            <div className="Left-side-chat">
                <LogoSearch onNewChat={handleNewChat} />
                <div className="Chat-container">
                    <h2>Chat</h2>
                    <div className="Chat-list">
                        {chats
                            ?.slice()
                            .reverse()
                            .map((chat) => (
                                <div
                                    key={chat._id}
                                    onClick={() => {
                                        setCurrentChat(chat);
                                    }}
                                >
                                    <Conversation
                                        data={chat}
                                        currentUser={user?._id}
                                        online={checkOnlineStatus(chat)}
                                    />
                                </div>
                            ))}
                    </div>
                </div>
            </div>
            <div className="Right-side-chat">
                <ChatBox
                    chat={currentChat}
                    currentUser={user?._id}
                    setSendMessage={setSendMessage}
                    receivedMessage={receivedMessage}
                />
            </div>
        </div>
    );
}

export default Chat;
