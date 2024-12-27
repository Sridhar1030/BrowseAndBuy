import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import app from "./app.js";
import http from "http";
import setupSocket from "./socker/index.js";

dotenv.config({
    path: './env'
});

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await connectDB();
        const server = http.createServer(app);
        setupSocket(server);

        server.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Server startup failed:", error);
        process.exit(1);
    }
};

startServer();
