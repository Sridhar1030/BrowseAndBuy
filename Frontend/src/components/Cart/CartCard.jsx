import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from '@cloudinary/react';
import { fit } from "@cloudinary/url-gen/actions/resize";

function CartCard({ data }) {
    const [quantity, setQuantity] = useState(data.quantity);

    const cld = new Cloudinary({
        cloud: {
            cloudName: 'sridhar1'
        }
    });

    // Assuming data.product.image is an array
    const imageIds = data.product.image.split(',');
    const currentImageId = imageIds[0].trim();

    // Logging the current image ID
    console.log("Current Image ID:", currentImageId);

    const image = cld.image(currentImageId);
    image.resize(fit().width(500).height(750));

    const user = JSON.parse(localStorage.getItem("user"));
    const Productid = data.product.id;

    const handleAdd = () => {
        setQuantity(quantity + 1);
        PostDataAdd();
    }

    const handleSub = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
            PostDataSub();
        }
    }

    const TotalPrice = Math.round(data.product.price * quantity);

    const PostDataSub = async () => {
        try {
            const response = await axios.post('http://localhost:3000/cart/decrease-qty', {
                userId: user._id,
                Productid: Productid
            });
            console.log('POST request response:', response.data);
        } catch (error) {
            console.error('Error making POST request:', error);
        }
    }

    const PostDataAdd = async () => {
        try {
            const response = await axios.post('http://localhost:3000/cart/add-qty', {
                userId: user._id,
                Productid: Productid
            });
            console.log('POST request response:', response.data);
        } catch (error) {
            console.error('Error making POST request:', error);
        }
    };

    useEffect(() => {
        console.log("items are", data);
    }, []); // Empty dependency array ensures this effect runs only once on mount

    return (
        <div className="w-96 mt-5 p-4 shadow-xl shadow-gray-200 bg-gray-50">
            <div className="flex gap-4 items-center">
                <AdvancedImage cldImg={image} className="w-28 h-30 border" />
                <div className="flex flex-col gap-2">
                    <div className="truncate w-40 h-10">{data.product.title}</div>
                    <div className="gap-4 flex items-center">
                        <button className="border border-black overflow-clip rounded-full" type="button" onClick={handleSub}>
                            <img
                                src="https://as1.ftcdn.net/v2/jpg/03/73/49/86/1000_F_373498649_nBxauQ0ipBSVrVcMpWWVmTpXu3BLvRyY.jpg"
                                className="size-7"
                                alt="Decrease quantity"
                            />
                        </button>
                        <span> Quantity: {quantity}</span>
                        <button className="border border-black rounded-full " type="button" onClick={handleAdd}>
                            <img
                                src="https://www.svgrepo.com/show/490974/add-stroke.svg"
                                className="size-7"
                                alt="Increase quantity"
                            />
                        </button>
                    </div>
                    <div className="w-40 truncate">
                        Category: {data.product.category}
                    </div>
                    <div className="max-w-fit">
                        Price: {Math.round(data.product.price)}
                    </div>
                    <div className="max-w-fit">
                        Total Price: {TotalPrice}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartCard;
