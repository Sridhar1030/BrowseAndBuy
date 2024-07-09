import express from "express";
import cors from "cors";
import authRouter from "./routes/AuthRoute.js";
import cookieParser from "cookie-parser";




const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())


// app.use("/sell", require("./routes/SellRoute"));
// app.use("/api/users", require("./controller/routeUpload"));
// app.use("/auth", require("./routes/AuthRoute"));
// app.use("/api", require("./routes/items"));

app.use("/auth", authRouter)

app.get("/", (req, res) => {
    res.send("Hello World!");
});

export default app;
