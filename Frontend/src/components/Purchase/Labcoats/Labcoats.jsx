import React, { useEffect, useState } from 'react';
import Navbar from '../../Navbar/Navbar';
import Menu from '../../Menu/Menu';
import LCard from './LCard';

function Labcoats() {
    const [labcoats, setLabcoats] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/items/Labcoats')
            .then(response => response.json())
            .then(data => setLabcoats(data))
            .catch(error => console.error('Error fetching labcoats:', error));
    }, []);

    const handleSearch = (event) => {
        event.preventDefault();
        const searchTerm = event.target.elements.searchTerm.value.trim();
        // Implement search functionality here if needed
        console.log('Search term:', searchTerm);
    };

    return (
        <>
            <Navbar />
            <div className='flex'>
                <Menu />
                <div className='pl-72 mt-5 w-full'>
                    <div className='w-full flex justify-center items-center mb-4'>
                        <form className="w-full max-w-xs md:max-w-md lg:max-w-lg p-4" onSubmit={handleSearch}>
                            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 flex items-center pl-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </div>
                                <input
                                    type="search"
                                    id="default-search"
                                    name="searchTerm"
                                    className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                    placeholder="Search Labcoats..."
                                    required
                                />
                                <button
                                    type="submit"
                                    className="absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 text-white font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Search
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6'>
                        {labcoats.map((labcoat, index) => (
                            <div key={index} className='mb-4'>
                                <LCard labcoat={labcoat} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Labcoats;
