import { Server } from "socket.io";

const io = new Server(8800, {
    cors: {
        origin: "*",
    },
});

let activeUsers = [];

io.on("connection", (socket) => {
    // add new User
    socket.on("new-user-add", (newUserId) => {
        // if user is not added previously
        if (!activeUsers.some((user) => user.userId === newUserId)) {
            activeUsers.push({ userId: newUserId, socketId: socket.id });
            console.log("New User Connected", activeUsers);
        }
        // send all active users to new user
        io.emit("get-users", activeUsers);
    });

    socket.on("disconnect", () => {
        // remove user from active users
        activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
        console.log("User Disconnected", activeUsers);
        // send all active users to all users
        io.emit("get-users", activeUsers);
    });

    // send message to a specific user
    socket.on("send-message", (data) => {
        const { receiverId } = data;
        const user = activeUsers.find((user) => user.userId === receiverId);
        console.log("Sending from socket to :", receiverId);
        console.log("Data: ", data);
        if (user) {
            io.to(user.socketId).emit("recieve-message", data);
        }
    });

    // Call events
    socket.on("call-user", (data) => {
        const { userToCall, signalData, from, name, callType } = data;
        const user = activeUsers.find((user) => user.userId === userToCall);
        if (user) {
            io.to(user.socketId).emit("incoming-call", {
                signal: signalData,
                from,
                name,
                callType,
            });
        }
    });

    socket.on("answer-call", (data) => {
        const { to, signal } = data;
        const user = activeUsers.find((user) => user.userId === to);
        if (user) {
            io.to(user.socketId).emit("call-accepted", signal);
        }
    });

    socket.on("reject-call", (data) => {
        const { to } = data;
        const user = activeUsers.find((user) => user.userId === to);
        if (user) {
            io.to(user.socketId).emit("call-rejected");
        }
    });

    socket.on("end-call", (data) => {
        const { to } = data;
        const user = activeUsers.find((user) => user.userId === to);
        if (user) {
            io.to(user.socketId).emit("call-ended");
        }
    });
});
