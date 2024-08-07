import React, { useEffect, useState } from 'react';
import Menu from '../Menu/Menu';
import MainCard from './MainCard';
import axios from 'axios';

function Purchase() {
    const [items, setitems] = useState([]);
    const [filtereditems, setFiltereditems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isEmpty, setIsEmpty] = useState(false); // State to track if filtereditems is empty
    const baseURL = import.meta.env.VITE_API_URL;
    const url = `${baseURL}/api/items`;

    useEffect(() => {
        const fetchItem = async () => {
            const baseURL = import.meta.env.VITE_API_URL;
            const url = `${baseURL}/items/`;
            const response = await axios.get(url)
            // console.log(response.data)
            setitems(response.data);
            setFiltereditems(response.data)
        }

        fetchItem()

    }, [])

    // useEffect(() => {
    //     fetch('/api/items/')
    //         .then(response => response.json())
    //         .then(data => {
    //             setitems(data);
    //             setFiltereditems(data); // Initialize filtereditems with all items
    //         })
    //         .catch(error => console.error('Error fetching items:', error));
    // }, []);

    const handleSearch = (event) => {
        event.preventDefault(); // Prevent form submission
        console.log('Search term:', searchTerm);

        if (searchTerm === '') {
            setFiltereditems(items); // Display all items if search term is empty
            setIsEmpty(false); // Set isEmpty to false since we have items to display
        } else {
            const filtered = items.filter(item => item.Item_Name.toLowerCase().includes(searchTerm.toLowerCase()));
            setFiltereditems(filtered);

            // Check if filtereditems is empty
            setIsEmpty(filtered.length === 0);
        }
    };

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <>
            <div className='flex'>
                <Menu />
                <div className='pl-72 mt-5 w-full'>
                    <div className='w-full flex justify-center items-center mb-4'>
                        <form className="w-full max-w-xs md:max-w-md lg:max-w-lg p-4" onSubmit={handleSearch}>
                            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 flex items-center pl-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </div>
                                <input
                                    type="search"
                                    id="default-search"
                                    name="searchTerm"
                                    value={searchTerm}
                                    onChange={handleChange}
                                    className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                    placeholder="Search Items....."
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
                    {isEmpty ? (
                        <div className="text-center text-gray-600 mt-4">No items found matching your search.</div>
                    ) : (
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6'>
                            {filtereditems.map((item, index) => (
                                <div key={item._id} className='mb-4'>
                                    <MainCard item={item} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Purchase;
