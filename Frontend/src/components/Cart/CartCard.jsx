const CartCard = () => {
    return (
        <div className="w-96 mt-5 p-4 shadow-xl shadow-gray-200 bg-gray-50">
            <div className="flex gap-4 items-center">

                <img
                    src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
                    alt="img"
                    className="w-28 h-28 border"
                />

                <div className="flex flex-col gap-2">

                    <div className="truncate w-40 h-10">
                        Product Name That Is Really Long
                    </div>

                    <div className="gap-4 flex items-center">


                        <button className="border border-black overflow-clip rounded-full">
                            <img
                                src="https://as1.ftcdn.net/v2/jpg/03/73/49/86/1000_F_373498649_nBxauQ0ipBSVrVcMpWWVmTpXu3BLvRyY.jpg"
                                className="size-7"
                                alt=""
                            />
                        </button>



                        <span>$110</span>


                        <button className="border border-black rounded-full">
                            <img
                                src="https://www.svgrepo.com/show/490974/add-stroke.svg"
                                className="size-7"
                                alt=""
                            />
                        </button>


                    </div>

                    <div className="w-40 truncate">
                        Category: Labcoats
                    </div>

                    <div className="max-w-fit">
                        Quantity: 1
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartCard;
