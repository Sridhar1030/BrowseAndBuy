import React, { useEffect, useState } from "react";
import LogoSearch from "./LogoSearch.jsx";
import "./Chat.css";
import axios from "axios";

function Chat() {
    const [chats, setChats] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [sendMessage, setSendMessage] = useState(null);
    const [receivedMessage, setReceivedMessage] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3000/auth/userData",
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                        },
                    }
                );
                const fetchedUser = response.data.data.user;
                setUser(fetchedUser);
                console.log("User data:", fetchedUser);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchUser();
    }, []);

    useEffect(() => {
        if (!user) return;

        const getChats = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/chat/${user._id}`
                );
                console.log("Chats:", response.data);
                setChats(response.data);
            } catch (error) {
                console.error("Error fetching chats:", error);
            }
        };
        getChats();
    }, [user]);

    return (
        <div className="Chat">
            <div className="Left-side-chat">
                <LogoSearch />
                <div className="Chat-container">
                    <h2>Chat  </h2>
                    <div className="Chat-list">conversations {user?.email}  </div>
                </div>
            </div>
            <div className="Right-side-chat">Right side chat</div>
        </div>
    );
}

export default Chat;
