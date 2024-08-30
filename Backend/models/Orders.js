import { Schema, model } from "mongoose";
const orderSchema = new Schema({
    F_Name: String,
    Image_ID: String,
    Item_Name: String,
    L_Name: String,
    category: String,
    phone: Number,
    price: Number,
    semester: Number,
    Approved: { type: Boolean, default: false },
    UserId:String,
    Bought:{type: Boolean, default:false},
    
},{timestamps: true});

const Orders = model("Orders", orderSchema);

export default Orders;
