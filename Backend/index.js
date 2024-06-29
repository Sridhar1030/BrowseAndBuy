const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
require("dotenv").config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const uploadRoute = require("./controller/routeUpload");

const port = process.env.PORT || 3000;
app.use(express.json());

app.use(cors());

app.use("/api/users", uploadRoute);

mongoose.connect("mongodb://localhost:27017/B&B");

const users = mongoose.model("users", {
    username: String,
    password: String,
    email: String,
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.post("/signup", (req, res) => {
    const { username, email, password } = req.body;
    const newUser = new users({ username, email, password });

    newUser.save()
        .then(() => res.send({ message: "saved success" }))
        .catch(() => res.send({ message: "saved failed" }));
});

app.post("/login", (req, res) => {
    const { username, password, email } = req.body;

    users.findOne({ username })
        .then(result => {
            if (!result) {
                return res.send({ message: "user not found" });
            }

            if (result.password === password) {
                if (result.email === email) {
                    const token = jwt.sign({ data: result }, 'MYKEY', { expiresIn: '1h' });
                    return res.send({ message: "login successful", token });
                } else {
                    return res.send({ message: "wrong email" });
                }
            } else {
                return res.send({ message: "wrong password" });
            }
        })
        .catch(err => {
            console.log(err);
            return res.send({ message: "error" });
        });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
