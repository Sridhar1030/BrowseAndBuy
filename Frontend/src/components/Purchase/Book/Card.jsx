import React, { useState } from 'react';
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from '@cloudinary/react';
import { fit } from "@cloudinary/url-gen/actions/resize";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCartStore } from  '../../../../store/cartStore'; // Adjust the import path as necessary

function Card({ book }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const cld = new Cloudinary({
        cloud: {
            cloudName: 'sridhar1'
        }
    });

    const imageIds = book.Image_ID.split(',');

    const previousImage = () => {
        setCurrentImageIndex(prevIndex => (prevIndex === 0 ? imageIds.length - 1 : prevIndex - 1));
    };

    const nextImage = () => {
        setCurrentImageIndex(prevIndex => (prevIndex === imageIds.length - 1 ? 0 : prevIndex + 1));
    };

    const currentImageId = imageIds[currentImageIndex].trim();
    const image = cld.image(currentImageId);
    image.resize(fit().width(500).height(750));

    const addCartItem = useCartStore(state => state.addCartItem);

    const handleCart = async () => {
        console.log("cart button clicked");
        const token = localStorage.getItem('user');
        
        const productData = {
            id: book._id,
            image: book.Image_ID,
            category: book.category,
            title: book.Item_Name,
            price: book.price,
            quantity: 1
        };
        
        console.log(productData);

        try {
            const response = await addCartItem(productData);
            if (response.message == "exist") {
                toast.warning("Item already exists");
            } else {
                toast.success("Added to cart");
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            toast.error('Failed to add to cart');
        }
    };

    const handleBuy = () => {
        console.log("buy button clicked");
        const token = localStorage.getItem('user');
        console.log(token);

        if (token) {
            try {
                const user = JSON.parse(token);
                const userId = user._id;
                console.log(userId, "wants to buy");
            } catch (error) {
                console.log("Failed to decode token:", error);
            }
        } else {
            console.log("No token found in localStorage");
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
                // transition={Zoom}
            />
            <div className='relative flex flex-col items-center'>
                <div className='relative w-full flex justify-center items-center mb-4 size-56 m-10 overflow-clip'>
                    <AdvancedImage cldImg={image} className='rounded-lg' />
                    {imageIds.length > 1 && (
                        <>
                            <div className='flex flex-col'>
                                <button
                                    className='absolute left-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l'
                                    onClick={previousImage}
                                >
                                    &lt;
                                </button>
                                <button
                                    className='absolute right-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r'
                                    onClick={nextImage}
                                >
                                    &gt;
                                </button>
                            </div>
                        </>
                    )}
                </div>
                <div className='text-center m-10'>
                    <h3 className='text-2xl font-bold mb-2'>{book.Item_Name}</h3>
                    <p className='text-gray-700 mb-2'>Price: ${book.price}</p>
                    <p className='text-gray-700 mb-2'>Seller: {book.F_Name} {book.L_Name}</p>
                    <p className='text-gray-700 mb-2'>Phone: {book.phone}</p>
                    <p className='text-gray-700 mb-2'>Semester: {book.semester}</p>
                    <p className='text-gray-700 mb-2'>Approved: {book.Approved ? "Yes" : "No"}</p>
                </div>
                <div className='flex w-full justify-evenly space-x-10'>
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={handleBuy}>
                        Buy
                    </button>
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={handleCart}>
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Card;
