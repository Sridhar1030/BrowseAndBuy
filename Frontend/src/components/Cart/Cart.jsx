import Navbar from "../Navbar/Navbar"
import CartCard from "./CartCard"

const Cart = () => {
    return (
        <>
            <Navbar />
            <div className="flex justify-between mx-10 gap-10 align-middle border  min-h-screen h-full">
                <div className=" border w-2/3 min-h-96 h-full flex align-top items-center flex-col gap-5">
                    <div className="border w-96  min-h-10 h-full flex flex-col justify-center items-center font-semibold text-xl rounded-lg mt-3 shadow-md bg-[#F1F5F9]">
                        Your Cart
                        <div className="text-lg font-normal">
                            Total Items: 3
                        </div>

                    </div>
                    <div className="gap-10">

                        <CartCard />
                        <CartCard />
                        <CartCard />
                        <CartCard />
                        <CartCard />

                    </div>
                </div>

                <div className=" w-1/3 h-96  flex flex-col justify-start align-middle items-center ">
                    <div className="shadow-xl h-32 w-80 flex flex-col font-semibold text-2xl mt-10">
                        <div className="m-4">

                        Total Cost : 
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Cart