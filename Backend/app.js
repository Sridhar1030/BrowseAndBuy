// Assuming this is your app.js or similar main file

// Import necessary modules
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";



// Create Express app
const app = express();

// Import routes using require
import userRoute from "./controller/routeUpload.js";
import sellRoute from "./routes/SellRoute.js";
import authRouter from "./routes/AuthRoute.js";
import itemsRouter from "./routes/items.js";
import CartRoute from "./routes/CartRoute.js"
import UploadedItems from "./routes/UploadedItems.js"
import chatRoute from "./routes/ChatRoute.js"
import messageRoute from "./routes/messageRoute.js"

// Middleware
app.use(cors(
    {origin:"*"}
));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Route middleware
app.use("/api/sell", sellRoute);
app.use("/api/users", userRoute); // Use userRoute imported with require
app.use("/api/auth", authRouter);
app.use("/api", itemsRouter);
app.use("/api/cart/",CartRoute)
app.use("/api" , UploadedItems)
app.use("/api/chat",chatRoute)
app.use("/api/message",messageRoute)

// Example route
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.get("/api/testing" , (req,res)=>{
    res.send("testing")
})

// Export the app for use in other files (if needed)
export default app;
