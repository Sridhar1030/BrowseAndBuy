import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";
import { Send, Plus, Image, Smile, Paperclip, MoreVertical, Phone, Video } from 'lucide-react';

function ChatBox({ chat, currentUser, setSendMessage, receivedMessage }) {
    const [userData, setUserData] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    const base_url = import.meta.env.VITE_API_URL;
    const scroll = useRef();
    const chatBodyRef = useRef();

    useEffect(() => {
        if (chat) {
            const userId = chat?.members?.find((id) => id !== currentUser);
            const getUser = async () => {
                try {
                    const res = await axios.post(
                        `${base_url}/auth/getUserData`,
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
                const response = await axios.get(`${base_url}/message/${chat?._id}`);
                setMessages(response.data);
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };

        if (chat) fetchMessages();
    }, [chat]);

    const handleSendMessage = async (e) => {
        e?.preventDefault();

        if (newMessage.trim() === "") return;

        const message = {
            senderId: currentUser,
            text: newMessage,
            chatId: chat?._id,
        };

        const receiverId = chat.members.find((id) => id !== currentUser);
        setSendMessage({ ...message, receiverId });

        try {
            const response = await axios.post(`${base_url}/message/`, message);
            setMessages([...messages, response.data.data]);
            setNewMessage("");
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    useEffect(() => {
        if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
            setMessages([...messages, receivedMessage]);
        }
    }, [receivedMessage]);

    useEffect(() => {
        chatBodyRef.current?.scrollTo({
            top: chatBodyRef.current.scrollHeight,
            behavior: "smooth"
        });
    }, [messages]);

    const formatMessageTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    if (!currentUser || !chat) {
        return (
            <div className="flex items-center justify-center h-full bg-gray-50">
                <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MessageSquare className="w-8 h-8 text-blue-500" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-700">Welcome to Messages</h2>
                    <p className="text-gray-500 mt-2">Select a conversation to start chatting</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-[90%] bg-white rounded-lg shadow-lg">
            {/* Chat Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <img
                            src={`https://ui-avatars.com/api/?name=${userData?.username}&background=random`}
                            alt="Profile"
                            className="w-12 h-12 rounded-full"
                        />
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">{userData?.username}</h2>
                        <p className="text-sm text-green-500">Online</p>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <Phone className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <Video className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <MoreVertical className="w-5 h-5 text-gray-600" />
                    </button>
                </div>
            </div>

            {/* Chat Messages */}
            <div 
                ref={chatBodyRef}
                className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50"
            >
                {messages.map((message, index) => (
                    <div
                        key={message?._id || index}
                        className={`flex ${message?.senderId === currentUser ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`max-w-[70%] ${message?.senderId === currentUser ? 'order-1' : 'order-2'}`}>
                            <div
                                className={`rounded-2xl px-4 py-2 ${
                                    message?.senderId === currentUser
                                        ? 'bg-blue-500 text-white rounded-br-none'
                                        : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
                                }`}
                            >
                                <p className="text-sm">{message?.text}</p>
                            </div>
                            <div
                                className={`text-xs text-gray-500 mt-1 ${
                                    message?.senderId === currentUser ? 'text-right' : 'text-left'
                                }`}
                            >
                                {formatMessageTime(message?.createdAt)}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Chat Input */}
            <div className="border-t border-gray-200 p-4 bg-white">
                <div className="flex items-center space-x-4">
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <Plus className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <Image className="w-5 h-5 text-gray-600" />
                    </button>
                    <div className="flex-1 bg-gray-100 rounded-full">
                        <InputEmoji
                            value={newMessage}
                            onChange={setNewMessage}
                            cleanOnEnter
                            onEnter={handleSendMessage}
                            placeholder="Type a message..."
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSendMessage(e);
                                }
                            }}
                        />
                    </div>
                    <button 
                        onClick={handleSendMessage}
                        className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ChatBox;