import { Server } from "socket.io";

const io = new Server({
    cors: {
        origin: "http://localhost:5173",
    },
});

let onlineUsers = [];

// Add a new user with the full user object and socketId
const addNewUser = (user, socketId) => {
    console.log(user)
    // Check if a user with the same userId already exists in the array
    const userExists = onlineUsers.some((u) => u.user._id === user._id);

    // If the user does not exist, add the new user
    if (!userExists) {
        onlineUsers.push({ user, socketId });
        console.log("new user made", onlineUsers);
    }
};

// Remove a user by socketId
const removeUser = (socketId) => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
    console.log("left users",onlineUsers)
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

        socket.on("newUser", (user) => {
            console.log(user);
            // Add new user with the full user object and socketId
            addNewUser(user, socket.id);
        });

        socket.on("sendNotification", ({ senderName, receiverName}) => {
            // Find receiver by username
            const receiver = getUser(receiverName);
            if (receiver && receiver.socketId) {
                io.to(receiver.socketId).emit("getNotification", {
                    senderName,
                    receiverName
                });
                console.log(senderName)
                console.log(receiver.socketId)
            } else {
                console.error(`User with username ${receiverName} not found`);
            }
        });

        socket.on("disconnect", () => {
            console.log("a user disconnected");
            // Remove user by socketId
            removeUser(socket.id);
        });
    });
};

// Listen on port 5000
io.listen(5000);

export default setupSocket;
