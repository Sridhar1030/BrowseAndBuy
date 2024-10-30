import Orders from "../models/Orders.js";
import User from "../models/User.js"; // Import the User model

// Define the purchase function as an asynchronous function
const purchase = async (req, res) => {
    console.log("Request received. Query:", req.body);

    const {
        productId,  // Use productId to match the schema
        userId,     // Use userId to match the schema
        bought = false
    } = req.body;

    if (!productId || !userId || typeof bought === "undefined") {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const newOrder = new Orders({
        productId,
        userId,
        bought
    });

    try {
        const savedOrder = await newOrder.save();
        console.log("New Order Saved:", savedOrder);

        // Check if the order is marked as bought
        if (bought) {
            // Find the user by ID and update the BoughtProductId array
            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // Check if the productId is already in the BoughtProductId array
            if (!user.BoughtProductId.includes(productId)) {
                user.BoughtProductId.push(productId);
                await user.save();
            }

            console.log("User's BoughtProductId updated:", user.BoughtProductId);
        }

        res.status(200).json({
            message: "Saved successfully",
            newOrder: savedOrder
        });
    } catch (error) {
        console.error("Error saving new order:", error);

        if (error.name === "ValidationError") {
            res.status(400).json({
                message: "Validation failed",
                error: error.message
            });
        } else {
            res.status(500).json({
                message: "Internal server error",
                error: error.message
            });
        }
    }
};

// Define the bought function as an asynchronous function
const bought = async (req, res) => {
    console.log("Checking orders with Bought status set to true for a specific user.");

    // Extract the userId from the request parameters
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }

    try {
        // Query the database for orders where bought is true and userId matches
        const boughtOrders = await Orders.find({ bought: true, userId: userId })
            .populate("productId")  // Populate productId with data from Sell collection
            .populate("userId");    // Populate userId with data from User collection

        console.log("Bought orders found for user:", boughtOrders);

        // Respond with the found orders
        res.status(200).json({
            message: "Bought orders retrieved successfully",
            orders: boughtOrders
        });
    } catch (error) {
        console.error("Error retrieving bought orders:", error);
        res.status(500).json({
            message: "Failed to retrieve bought orders",
            error: error.message
        });
    }
};

export { purchase, bought };  
