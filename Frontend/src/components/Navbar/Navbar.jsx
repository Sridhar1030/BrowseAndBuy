import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import profileSvg from '../../assets/profile.svg';
import CartNumber from './CartNumber'; // Adjust the import path as necessary
import { useEffect } from 'react';
import Notification from '../../assets/notification.svg'
import Cart from '../../assets/image/cart.png'

function Navbar({ socket, user }) {
    const navigate = useNavigate();

    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);
    const handleLogout = async () => {
        try {
            const response = await axios.get(
                "/api/auth/logout",
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                }
            );

            console.log(response.data);

            alert(response.data.message);
        } catch (error) {
            console.error("Error logging out:", error);
            alert("An error occurred. Please try again.");
        }
        localStorage.clear();
        navigate("/");
    };



    useEffect(() => {
        if (socket) {
            socket.on("getNotification", (data) => {
                setNotifications((prev) => [...prev, data]);
            });

            return () => {
                socket.off("getNotification");
            };
        }
    }, [socket, user]);

    const toggleNotifications = () => {
        setShowNotifications((prev) => !prev);
    };

    const handleNotificationClick = async (notif, index) => {
        try {
            await fetch(`${import.meta.env.VITE_API_URL}/notification/markAsRead`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ notificationId: notif._id }),
            });

            // Update local state
            setNotifications((prev) =>
                prev.map((n, i) =>
                    i === index ? { ...n, isRead: true } : n
                )
            );
        } catch (err) {
            console.error("Failed to mark notification as read:", err);
        }
    };

    const chatWithUser = (senderId) => {
        navigate(`/chat/${senderId}`);
    };


    console.log('Profile SVG Path:', profileSvg);


    return (
        <nav className="sticky top-0 bg-slate-500 text-xl flex justify-between z-50">
            <div className="flex justify-start space-x-11 h-20 mx-3">
                <div className="flex justify-center align-middle">
                    <button>
                        <Link
                            to="/home"
                            className="text-2xl flex justify-center align-middle"
                        >
                            <img
                                className="size-10"
                                src="https://cdn-icons-png.flaticon.com/512/9752/9752709.png"
                                alt=""
                            />
                            Browse And Buy
                        </Link>
                    </button>
                    <div className="flex text-lg ml-14 space-x-10">
                        <button>
                            <Link to="/purchase">Purchase</Link>
                        </button>
                        <button>
                            <Link to="/form">Sell</Link>
                        </button>

                        <button>
                            <Link to="/orders">Your orders</Link>
                        </button>
                        <button>
                            <Link to="/selling">Your Items</Link>
                        </button>
                        {
                            user?.isAdmin == true && (

                                <button>
                                    <Link to="/AdminImages">admin</Link>
                                </button>
                            )
                        }
                        <button>
                            <Link
                                to="/account"
                                className="flex justify-center align-middle"
                            >
                                <img
                                    className="mr-2 size-5 flexjustify-center"
                                    src={profileSvg}
                                    alt="hi"
                                />
                                Account
                            </Link>


                        </button>
                    </div>
                </div>
            </div>
            <div className='mx-5 flex justify-center align-middle items-center gap-10'>
                <div className='relative  '>
                    <img
                        src={Notification}
                        className='size-6 cursor-pointer hover:animate-ring'
                        alt="Notification Icon"
                        onClick={toggleNotifications}
                    />
                    <span className="absolute -top-1 left-4 text-sm bg-red-400 text-white rounded-full px-1 py-0.5">
                        {notifications.length}
                    </span>


                    {showNotifications && (
                        <div className="absolute  bg-white border rounded shadow-lg p-3 w-64">
                            <h4 className="font-bold mb-2">Notifications</h4>
                            {notifications.length > 0 ? (
                                <ul>
                                    {notifications.map((notif, index) => (
                                        <li
                                            key={index}
                                            className={`mb-2 p-2 ${notif.isRead ? "bg-gray-200" : "bg-blue-100"
                                                }`}
                                            onClick={() => handleNotificationClick(notif, index)}
                                        >
                                            <p>
                                                <strong>{notif.senderName}</strong>: wants to buy
                                            </p>
                                            <button 
                                                className="mt-2 bg-blue-500 text-white px-2 py-1 rounded"
                                                onClick={() => chatWithUser(notif.senderId)}
                                            >
                                                Chat
                                            </button>
                                        </li>
                                    ))}

                                </ul>
                            ) : (
                                <p>No new notifications</p>
                            )}
                        </div>
                    )}
                </div>
                <button>
                    <CartNumber />
                    <Link
                        to="/cart"
                        className="flex justify-center align-middle gap-4"
                    >
                        <img
                            width={30}
                            height={30}
                            src={Cart}
                            alt="shopping-cart--v1"
                        />
                    </Link>
                </button>
                <button onClick={handleLogout} className="hover:text-red-500">
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
