import React, { useState } from 'react';
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from '@cloudinary/react';
import { fit } from "@cloudinary/url-gen/actions/resize";

function LCard({ labcoat }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const cld = new Cloudinary({
        cloud: {
            cloudName: 'sridhar1'
        }
    });

    const imageIds = labcoat.Image_ID.split(',');

    const previousImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? imageIds.length - 1 : prevIndex - 1));
    };

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === imageIds.length - 1 ? 0 : prevIndex + 1));
    };

    const currentImageId = imageIds[currentImageIndex].trim();
    const image = cld.image(currentImageId);
    image.resize(fit().width(500).height(750));

    return (
        <div className='card border rounded-lg shadow-lg p-6 m-4 '>
            <div className='relative flex flex-col items-center'>
                <div className='relative w-full flex justify-center items-center mb-4 size-56 m-10  overflow-clip '>
                    <AdvancedImage cldImg={image} className='rounded-lg' />
                </div>
            
            <div className='text-center m-10 '>
                <div className=''>
                    {imageIds.length > 1 && (
                        <button
                            className='absolute left-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l'
                            onClick={previousImage}
                        >
                            &lt;
                        </button>
                    )}
                    {imageIds.length > 1 && (
                        <button
                            className='absolute right-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r'
                            onClick={nextImage}
                        >
                            &gt;
                        </button>
                    )}
                </div>
                <div className=' '>

                    <h3 className='text-2xl font-bold mb-2'>{labcoat.Item_Name}</h3>
                    <p className='text-gray-700 mb-2'>Price: ${labcoat.price}</p>
                    <p className='text-gray-700 mb-2'>Seller: {labcoat.F_Name} {labcoat.L_Name}</p>
                    <p className='text-gray-700 mb-2'>Phone: {labcoat.phone}</p>
                    <p className='text-gray-700 mb-2'>Semester: {labcoat.semester}</p>
                    <p className='text-gray-700 mb-2'>Approved: {labcoat.Approved ? "Yes" : "No"}</p>
                </div>
            </div>
            </div>
        </div>
    );
}

export default LCard;
