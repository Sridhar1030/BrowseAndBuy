import { Schema, model } from "mongoose";
const sellSchema = new Schema({
	F_Name: String,
	Image_ID: String,
	Item_Name: String,
	L_Name: String,
	category: String,
	phone: Number,
	price: Number,
	semester: Number,
	Approved: { type: Boolean, default: false },
},{timestamps: true});

const Sell = model("Sell", sellSchema);

export default Sell;