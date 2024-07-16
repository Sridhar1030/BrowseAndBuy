// cartController.js

import cartModel from "../models/CartModel.js"; // Add .js extension for ES6 modules

const addCart = async (req, res) => {
    try {
        const { userId, product } = req.body; // Extract userId and product from the request body

        if (!userId) {
            throw new Error("User ID is required");
        }

        if (!product || !product.id) {
            throw new Error("Product ID is required");
        }

        let cart = await cartModel.findOne({ user: userId });

        if (!cart) {
            cart = await cartModel.create({
                user: userId,
                cartItems: [{ product: { ...product } }],
            });
        } else {
            const { id } = product;

            const productExist = cart.cartItems.findIndex(
                (item) => item.product.id == id
            );

            if (productExist !== -1) {
                return res.status(200).json({ message: "exist" });
            } else {
                await cartModel.findOneAndUpdate(
                    { user: userId },
                    { $push: { cartItems: { product: { ...product } } } },
                    { new: true }
                );
            }
        }

        const updatedCart = await cartModel.findOne({ user: userId });
        res.status(200).json({
            message: "Added Cart",
            total: updatedCart?.cartItems?.length || 0,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const removeCart = async (req, res) => {
    try {
        const { userId, id } = req.body; // Extract userId and product id from the request body
        console.log(req.body);

        if (!userId) {
            throw new Error("User ID is required");
        }

        const response = await cartModel.findOneAndUpdate(
            {
                user: userId,
                "cartItems.product.id": id,
            },
            { $pull: { cartItems: { "product.id": id } } },
            { new: true }
        );

        if (!response) {
            res.status(404).json({ message: "Item not found" });
            return;
        }

        res.status(200).json({
            message: "Item removed from cart",
            total: response?.cartItems?.length || 0,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};






// const addCartQty = async (req, res) => {
//     try {
//         const { userId, Productid } = req.body; // Correctly destructure userId and productId
//         console.log(req.body);

//         const response = await cartModel.findOneAndUpdate(
//             { user: userId, "cartItems.product.id": Productid },
//             { $inc: { "cartItems.$.quantity": 1 } },
//             { new: true }
//         );

//         if (!response) {
//             res.status(404).json({ message: "Item not found" });
//             return;
//         }

//         res.status(200).json({ message: "Added qty", updatedCart: response });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// };








// const decreaseCartQty = async (req, res) => {
//     try {
//         const { userId } = req.body;
//         const { Productid } = req.body;
//         console.log(Productid)
//         console.log(userId)

//         const response = await cartModel.findOneAndUpdate(
//             { user: userId, "cartItems.product.id": Productid },
//             { $inc: { "cartItems.$.quantity": -1 } },
//             { new: true }
//         );

//         if (!response) {
//             res.status(404).json({ message: "Item not found" });
//             return;
//         }

//         res.status(200).json({ message: "Decreased qty" });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// };




const getUserCart = async (req, res) => {
    try {
        const { userId } = req.query;
        console.log(req.query)
        const cart = await cartModel.findOne({ user: userId });

        if (!cart) {
            res.status(404).json({ message: "Cart not found" });
            return;
        }

        res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};




const getCartNumber = async (req, res) => {
    try {
        const { userId } = req.query;
        console.log(req.query)
        
        const cart = await cartModel.findOne({ user: userId });

        if (!cart) {
            res.status(200).json(0);
            return;
        }

        res.status(200).json(cart?.cartItems?.length || 0);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export {
    addCart,
    removeCart,
    // decreaseCartQty,
    // addCartQty,
    getUserCart,
    getCartNumber,
};
