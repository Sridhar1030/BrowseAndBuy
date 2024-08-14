import { create } from "zustand";
import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;
// const url = `${baseURL}/api/items`;

const user = JSON.parse(localStorage.getItem("user"));
const userId = user ? user._id : null;
console.log("user id is " , userId)
export const useProductCart = create((set) => ({
    fetchSellingItems: async () => {
        try {
            const response = await axios.get(`${baseURL}/uploadedItems`, {
                params: { userId },
            });
            console.log("Response from fetchSellingItems:", response.data);
            return response.data.productInfo; 
        } catch (error) {
            console.error("Error fetching selling items:", error.message);
            throw error; // Re-throw the error to handle it in the component
        }
    },
}));
