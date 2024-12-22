import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UilSearch } from "@iconscout/react-unicons";

const LogoSearch = ({ onNewChat }) => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const navigate = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/auth/allUser`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            })
            .then((response) => {
                setUsers(response.data.data);
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
            });
    }, []);

    const filteredUsers = users.filter((user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleUserClickToCreateChat = async (user) => {
        if (currentUser._id === user._id) {
            alert("You cannot chat with yourself");
            return;
        }

        try {
            const response = await axios.post("/api/chat/", {
                senderId: currentUser._id,
                receiverId: user._id,
            });
            onNewChat(response.data.data);
            navigate("/chat");
        } catch (error) {
            console.error("Error creating chat:", error);
            alert(error.response.data.message);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <form className="max-w-md mx-auto">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <UilSearch className="w-5 h-5 text-gray-500" />
                    </div>
                    <input
                        type="search"
                        id="default-search"
                        placeholder="Search usernames..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>
            </form>
            {searchTerm && (
                <div className="mt-4">
                    {filteredUsers.map((user) => (
                        <div
                            key={user.id}
                            onClick={() => handleUserClickToCreateChat(user)}
                            className="max-w-md mb-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 cursor-pointer"
                        >
                            <p className="block w-full px-5 py-3 text-gray-900 bg-white border-b border-gray-200 rounded-t-lg hover:bg-gray-300">
                                {user.username}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LogoSearch;
