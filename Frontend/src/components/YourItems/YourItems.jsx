import React, { useEffect, useState } from 'react';
import { useProductCart } from '../../../store/ProductStore';
import YourItemCard from './YourItemCard';

const YourItems = () => {
    const { fetchSellingItems } = useProductCart();
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetchSellingItems();

                if (Array.isArray(response)) {
                    setItems(response);
                    console.log("Items fetched:", response);
                } else {
                    console.error("fetchSellingItems did not return a valid response:", response);
                    setItems([]);
                }
            } catch (error) {
                console.error("Error fetching items:", error.message);
            }
        };

        fetchItems();
    }, [fetchSellingItems]);

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">Your Items:</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {items.map((item, index) => (
                    <YourItemCard key={index} item={item} />
                ))}
            </div>
        </div>
    );
};

export default YourItems;
