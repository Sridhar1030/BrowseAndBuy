import { Server } from "socket.io";

const setupSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
        },
    });

    let activeUsers = [];

    io.on("connection", (socket) => {
        socket.on("new-user-add", (newUserId) => {
            if (!activeUsers.some((user) => user.userId === newUserId)) {
                activeUsers.push({ userId: newUserId, socketId: socket.id });
                console.log("New User Connected", activeUsers);
            }
            io.emit("get-users", activeUsers);
        });

        socket.on("disconnect", () => {
            activeUsers = activeUsers.filter(
                (user) => user.socketId !== socket.id
            );
            io.emit("get-users", activeUsers);
        });

        socket.on("send-message", (data) => {
            const { receiverId } = data;
            const user = activeUsers.find((user) => user.userId === receiverId);
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
};

export default setupSocket;
