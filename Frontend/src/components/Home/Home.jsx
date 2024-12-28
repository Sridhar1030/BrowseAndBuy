import React from "react";
import {
    ShoppingBag,
    PiggyBank,
    Tag,
    Store,
    HeadphonesIcon,
} from "lucide-react";

const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
            {/* Hero Section */}
            <div className="pt-16 pb-8 text-center">
                <h1 className="text-5xl font-bold tracking-tight">
                    online with <br />
                    <span className="bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent">
                        Browse and Buy
                    </span>
                </h1>
            </div>

            {/* Middle Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-4xl font-bold text-gray-800 leading-tight">
                            Introducing the new
                            <br />
                            <span className="text-blue-600">
                                Era of Second hand market.
                            </span>
                        </h2>
                        <p className="text-lg text-gray-600">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Consequuntur facilis ea voluptas quibusdam
                            nulla, animi quod nesciunt cupiditate odit?
                        </p>
                        <button className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-lg font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-blue-500 group-hover:from-purple-500 group-hover:to-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300">
                            <span className="relative px-6 py-3 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0 group-hover:text-white">
                                Learn More
                            </span>
                        </button>
                    </div>
                    <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                        <img
                            src="https://img.freepik.com/free-vector/it-specialist-set-flat-isolated-icons-characters-programmers-technicians-servers-with-personal-computers-vector-illustration_1284-68703.jpg"
                            alt="IT Specialists"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
                    {[
                        {
                            icon: <ShoppingBag className="w-8 h-8" />,
                            title: "Online Order",
                            color: "bg-amber-100",
                        },
                        {
                            icon: <PiggyBank className="w-8 h-8" />,
                            title: "Save Money",
                            color: "bg-cyan-100",
                        },
                        {
                            icon: <Tag className="w-8 h-8" />,
                            title: "Promotions",
                            color: "bg-green-100",
                        },
                        {
                            icon: <Store className="w-8 h-8" />,
                            title: "Sell",
                            color: "bg-orange-100",
                        },
                        {
                            icon: <HeadphonesIcon className="w-8 h-8" />,
                            title: "24/7 Support",
                            color: "bg-blue-100",
                        },
                    ].map((feature, index) => (
                        <div
                            key={index}
                            className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-2xl"
                        >
                            <div className="flex flex-col items-center space-y-4">
                                <div
                                    className={`${feature.color} p-4 rounded-full`}
                                >
                                    {feature.icon}
                                </div>
                                <h3
                                    className={`text-lg font-semibold capitalize ${feature.color.replace("bg-", "text-").replace("-100", "-700")}`}
                                >
                                    {feature.title}
                                </h3>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
