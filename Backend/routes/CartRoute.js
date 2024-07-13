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
CartRoute.get("/get-user-cart-number",  getCartNumber); //NotUseful
CartRoute.get("/get-user-cart",  getUserCart);   //done
CartRoute.post("/add-cart",  addCart);      
CartRoute.delete("/remove-cart",  removeCart);
CartRoute.post("/add-qty",  addCartQty); //done
CartRoute.post("/decrease-qty",  decreaseCartQty);  //done

export default CartRoute;
