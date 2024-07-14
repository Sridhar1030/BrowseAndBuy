import React from 'react';
import Navbar from '../Navbar/Navbar';
import { jwtDecode } from 'jwt-decode';

function Account() {
    // Retrieve and decode the token from localStorage
    const token = localStorage.getItem('accessToken');
    
    let user = {};

    if (token) {
        try {
            user = jwtDecode(token);
            console.log("user is ",user)
        } catch (error) {
            console.error("Failed to decode token:", error);
        }
    } else {
        console.log("No token found in localStorage");
    }

    return (
        <>
            <div className="container mx-auto my-10 p-5">
                <div className="bg-white shadow-xl rounded-lg p-6">
                    <div className="text-center mb-6">
                        <h1 className="text-3xl font-semibold mb-2">Account Details</h1>
                        <p className="text-gray-600">Here you can view and update your account information.</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <img
                            className="w-32 h-32 rounded-full shadow-lg mb-4"
                            src={`https://ui-avatars.com/api/?name=${user.username}`}
                            alt="Profile"
                        />
                        <div className="text-left w-full md:w-1/2">
                            <div className="mb-4">
                                <h2 className="text-xl font-semibold text-gray-700">Username</h2>
                                <p className="text-gray-600">{user.username}</p>
                            </div>
                            <div className="mb-4">
                                <h2 className="text-xl font-semibold text-gray-700">Email</h2>
                                <p className="text-gray-600">{user.email}</p>
                            </div>
                            <div>
                                Items sold
                            </div>
                            <div>
                                Items purchased
                            </div>
                            {/* Add more account details here as needed */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Account;
