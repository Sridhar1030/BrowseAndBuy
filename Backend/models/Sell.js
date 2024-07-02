// models/Sell.js
const mongoose = require("mongoose");
const sellSchema = new mongoose.Schema({
	F_Name: String,
	Image_ID: String,
	Item_Name: String,
	L_Name: String,
	category: String,
	phone: Number,
	price: Number,
	semester: Number,
	Approved: { type: Boolean, default: false },
});

const Sell = mongoose.model("Sell", sellSchema);

module.exports = Sell;
