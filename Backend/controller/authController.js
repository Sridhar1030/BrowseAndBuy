// controllers/authController.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.signup = async (req, res) => {
	const { username, email, password } = req.body;
	const newUser = new User({ username, email, password });

	try {
		await newUser.save();
		res.send({ message: "User registered successfully" });
	} catch (error) {
		res.send({ message: "Registration failed", error });
	}
};

exports.login = async (req, res) => {
	const { username, password, email } = req.body;

	try {
		const user = await User.findOne({ username });
		if (!user) return res.send({ message: "User not found" });

		if (user.password === password && user.email === email) {
			const token = jwt.sign({ data: user }, "MYKEY", {
				expiresIn: "1h",
			});
			return res.send({ message: "Login successful", token });
		} else if (user.password !== password) {
			return res.send({ message: "Incorrect password" });
		} else {
			return res.send({ message: "Incorrect email" });
		}
	} catch (error) {
		res.send({ message: "Login error", error });
	}
};
