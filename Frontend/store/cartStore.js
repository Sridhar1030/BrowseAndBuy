import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";
import { io } from "socket.io-client"; // Import io

const baseURL = import.meta.env.VITE_API_URL;
// const url = `${baseURL}/api/items`;

const user = JSON.parse(localStorage.getItem("user"));
const userId = user ? user._id : null;
const socket = io(baseURL);

export const useCartStore = create((set, get) => ({
    cartNumber: 10,
    cartItems: [],
    // setupSocket: () => {
    //     if (user) {
    //         socket?.emit("newUser", user);

    //         socket.on("connect", () => {
    //             console.log("Socket connected:", socket.id);
    //         });

    //         socket.on("disconnect", () => {
    //             console.log("Socket disconnected");
    //         });
    //     }
    // },

    fetchCartNumber: async () => {
        try {
            // console.log(userId)
            const response = await axios.get(
                `${baseURL}/cart/get-user-cart-number`,
                {
                    params: { userId },
                }
            );
            set({ cartNumber: response.data });
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
    getUserCart: async () => {
        try {
            const response = await axios.get(`${baseURL}/cart/get-user-cart`, {
                params: { userId },
            });
            if (Array.isArray(response.data.cartItems)) {
                return response.data.cartItems;
            } else {
                throw new Error("expected an array but got : " + response.data);
            }
        } catch (error) {
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
// useCartStore.getState().setupSocket();
