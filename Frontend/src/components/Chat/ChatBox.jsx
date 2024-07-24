import axios from "axios";
import React, { useEffect, useState } from "react";
import "./ChatBox.css";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";

function ChatBox({ chat, currentUser }) {
    const [userData, setUserData] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        if (chat) {
            const userId = chat?.members?.find((id) => id !== currentUser);

            const getUser = async () => {
                try {
                    const res = await axios.post(
                        `http://localhost:3000/auth/getUserData`,
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
                const response = await axios.get(
                    `http://localhost:3000/message/${chat?._id}`
                );
                setMessages(response.data);
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };
        if (chat) fetchMessages();
    }, [chat]);

    const handleSendMessage = async () => {
        // Logic to send the new message
        setNewMessage("");
    };

    return (
        <div className="ChatBox-container">
            {chat ? (
                <>
                    <div className="chat-header flex items-center p-4 bg-gray-100 border-b border-gray-200 rounded-t-lg">
                        <div className="relative">
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6FBxkzNCzOLEne4y_eQxAohbi3bjDrLYaTw&s"
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
                    <h2 className="text-gray-500 text-lg">Open a chat to start messaging...</h2>
                </div>
            )}
        </div>
    );
}

export default ChatBox;
