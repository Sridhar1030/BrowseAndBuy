// Assuming this is your app.js or similar main file

// Import necessary modules
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";



dotenv.config();


// Create Express app
const app = express();

// Import routes using require
import userRoute from "./controller/routeUpload.js";
import sellRoute from "./routes/SellRoute.js";
import authRouter from "./routes/AuthRoute.js";
import itemsRouter from "./routes/items.js";



// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Route middleware
app.use("/sell", sellRoute);
app.use("/api/users", userRoute); // Use userRoute imported with require
app.use("/auth", authRouter);
app.use("/api", itemsRouter);

// Example route
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// Export the app for use in other files (if needed)
export default app;
