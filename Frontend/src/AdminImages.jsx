import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from '@cloudinary/react';
import { fit } from "@cloudinary/url-gen/actions/resize";

const AdminImages = () => {
    const location = useLocation();
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        if (location.state && location.state.formData) {
            console.log('Form Data on AdminImages:', location.state.formData);
            setFormData(location.state.formData);
        }
    }, [location.state]);

    // Create a Cloudinary instance and set your cloud name.
    const cld = new Cloudinary({
        cloud: {
            cloudName: 'sridhar1'
        }
    });

    // Render the images in a React component.
    return (
        <>
        <div className='flex justify-center items-center flex-wrap'>
            {formData && formData.public_ids.map((publicId, index) => {
                const myImage = cld.image(publicId);
                myImage.resize(fit().width(500).height(750));
                return (
                    <div key={index} className="m-4 ">
                        <AdvancedImage cldImg={myImage} />
                    </div>
                );
            })}
        </div>
            <div className="mt-2 text-center">
                <p>ItemName: {location.state.formData.ItemName}</p>
                <p>Name of seller: {location.state.formData.FirstName} {location.state.formData.LastName}</p>
            </div>
            </>
    );
};

export default AdminImages;
