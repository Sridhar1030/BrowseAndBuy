import React from 'react'
import { io } from "socket.io-client";
import { useEffect ,useState } from 'react';


const ChatPage = ({ socket }) => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("socket is ", socket)
    const handleChat = async () => {
        socket.emit("sendChat", {
            senderName: user.username,
            receiverName: user.username,
            message: "hi"
        })

    }
    const [chat , setChat] = useState([])

    // const showChat = async () => {
    //     if (socket) {

    //         console.log("clicked")
    //         socket.on("getChat", (data) => {
    //             console.log("data is", data)
    //             setChat(prevChat => [...prevChat, data]);
    //         })
    //     }
    //     else {
    //         console.log("error")
    //     }
    // }

    useEffect(() => {
        if (socket) {
            socket.on("getChat", (data) => {
            console.log("the data is ",data)
            setChat(prevChat => [...prevChat, data]);
            });

            // Optional: Fetch unread notifications from server on login or specific page load
            // const fetchUnreadNotifications = async () => {
            //     const response = await fetch(`/api/notifications/${user._id}`);
            //     const notifications = await response.json();
            //     setNotifications(notifications);
            // };

            // if (user) {
            //     fetchUnreadNotifications();
            // }

            return () => {
                socket.off("getChat");
            };
        }
    }, [socket, user]);

    console.log()
    return (
        <div className='flex flex-col justify-center items-center align-middle'>
            <button className='border border-red-500 size-10 flex justify-center items-center w-96 h-20 ' onClick={handleChat}>test chat</button>

            <div>
                <h2>Recent Chats</h2>
                {chat.length > 0 ? (
                    chat.map((message, index) => (
                        <div key={index}>
                            <strong>{message.senderName}: </strong>{message.message}
                        </div>
                    ))
                ) : (
                    <p>No chats yet</p>
                )}
            </div>
        </div>
    )
}

export default ChatPage
