import express from "express";
import {
    addCart,
    removeCart,
    decreaseCartQty,
    addCartQty,
    getUserCart,
    getCartNumber,
} from "../controller/cartController.js"; 

const CartRoute = express.Router();
CartRoute.get("/get-user-cart-number",  getCartNumber);
CartRoute.get("/get-user-cart",  getUserCart);
CartRoute.post("/add-cart",  addCart);
CartRoute.delete("/remove-cart",  removeCart);
CartRoute.post("/add-qty",  addCartQty);
CartRoute.post("/decrease-qty",  decreaseCartQty);

export default CartRoute;
