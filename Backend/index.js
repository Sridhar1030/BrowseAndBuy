const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
var cors = require('cors')
var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors())

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
	console.log(req.body)
	
	const username = req.body.username;
	const email = req.body.email;
	const password = req.body.password;
	const newUser
	= new users({
		username: username,
		email: email,
		password: password,
	});
	newUser.save()
    .then(() => {
		res.send({message : "saved success"})
	})
    .catch(()=>{
        res.send({message : "saved failed"})
    
    })
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
