import React, { useEffect, useState } from "react";
import LogoSearch from "./LogoSearch.jsx";
import "./Chat.css";
import axios from "axios";
import Conversation from "./Conversation.jsx";
import ChatBox from "./ChatBox.jsx";

function Chat() {

    const [chats, setChats] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [sendMessage, setSendMessage] = useState(null);
    const [receivedMessage, setReceivedMessage] = useState(null);

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
        const getChats = async () => {
            if (user) {
                try {
                    const response = await axios.get(
                        `http://localhost:3000/chat/${user?._id}`
                    );
                    console.log(response.data.data);
                    setChats(response.data.data);
                } catch (error) {
                    console.error("Error fetching chats:", error);
                }
            }
        };
        getChats();
    }, [user]);

    const checkOnlineStatus = (chat) => {
        return onlineUsers.some((onlineUser) => onlineUser._id === chat._id);
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="Chat">
            <div className="Left-side-chat">
                <LogoSearch />
                <div className="Chat-container">
                    <h2>Chat </h2>
                    <div className="Chat-list">
                        {chats?.map((chat) => (
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
