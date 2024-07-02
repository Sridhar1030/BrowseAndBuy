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
    const Approve = () => {
        alert ("Approve button clicked");
    }
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
                {formData && formData.Image_ID && formData.Image_ID.map((publicId, index) => {
                    const myImage = cld.image(publicId);
                    myImage.resize(fit().width(500).height(750));
                    return (
                        <div key={index} className="m-4">
                            <AdvancedImage cldImg={myImage} />
                            
                        </div>
                    );
                })}
            </div>
            <div className="m-28 text-center font-bold text-4xl border border-red-400 bg-gray-200">
                <p>Item Name: {formData && formData.Item_Name}</p>
                <p>Seller Name: {formData && formData.F_Name} {formData && formData.L_Name}</p>
                <p>Price: {formData && formData.price}₹ </p>
                <p>Category: {formData && formData.category}</p>
                <p>Semester: {formData && formData.semester}</p>
                <button className='text-red-400 font-bold py-2 px-4 rounded-full m-3 self-end hover:text-red-800' onClick={Approve}>APPROVE</button>
            </div>
            
        </>
    );
};

export default AdminImages;
