import { Server } from "socket.io";
import mongoose from "mongoose";
import User from "./models/User.js";
import Notification from "./models/Notification.js"; 
const io = new Server({
    cors: {
        origin: "*",
    },
});

let onlineUsers = [];

// Add a new user with the full user object and socketId
const addNewUser = async (userId, socketId) => {
    try {
        const user = await User.findById(userId);
        if (user) {
            const userExists = onlineUsers.some(
                (u) => u.user._id.toString() === userId
            );
            if (!userExists) {
                onlineUsers.push({ user, socketId });
                // console.log("new user made", onlineUsers);
                // Check for unread notifications and send them
                const unreadNotifications = await Notification.find({
                    receiverName: user.username,
                    isRead: false,
                });
                unreadNotifications.forEach((notification) => {
                    io.to(socketId).emit("getNotification", notification);
                });
                //! Mark notifications as read
                // await Notification.updateMany(
                //     { receiverName: user.username, isRead: false },
                //     { isRead: true }
                // );
            }
        } else {
            console.error(`User with ID ${userId} not found`);
        }
    } catch (err) {
        console.error("Error fetching user from database:", err);
    }
};

// Remove a user by socketId
const removeUser = (socketId) => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
    // console.log("left users", onlineUsers);
};

// Get a user by username (assuming the user object contains username and _id)
const getUser = (username) => {
    return onlineUsers.find((u) => u.user.username === username);
};

// Setup Socket.IO with server
const setupSocket = (server) => {
    io.attach(server);

    io.on("connection", (socket) => {
        console.log("a user connected in port 5000");

        socket.on("newUser", async (userId) => {
            await addNewUser(userId, socket.id);
        });

        socket.on(
            "sendNotification",
            async ({ senderName, receiverName, productName, senderId }) => {
                console.log("Received notification data:", {
                    senderName,
                    receiverName,
                    productName,
                    senderId
                });

                const receiver = getUser(receiverName);
                if (receiver && receiver.socketId) {
                    io.to(receiver.socketId).emit("getNotification", {
                        senderName,
                        receiver: receiverName,
                        productName,
                        senderId,
                        isRead: false
                    });
                } else {
                    console.log("Creating new notification with data:", {
                        senderName,
                        receiver: receiverName,
                        productName,
                        senderId
                    });

                    const newNotification = new Notification({
                        senderName,
                        receiver: receiverName,
                        productName,
                        senderId
                    });

                    try {
                        const savedNotification = await newNotification.save();
                        console.log("Saved notification:", savedNotification);
                    } catch (error) {
                        console.error("Error saving notification:", error);
                        console.error("Validation errors:", error.errors);
                    }
                }
            }
        );

        socket.on("disconnect", () => {
            console.log("a user disconnected");
            removeUser(socket.id);
        });
    });
};

io.listen(5000);

export default setupSocket;
