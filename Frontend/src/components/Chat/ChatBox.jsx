import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import "./ChatBox.css";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";

function ChatBox({ chat, currentUser, setSendMessage, receivedMessage }) {
    const [userData, setUserData] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    const scroll = useRef();

    useEffect(() => {
        if (chat) {
            const userId = chat?.members?.find((id) => id !== currentUser);

            const getUser = async () => {
                try {
                    const res = await axios.post(
                        `/api/auth/getUserData`,
                        { userId: userId },
                        {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                            },
                        }
                    );
                    setUserData(res.data.data);
                } catch (error) {
                    console.error("Error fetching user:", error);
                }
            };
            getUser();
        }
    }, [chat, currentUser]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`/api/message/${chat?._id}`);
                setMessages(response.data);
                console.log("Fetched messages", response.data);
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };

        if (chat) fetchMessages();
    }, [chat]);

    const handleSendMessage = async (e) => {
        e.preventDefault();

        if (newMessage.trim() === "") return;

        const message = {
            senderId: currentUser,
            text: newMessage,
            chatId: chat?._id,
        };

        const receiverId = chat.members.find((id) => id !== currentUser);
        // send message to socket server
        setSendMessage({ ...message, receiverId });

        try {
            const response = await axios.post("api/message/", message);
            setMessages([...messages, response.data.data]);
            setNewMessage("");
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    // Receive Message from parent component
    useEffect(() => {
        console.log("Message Arrived: ", receivedMessage);
        if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
            setMessages([...messages, receivedMessage]);
        }
    }, [receivedMessage]);

    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="ChatBox-container">
            {chat ? (
                <>
                    <div className="chat-header flex items-center p-4 bg-gray-100 border-b border-gray-200 rounded-t-lg">
                        <div className="relative">
                            <img
                                src={`https://ui-avatars.com/api/?name=${userData?.username}`}
                                alt="Profile"
                                className="w-12 h-12 rounded-full"
                            />
                        </div>
                        <div className="ml-4">
                            <span className="text-lg font-medium">
                                {userData?.username}
                            </span>
                        </div>
                    </div>

                    <div className="chat-body">
                        {messages.map((message) => (
                            <div
                                ref={scroll}
                                key={message?._id}
                                className={
                                    message?.senderId === currentUser
                                        ? "message own"
                                        : "message"
                                }
                            >
                                <span>{message?.text}</span>{" "}
                                <span>{format(message?.createdAt)}</span>
                            </div>
                        ))}
                    </div>

                    <div className="chat-footer p-4 bg-gray-100 border-t border-gray-200 rounded-b-lg flex items-center gap-2">
                        <div className="bg-gray-300 p-2 rounded-lg cursor-pointer">
                            +
                        </div>
                        <InputEmoji
                            value={newMessage}
                            onChange={(text) => setNewMessage(text)}
                            className="flex-grow"
                        />
                        <button
                            className="send-button bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
                            onClick={handleSendMessage}
                        >
                            Send
                        </button>
                    </div>
                </>
            ) : (
                <div className="flex items-center justify-center h-full">
                    <h2 className="text-gray-500 text-lg">
                        Open a chat to start messaging...
                    </h2>
                </div>
            )}
        </div>
    );
}

export default ChatBox;
