import React, { useEffect, useState } from 'react';
import Menu from '../../Menu/Menu';
import Gcard from './Gcard';

function Book() {
    const [Graph, setGraph] = useState([]);
    const [filteredGraph, setFilteredGraph] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isEmpty, setIsEmpty] = useState(false); // State to track if filteredBooks is empty

    useEffect(() => {
        fetch('http://localhost:3000/api/items/GraphicsInstruments')
            .then(response => response.json())
            .then(data => {
                setGraph(data);
                setFilteredGraph(data); // Initialize filteredBooks with all books
            })
            .catch(error => console.error('Error fetching books:', error));
    }, []);

    const handleSearch = (event) => {
        event.preventDefault(); // Prevent form submission
        console.log('Search term:', searchTerm);

        if (searchTerm === '') {
            setFilteredGraph(Graph); // Display all books if search term is empty
        } else {
            const filtered = Graph.filter(Graph => Graph.Item_Name.toLowerCase().includes(searchTerm.toLowerCase()));
            setFilteredBooks(filtered);
        }

        // Check if filteredBooks is empty
        setIsEmpty(filteredBooks.length === 0 && searchTerm !== '');
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
                                    placeholder="Search Book..."
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
                        <div className="text-center text-gray-600 mt-4">No such Instruments found.</div>
                    ) : (
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6'>
                            {filteredGraph.map((Graph, index) => (
                                <div key={Graph._id} className='mb-4'>
                                    <Gcard Graph={Graph} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Book;
