import React, { useEffect, useState } from "react";
import axios from "axios";
import { Clock } from "lucide-react";

function Conversation({ data, currentUser, online }) {
    const [userData, setUserData] = useState(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const userId = data.members.find((id) => id !== currentUser);

        const getUser = async () => {
            try {
                const res = await axios.post(
                    `${import.meta.env.VITE_API_URL}/auth/getUserData`,
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
    }, [data, currentUser]);

    // Get initials for the fallback avatar
    const getInitials = (name) => {
        if (!name) return '';
        return name.split(' ').map(word => word[0]).join('').toUpperCase();
    };

    return (
        <div
            className={`relative transition-all duration-200 flex-grow ${
                isHovered ? 'bg-blue-50' : 'bg-white'
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex items-center p-3 cursor-pointer group">
                {/* Avatar Section */}
                <div className="relative">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                        {userData?.avatar ? (
                            <img
                                src={`https://ui-avatars.com/api/?name=${userData?.username}`}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <span className="text-white font-medium text-lg">
                                {getInitials(userData?.username)}
                            </span>
                        )}
                    </div>
                    {/* Online Status Indicator */}
                    {online && (
                        <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white">
                            <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></div>
                        </div>
                    )}
                </div>

                {/* User Info Section */}
                <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-900">
                            {userData?.username}
                        </span>
                        <span className="text-xs text-gray-500">12:30 PM</span>
                    </div>

                    {/* Online Status Text */}
                    <div className="flex items-center mt-1">
                        <div className={`text-xs ${
                            online ? 'text-green-500' : 'text-gray-500'
                        }`}>
                            {online ? (
                                <span className="flex items-center">
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></div>
                                    Active now
                                </span>
                            ) : (
                                <span className="flex items-center">
                                    <Clock size={12} className="mr-1" />
                                    Last seen recently
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Hover Effect Line */}
            <div className={`absolute bottom-0 left-0 h-[1px] bg-blue-400 transition-all duration-300 ${
                isHovered ? 'w-full' : 'w-0'
            }`} />
        </div>
    );
}

export default Conversation;
