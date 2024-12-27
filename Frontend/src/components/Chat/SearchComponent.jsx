import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Search } from 'lucide-react';
import axios from 'axios';
import debounce from 'lodash/debounce';

const SearchComponent = ({ onSelectUser }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const searchRef = useRef(null);

    // Debounced search function
    const debouncedSearch = useCallback(
        debounce(async (query) => {
            if (!query.trim()) {
                setUsers([]);
                return;
            }

            setIsLoading(true);

            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/auth/search`, {
                    params: { query },
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                });
                setUsers(response.data.data);
            } catch (error) {
                console.error('Search error:', error);
            } finally {
                setIsLoading(false);
            }
        }, 300),
        []
    );

    // Handle click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowResults(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Clean up debounce on unmount
    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, [debouncedSearch]);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        debouncedSearch(value);
    };

    const handleUserSelect = (user) => {
        onSelectUser(user);
        setSearchTerm('');
        setShowResults(false);
    };

    return (
        <div className="relative" ref={searchRef}>
            <div className="relative">
                <Search 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                    size={20} 
                />
                <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onFocus={() => setShowResults(true)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-transparent rounded-lg focus:border-blue-500 focus:bg-white focus:ring-0 text-sm"
                />
            </div>

            {/* Search Results Dropdown */}
            {showResults && (searchTerm || isLoading) && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg mt-1 shadow-lg max-h-64 overflow-y-auto z-50">
                    {isLoading ? (
                        <div className="p-3 text-gray-500">Searching...</div>
                    ) : users.length > 0 ? (
                        users.map((user) => (
                            <div
                                key={user._id}
                                onClick={() => handleUserSelect(user)}
                                className="p-3 hover:bg-gray-100 cursor-pointer flex items-center"
                            >
                                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                                    {user.username.charAt(0).toUpperCase()}
                                </div>
                                <span className="ml-3">{user.username}</span>
                            </div>
                        ))
                    ) : searchTerm ? (
                        <div className="p-3 text-gray-500">No users found</div>
                    ) : null}
                </div>
            )}
        </div>
    );
};

export default SearchComponent;