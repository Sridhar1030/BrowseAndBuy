import {connectDB} from "./config/db.js";
import dotenv from "dotenv";
import app from "./app.js"

dotenv.config({
    path: './.env'
});

const PORT = process.env.PORT || 3000;

connectDB()
    .then(() => {
        console.log("mongoDB connection success");
        app.listen(process.env.PORT, () => {
            console.log(`Server running on port http://localhost:${process.env.PORT}`);
        });
        app.on("error", (error) => {
            console.log("Server error: ", error);
            throw new Error("Server error");
        });
    })
    .catch((error) => {
        console.log("mongoDB connection failed: ", error);
    });


