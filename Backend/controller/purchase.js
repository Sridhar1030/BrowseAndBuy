// purchase.js
import Orders from "../models/Orders.js";

// Define the purchase function as an asynchronous function
const purchase = async (req, res) => {
    console.log("Request received. Query:", req.body);

    const {
        Item_Name,
        category,
        semester,
        price,
        phone,
        F_Name,
        L_Name,
        Image_ID,
        Approved = false,
        UserId,
        Bought = false,
    } = req.body;

    if (
        !Item_Name ||
        !category ||
        !semester ||
        !price ||
        !phone ||
        !F_Name ||
        !L_Name ||
        !Image_ID ||
        !UserId ||
        typeof Bought === "undefined"
    ) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const newOrder = new Orders({
        Item_Name,
        category,
        semester,
        price,
        phone,
        F_Name,
        L_Name,
        Image_ID,
        Approved,
        UserId,
        Bought,
    });

    try {
        const savedOrder = await newOrder.save();
        console.log("New Order Saved:", savedOrder);

        res.status(200).json({
            message: "Saved successfully",
            newOrder: savedOrder,
        });
    } catch (error) {
        console.error("Error saving new order:", error);

        if (error.name === "ValidationError") {
            res.status(400).json({
                message: "Validation failed",
                error: error.message,
            });
        } else {
            res.status(500).json({
                message: "Internal server error",
                error: error.message,
            });
        }
    }
};

// Define the bought function as an asynchronous function
const bought = async (req, res) => {
    console.log("Checking orders with Bought status set to true.");

    // Query the database for orders where Bought is true
    try {
        const boughtOrders = await Orders.find({ Bought: true });
        console.log("Bought orders found:", boughtOrders);

        // Respond with the found orders
        res.status(200).json({
            message: "Bought orders retrieved successfully",
            orders: boughtOrders,
        });
    } catch (error) {
        console.error("Error retrieving bought orders:", error);
        res.status(500).json({
            message: "Failed to retrieve bought orders",
            error: error.message,
        });
    }
};

export { purchase, bought };  // Using named exports
