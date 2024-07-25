import React, { useState } from 'react';

const ImageCarousel = ({ imageIds }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const previousImage = () => {
        setCurrentImageIndex(prevIndex => (prevIndex === 0 ? imageIds.length - 1 : prevIndex - 1));
    };

    const nextImage = () => {
        setCurrentImageIndex(prevIndex => (prevIndex === imageIds.length - 1 ? 0 : prevIndex + 1));
    };

    const currentImageId = imageIds[currentImageIndex].trim();

    return (
        <div className='relative w-full flex justify-center items-center mb-4 size-56 m-10 overflow-clip'>
            {/* Render the current image */}
            {/* Replace with your image rendering logic */}
            <img src={`https://res.cloudinary.com/sridhar1/image/upload/${currentImageId}`} alt="Product" className='rounded-lg' />

            {imageIds.length > 1 && (
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
            )}
        </div>
    );
};

export default ImageCarousel;
