import React from 'react';
import { Link } from 'react-router-dom';
import Book from '../../assets/book.svg';
import menu from '../../assets/menu.svg';

function Menu() {
    return (

        <>
            <div className='bg-sky-700 w-60 fixed h-screen text-white border border-sky-700 space-y-10 '>
                <div className='ml-7 mt-4 text-2xl flex gap-2 '>
                    <Link to="/purchase">
                        <div className='flex gap-4'>
                            <img className='' src={menu} alt="" />
                            MENU
                        </div>
                    </Link>
                </div>
                <div className='m-2'>
                    <Link to="/purchase/book">
                        <div className='mt-10 flex gap-4'>
                            <img src={Book} alt="" /> Engineering Books
                        </div>
                    </Link>
                    <Link to="/purchase/instruments">
                        <div className='mt-10 flex gap-4'>
                            <img src={Book} alt="" /> Graphics Instruments
                        </div>
                    </Link>
                    <Link to="/purchase/labcoats">
                        <div className=' mt-10 flex gap-4'>
                            <img src={Book} alt="" /> Lab Coats
                        </div>
                    </Link>
                    <Link to="/purchase/notes">
                        <div className=' mt-10 flex gap-4'>
                            <img src={Book} alt="" /> Notes
                        </div>
                    </Link>
                    <Link to="/purchase/pyqs">
                        <div className='mt-10 flex gap-4'>
                            <img src={Book} alt="" /> PYQS
                        </div>
                    </Link>

                </div>

            </div>

        </>
    );
}

export default Menu;
