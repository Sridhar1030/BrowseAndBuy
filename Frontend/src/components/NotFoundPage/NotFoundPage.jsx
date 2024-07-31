import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div class="text-center">
            <h1 class="text-5xl font-bold text-black">Oops!</h1>
            <p class="text-gray-600 mt-6 mb-3">
                The page you are looking for might have been removed, had its
                name changed or is temporarily unavailable.
            </p>
            <Link to="/" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6">
                GO TO Login Page
            </Link>
        </div>
    );
};

export default NotFoundPage;
