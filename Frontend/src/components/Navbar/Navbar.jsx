import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Bell,
    ShoppingCart,
    LogOut,
    User,
    Package,
    Store,
    Home,
    Plus,
    Box,
    MessageCircle
} from "lucide-react";

const Navbar = ({ socket, user }) => {
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    // Combined authentication and user check
    useEffect(() => {
        const checkAuthAndUser = () => {
            const token = localStorage.getItem("accessToken");
            const storedUser = localStorage.getItem("user");
            
            if (token && storedUser) {
                setIsAuthenticated(true);
                setCurrentUser(JSON.parse(storedUser));
            } else {
                setIsAuthenticated(false);
                setCurrentUser(null);
            }
        };

        checkAuthAndUser();
        
        // Check auth status every time component mounts or updates
        const interval = setInterval(checkAuthAndUser, 1000);

        return () => clearInterval(interval);
    }, []);

    // Scroll and notification handlers
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);

        if (socket) {
            socket.on("getNotification", (data) => {
                setNotifications((prev) => [...prev, data]);
            });

            return () => {
                socket.off("getNotification");
                window.removeEventListener("scroll", handleScroll);
            };
        }

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [socket]);

    const handleLogout = async () => {
        try {
            const base_url = import.meta.env.VITE_API_URL;
            const response = await fetch(`${base_url}/auth/logout`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });

            const data = await response.json();
            localStorage.clear();
            setIsAuthenticated(false);
            setCurrentUser(null);
            navigate("/");
            alert(data.message);
        } catch (error) {
            console.error("Error logging out:", error);
            alert("An error occurred. Please try again.");
        }
    };

    const navClassName = `
        sticky top-0 z-50 transition-all duration-300
        ${isScrolled ? "bg-white shadow-lg" : "bg-slate-50"}
    `;

    const linkClassName = "flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors";
    const buttonClassName = "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors hover:bg-slate-100";

    return (
        <nav className={navClassName}>
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo and brand */}
                    <Link to="/home" className="flex items-center space-x-3">
                        <Store className="h-8 w-8 text-blue-600" />
                        <span className="text-xl font-bold text-gray-800">
                            Browse And Buy
                        </span>
                    </Link>

                    {/* Main navigation */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link to="/home" className={linkClassName}>
                            <Home size={20} />
                            <span>Home</span>
                        </Link>

                        {isAuthenticated && (
                            <>
                                <Link to="/purchase" className={linkClassName}>
                                    <Package size={20} />
                                    <span>Purchase</span>
                                </Link>
                                <Link to="/form" className={linkClassName}>
                                    <Plus size={20} />
                                    <span>Sell</span>
                                </Link>
                                <Link to="/orders" className={linkClassName}>
                                    <Box size={20} />
                                    <span>Orders</span>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Right side icons */}
                    <div className="flex items-center space-x-4">
                        {isAuthenticated ? (
                            <>
                                {/* Chat */}
                                <Link to="/chat" className={buttonClassName}>
                                    <MessageCircle size={20} />
                                    <span className="sr-only">Chat</span>
                                </Link>

                                {/* Notifications */}
                                <div className="relative">
                                    <button
                                        onClick={() => setShowNotifications(!showNotifications)}
                                        className={buttonClassName}
                                    >
                                        <Bell size={20} />
                                        {notifications.length > 0 && (
                                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                                {notifications.length}
                                            </span>
                                        )}
                                    </button>

                                    {showNotifications && (
                                        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden">
                                            <div className="p-4 border-b border-gray-100">
                                                <h3 className="font-semibold">Notifications</h3>
                                            </div>
                                            <div className="max-h-96 overflow-y-auto">
                                                {notifications.length > 0 ? (
                                                    notifications.map((notif, index) => (
                                                        <div
                                                            key={index}
                                                            className="p-4 border-b border-gray-100 hover:bg-gray-50"
                                                        >
                                                            <p className="text-sm">
                                                                <span className="font-semibold">
                                                                    {notif.senderName}
                                                                </span>{" "}
                                                                wants to buy
                                                            </p>
                                                            <button
                                                                onClick={() => navigate(`/chat/${notif.senderId}`)}
                                                                className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                                                            >
                                                                Chat now
                                                            </button>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p className="p-4 text-sm text-gray-500">
                                                        No new notifications
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Cart */}
                                <Link to="/cart" className={buttonClassName}>
                                    <ShoppingCart size={20} />
                                </Link>

                                {/* Account */}
                                <Link to="/account" className={buttonClassName}>
                                    <User size={20} />
                                </Link>

                                {/* Logout */}
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                                >
                                    <LogOut size={20} />
                                    <span>Logout</span>
                                </button>
                            </>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link
                                    to="/"
                                    className="text-gray-600 hover:text-gray-800 px-4 py-2 rounded-lg transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;