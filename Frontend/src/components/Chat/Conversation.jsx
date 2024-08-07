import axios from "axios";
import React, { useEffect, useState } from "react";

function Conversation({ data, currentUser, online, username  }) {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const userId = data.members.find((id) => id !== currentUser);
        console.log("another user ", userId);

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
                console.log("getUser", res.data.data);
                setUserData(res.data.data);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
        getUser();
    }, [data, currentUser]);

    return (
        <>
            <div className="flex items-center p-2 hover:bg-gray-100 cursor-pointer">
                <div className="relative">
                    {online && <div className="online-dot"></div>}
                    <img
                            src={`https://ui-avatars.com/api/?name=${userData?.username}`}
                            alt="Profile"
                        className="w-12 h-12 rounded-full"
                    />
                </div>
                <div className="ml-4">
                    <span className="text-lg font-medium">{userData?.username}</span>
                    <br />
                    <span className={`text-xs ${online ? "text-green-500" : ""}`}>
                        {online ? "Online" : "Offline"}
                    </span>
                    <br />
                </div>
            </div>
            <hr className="w-11/12 mx-auto border-t border-gray-200" />
        </>
    );
}

export default Conversation;
