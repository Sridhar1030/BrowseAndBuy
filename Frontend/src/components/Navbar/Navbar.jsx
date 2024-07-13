import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import profileSvg from '../../assets/profile.svg';

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user')
        navigate('/')
    };
    return (
        <nav className="sticky top-0 bg-slate-500 text-xl flex justify-between z-50">

            <div className="flex justify-start space-x-11 h-20 mx-3">
                <div className="flex justify-center align-middle ">
                    <button>
                        <Link to="/home" className="text-2xl flex justify-center align-middle">
                            <img className='size-10' src="https://cdn-icons-png.flaticon.com/512/9752/9752709.png" alt="" />
                            Browse And Buy
                        </Link>
                    </button>

                    <div className='flex text-lg ml-14 space-x-10 '>
                        <button><Link to="/purchase">Purchase</Link></button>
                        <button><Link to="/form">Sell</Link></button>
                        <button><Link to="/orders">Your orders</Link></button>

                        <button ><Link to="/account" className='flex justify-center align-middle'><img className='mr-2 size-5 flexjustify-center' src={profileSvg} alt="" />Account</Link></button>
                    </div>

                </div>
                {/* <div className="fixed flex justify-items-center items-center right-10 p-4 cursor-pointer">
                    <input type="text" placeholder="Search" className="ml-3 w-32 text-base text-center rounded-xl" />
                </div> */}
            </div>
            <div className='mx-5 flex items-center gap-10'>
                <button ><Link to="/cart" className='flex justify-center align-middle gap-4 hover:size-8'>
                    <img width={30} height={30} src="https://img.icons8.com/ios/50/shopping-cart--v1.png" alt="shopping-cart--v1" />
                </Link>
                </button>

                <button onClick={handleLogout} className=' hover:text-red-500'>
                    logout
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
