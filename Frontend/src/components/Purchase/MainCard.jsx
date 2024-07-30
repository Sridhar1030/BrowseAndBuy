import React from 'react';
import ImageCarousel from './ImageCarousel'; // Adjust import path
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCartStore } from '../../../store/cartStore'; // Adjust import path

function MainCard({ item, onBuy, onCart }) {
    const addCartItem = useCartStore(state => state.addCartItem);
    console.log("item is " , item)
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
                </div>
                <div className='flex w-full justify-evenly space-x-10'>
                    {onBuy && (
                        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={onBuy}>
                            Buy
                        </button>
                    )}
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={handleCart}>
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MainCard;
