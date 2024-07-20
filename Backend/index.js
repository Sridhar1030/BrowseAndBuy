// index.js
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import app from "./app.js"; // Change require to import
import http from "http"; // Add this line
import setupSocket from "./socket.js"; // Add this line

const PORT = process.env.PORT || 3000;

dotenv.config({
    path: "./.env",
});

connectDB()
    .then(() => {
        console.log("MongoDB connection success");

        const server = http.createServer(app); // Create an HTTP server
        setupSocket(server); // Setup Socket.IO

        server.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });

        server.on("error", (error) => {
            console.error("Server error:", error);
            throw new Error("Server error");
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error);
    });
