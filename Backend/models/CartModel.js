import { Schema, Types, model } from "mongoose";

const cartSchema = Schema(
    {
        cartItems: [
            {
                product: {
                    id: { type: String, required: true },
                    title: { type: String, required: true },
                    price: Number,
                    rating: { rate: { type: Number }, count: { type: Number } },
                    category: { type: String, required: true },
                    image: { type: String, required: true },
                },
                // quantity: { type: Number, default: 1 },
            },
        ],
        user: {
            type: Types.ObjectId,
            ref: "User",
            required: [true, "user id is required"],
        },
        totalPrice: Number,
    },
    { timestamp: true }
);

const cartModel = model("cart", cartSchema);

export default cartModel;
