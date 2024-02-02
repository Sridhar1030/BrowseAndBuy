import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Card from '../Purchase/Book/Card';  // Import the Card component

function Order() {
    const [yourOrders, setYourPressed] = useState(true);
    const [prevOrders, setPrevPressed] = useState(false);

    const numberOfCards = yourOrders ? 1 : 0; // Generates a random number between 1 and 5 if yourOrders is true

    return (
        <>
            <div><Navbar /></div>
            <div className='flex justify-center mt-9'>
                <button
                    className={`hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mr-12 ${
                        yourOrders ? 'bg-blue-500 border-blue-500 text-white' : ''
                    }`}
                    onClick={() => {
                        setYourPressed(true);
                        setPrevPressed(false);
                    }}
                >
                    Your orders
                </button>
                <button
                    className={`hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ${
                        prevOrders ? 'bg-blue-500 border-blue-500 text-white' : ''
                    }`}
                    onClick={() => {
                        setYourPressed(false);
                        setPrevPressed(!prevOrders);
                    }}
                >
                    Previously Ordered
                </button>
            </div>
            
            {/* Conditionally render cards based on the random number */}
            <div className='flex justify-center flex-wrap m-8 gap-6 cursor-pointer'>
                {Array.from({ length: numberOfCards }, (_, index) => (
                    <Card key={index} />
                ))}
            </div>
        </>
    );
}

export default Order;
