import React, { useState } from 'react';
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from '@cloudinary/react';
import { jwtDecode } from 'jwt-decode';
import { fit } from "@cloudinary/url-gen/actions/resize";

function PurchaseCard({ book }) {
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

    const handleCart = () => {
        console.log("cart button clicked");
    };

    const handleBuy = () => {
        console.log("buy button clicked");
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const username = decodedToken.data.username;
                console.log(username, "wants to buy");
            } catch (error) {
                console.log("Failed to decode token:", error);
            }
        } else {
            console.log("No token found in localStorage");
        }
    };

    return (
        <div className='card border rounded-lg shadow-lg p-6 m-4'>
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
                    <p className='text-gray-700 mb-2'>Category: {book.category}</p>
                    <p className='text-gray-700 mb-2'>Approved: {book.Approved ? "Yes" : "No"}</p>
                </div>
                <div className='flex w-full justify-evenly  space-x-10'>
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

export default PurchaseCard;
