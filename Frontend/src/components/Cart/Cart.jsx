import Navbar from "../Navbar/Navbar";
import CartCard from "./CartCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
    const [data, setData] = useState([]); // Initialize data as an empty array
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user._id;
    console.log("user is " , user)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/cart/get-user-cart`, {
                    params: { userId }
                });
                console.log(userId)
                if (Array.isArray(response.data.cartItems)) {
                    setData(response.data.cartItems);
                    console.log(response.data.cartItems)
                } else {
                    console.log("Expected an array but got: ", response.data);
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <Navbar />
            <div className="flex justify-between mx-10 gap-10 align-middle border min-h-screen h-full">
                <div className="border w-2/3 min-h-96 h-full flex align-top items-center flex-col gap-5">
                    <div className="border w-96 min-h-10 h-full flex flex-col justify-center items-center font-semibold text-xl rounded-lg mt-3 shadow-md bg-[#F1F5F9]">
                        Your Cart
                        <div className="text-lg font-normal">
                            Total Items: {data.length}
                        </div>
                    </div>
                    <div className="gap-10">

                        {Array.isArray(data) ? (
                            data.map((item) => {
                                console.log("items passed to CartCard are ", item)
                                return (


                                    <div key={item._id} className="mb-4">
                                        <CartCard data={item} />
                                    </div>
                                )
                            })
                        ) : (
                            <div>No items in the cart.</div>
                        )}

                    </div>
                </div>

                <div className="w-1/3 h-96 flex flex-col justify-start align-middle items-center">
                    <div className="shadow-xl h-32 w-80 flex flex-col font-semibold text-2xl mt-10">
                        <div className="m-4">
                            Total Cost:
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;
