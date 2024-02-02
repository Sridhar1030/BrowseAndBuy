import React from 'react';
import { Link } from 'react-router-dom';
import profileSvg from '../../assets/profile.svg';

function Navbar() {
    return (
        <nav className="sticky top-0 bg-slate-500 text-xl">
            <div className="flex justify-start space-x-11 h-20">
                <div className="flex justify-center align-middle">
                    <button>
                        <Link to="/" className="text-2xl flex justify-center align-middle">
                            <img className='size-10' src="https://cdn-icons-png.flaticon.com/512/9752/9752709.png" alt="" />
                            Browse And Buy
                        </Link>
                    </button>

                    <div className='flex text-lg ml-14 space-x-10'>
                        <button><Link to="/purchase">Purchase</Link></button>
                        <button><Link to="/sell">Sell</Link></button>
                        <button><Link to="/orders">Your orders</Link></button>

                        <button ><Link to="/account" className='flex justify-center align-middle'><img className='mr-2 size-5 flexjustify-center' src={profileSvg} alt="" />Account</Link></button>
                    </div>
                </div>
                {/* <div className="fixed flex justify-items-center items-center right-10 p-4 cursor-pointer">
                    <input type="text" placeholder="Search" className="ml-3 w-32 text-base text-center rounded-xl" />
                </div> */}
            </div>
        </nav>
    );
}

export default Navbar;
