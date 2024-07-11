import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import app from "./app.js"; // Change require to import


const PORT = process.env.PORT || 3000;

dotenv.config({
    path: './.env'
})

connectDB()
    .then(() => {
        console.log("MongoDB connection success");
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
        app.on("error", (error) => {
            console.error("Server error:", error);
            throw new Error("Server error");
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error);
    });
