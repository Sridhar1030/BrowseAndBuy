const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware to log requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} - ${JSON.stringify(req.body)}`);
    next();
});

app.use("/sell", require("./routes/SellRoute"));
app.use("/api/users", require("./controller/routeUpload"));
app.use("/auth", require("./routes/AuthRoute"));

app.get("/", (req, res) => {
    res.send("Hello World!");
});

module.exports = app;
