import React from 'react';
import ImageCarousel from './ImageCarousel'; // Adjust import path
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCartStore } from '../../../store/cartStore'; // Adjust import path
import { useSocket } from '../../contexts/SocketContext';
import axios from 'axios';

function AdminCard({ item, onBuy, onCart }) {
    const socket = useSocket();
    const addCartItem = useCartStore(state => state.addCartItem);
    const user = JSON.parse(localStorage.getItem("user"));

    const handleCart = async () => {
        const productData = {
            id: item._id,
            image: item.Image_ID,
            category: item.category,
            title: item.Item_Name,
            price: item.price,
            quantity: 1
        };

        try {
            const response = await addCartItem(productData);
            if (response.message === "exist") {
                toast.warning("Item already exists");
            } else {
                toast.success("Added to cart");
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            toast.error('Failed to add to cart');
        }
    };

    const handleBuy = async () => {
        socket.emit("sendNotification", {
            senderName: user.username,
            receiverName: item.F_Name,
        });
    };

    const handleApprove = async () => {
        const baseURL = import.meta.env.VITE_API_URL;
        const url = `${baseURL}/sell/${item._id}/approve`;

        try {
            const response = await axios.put(url);

            if (response.status === 200) {
                toast.success("Item approved successfully");
                // Optionally refresh the item list or update the UI
            } else {
                toast.error(`Approval failed: ${response.data.message}`);
            }
        } catch (error) {
            console.error('Error approving item:', error);
            toast.error('Failed to approve item');
        }
    };

    return (
        <div className='card border rounded-lg shadow-lg p-6 m-4'>
            <ToastContainer
                position="bottom-right"
                autoClose={1000}
                hideProgressBar={true}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                theme="dark"
            />
            <div className='relative flex flex-col items-center'>
                <ImageCarousel imageIds={item.Image_ID.split(',')} />
                <div className='text-center m-10'>
                    <h3 className='text-2xl font-bold mb-2'>{item.Item_Name}</h3>
                    <p className='text-gray-700 mb-2'>Price: ${item.price}</p>
                    <p className='text-gray-700 mb-2'>Seller: {item.F_Name} {item.L_Name}</p>
                    <p className='text-gray-700 mb-2'>Phone: {item.phone}</p>
                    <p className='text-gray-700 mb-2'>Semester: {item.semester}</p>
                    <p className='text-gray-700 mb-2'>Category: {item.category}</p>
                    <p className='text-gray-700 mb-2'>Approved: {item.Approved ? "Yes" : "No"}</p>
                    <button
                        className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                        onClick={handleApprove}
                    >
                        Approve Item
                    </button>
                </div>
                <div className='flex w-full justify-evenly space-x-10'>
                    <button
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                        onClick={handleBuy}
                    >
                        Buy
                    </button>

                    <button
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                        onClick={handleCart}
                    >
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AdminCard;
