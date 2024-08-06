import { Server } from "socket.io";
import mongoose from "mongoose";
import User from "./models/User.js";
import Notification from "./models/Notification.js"; // Import the Notification model
const io = new Server({
    cors: {
        origin: "*",
        // origin: "http://localhost:3000"
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
                console.log("new user made", onlineUsers);
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
    console.log("left users", onlineUsers);
};

// Get a user by username (assuming the user object contains username and _id)
const getUser = (username) => {
    return onlineUsers.find((u) => u.user.username === username);
};

// Setup Socket.IO with server
const setupSocket = (server) => {
    io.attach(server);

    io.on("connection", (socket) => {
        console.log("a user connected");

        socket.on("newUser", async (userId) => {
            console.log(userId);
            await addNewUser(userId, socket.id);
        });

        socket.on("sendNotification", async ({ senderName, receiverName }) => {
            // Find receiver by username
            const receiver = getUser(receiverName);
            if (receiver && receiver.socketId) {
                io.to(receiver.socketId).emit("getNotification", {
                    senderName,
                    receiverName,
                });
                console.log(senderName);
                console.log(receiver.socketId);
            } else {
                // Store the notification in the database if the user is offline
                const newNotification = new Notification({
                    senderName,
                    receiverName,
                });
                await newNotification.save();
                console.log(
                    `User with username ${receiverName} not found. Notification saved to DB.`
                );
            }
        });
        socket.on("disconnect", () => {
            console.log("a user disconnected");
            removeUser(socket.id);
        });
    });
};

// Listen on port 5000
io.listen(5000);

export default setupSocket;
