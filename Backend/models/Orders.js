import { Schema, model } from "mongoose";

// Update your Orders schema to properly reference Sell and User
const orderSchema = new Schema(
    {
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Sell",
            required: [true, "Product ID is required"],
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User ID is required"],
        },
        bought: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const Orders = model("Orders", orderSchema);

export default Orders;
