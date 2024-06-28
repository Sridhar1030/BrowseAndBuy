const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
var cors = require("cors");
var jwt = require("jsonwebtoken");
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

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
	console.log(req.body);

	const username = req.body.username;
	const email = req.body.email;
	const password = req.body.password;
	const newUser = new users({
		username: username,
		email: email,
		password: password,
	});
	newUser
		.save()
		.then(() => {
			res.send({ message: "saved success" });
		})
		.catch(() => {
			res.send({ message: "saved failed" });
		});
});

// !Return after each res.end as an app can have only one res.send
app.post("/login", (req, res) => {
	const { username, password, email } = req.body;

	users
		.findOne({ username: username })
		.then((result) => {
			console.log(result, "user data");
			if (!result) {
				return res.send({ message: "user not found" });
			} else {
				if (result.password === password) {
					if (result.email === email) {
						const token = jwt.sign({
							data:result
						},'MYKEY',{expiresIn: '1h'})



						return res.send({ message: "login successful", token :token});
					} else {
						return res.send({ message: "wrong email" });
					}
				} else {
					return res.send({ message: "wrong password" });
				}
			}
		})
		.catch((err) => {
			console.log(err);
			return res.send({ message: "error" });
		});
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
