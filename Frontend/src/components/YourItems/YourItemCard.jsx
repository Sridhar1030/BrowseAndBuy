import React, { useState } from 'react';
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from '@cloudinary/react';
import { fit } from "@cloudinary/url-gen/actions/resize";
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const YourItemCard = ({ item }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const cld = new Cloudinary({
        cloud: {
            cloudName: 'sridhar1'
        }
    });

    const imageIds = item.Image_ID.split(',');

    const previousImage = () => {
        setCurrentImageIndex(prevIndex => (prevIndex === 0 ? imageIds.length - 1 : prevIndex - 1));
    };

    const nextImage = () => {
        setCurrentImageIndex(prevIndex => (prevIndex === imageIds.length - 1 ? 0 : prevIndex + 1));
    };

    const currentImageId = imageIds[currentImageIndex].trim();
    const image = cld.image(currentImageId);
    image.resize(fit().width(500).height(750));

    return (
        <div className="card border rounded-lg shadow-lg p-6 m-4">
            <ToastContainer
                position="bottom-right"
                autoClose={1000}
                hideProgressBar
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                theme="dark"
                transition={Zoom}
            />
            <div className="relative flex flex-col items-center">
                <div className="relative w-full flex justify-center items-center mb-4 overflow-hidden">
                    <AdvancedImage cldImg={image} className="rounded-lg" />
                    {imageIds.length > 1 && (
                        <>
                            <button
                                className="absolute left-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l"
                                onClick={previousImage}
                            >
                                &lt;
                            </button>
                            <button
                                className="absolute right-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
                                onClick={nextImage}
                            >
                                &gt;
                            </button>
                        </>
                    )}
                </div>
                <div className="text-center">
                    <h3 className="text-2xl font-bold mb-2">{item.Item_Name}</h3>
                    <p className="text-gray-700 mb-2">Price: ${item.price}</p>
                    <p className="text-gray-700 mb-2">Seller: {item.F_Name} {item.L_Name}</p>
                    <p className="text-gray-700 mb-2">Phone: {item.phone}</p>
                    <p className="text-gray-700 mb-2">Semester: {item.semester}</p>
                    <p className="text-gray-700 mb-2">Category: {item.category}</p>
                    <p className="text-gray-700 mb-2">Approved: {item.Approved ? "Yes" : "No"}</p>
                </div>
            </div>
        </div>
    );
};

export default YourItemCard;
