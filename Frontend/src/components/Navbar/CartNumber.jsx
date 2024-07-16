import React, { useEffect } from 'react';
import { useCartStore } from '../../../store/cartStore'; // Adjust the import path as necessary

const CartNumber = () => {
    const { cartNumber, fetchCartNumber } = useCartStore();

    useEffect(() => {
        fetchCartNumber();
    }, []);

    return (
        <div className='-mb-2 -mr-1 flex justify-center text-sm'>
            {cartNumber}
        </div>
    );
};

export default CartNumber;
