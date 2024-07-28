import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";

const baseURL = "/api";
const user = JSON.parse(localStorage.getItem("user"));
const userId = user ? user._id : null;

export const useCartStore = create((set, get) => ({
	cartNumber: 100,
	cartItems: [],

	fetchCartNumber: async () => {
		try {
			// console.log(userId)
			const response = await axios.get(`${baseURL}/cart/get-user-cart-number`, {
				params: { userId },
			});
			set({cartNumber: response.data,});
		} catch (error) {
			console.error("Error getting user cart: ", error.message);
			toast.error("Error getting user cart: " + error.message);
		}
	},

	addCartItem: async (productData) => {
		const data = { userId, product: productData };
		try {
			const response = await axios.post(`${baseURL}/cart/add-cart`, data);
			get().fetchCartNumber(); // Refresh the cart number after adding an item
			return response.data;
		} catch (error) {
			throw new Error(`Error adding item to cart: ${error.message}`);
		}
	},


//get user cart
	getUserCart : async() => {
    try {
        const response = await axios.get(`${baseURL}/cart/get-user-cart`, {
            params: { userId }
        });
        if(Array.isArray(response.data.cartItems)){
            return response.data.cartItems;
        }else{
            throw new Error("expected an array but got : " + response.data)
        }

    }
    catch(error){
        console.error("Error getting user cart: ", error.message);
    }
},

	

	removeCartItem: async (productId) => {
		try {
			const response = await axios.delete(`${baseURL}/cart/remove-cart`, {
				data: { userId: userId, id: productId },
			});
			get().fetchCartNumber(); // Refresh the cart number after removing an item
			return response.data;
		} catch (error) {
			throw new Error(`Error removing item from cart: ${error.message}`);
		}
	},
}));
