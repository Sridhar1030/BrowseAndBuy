// src/SignupPage.js
import React from 'react';
import { useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
function Signup() {

    const [username, setusername] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    const handleSignup = () => {
        console.log({ username, password, email })
        const url = "http://localhost:3000/auth/signup"
        const data = { username, password, email }
        axios.post(url, data)
            .then((res) => {
                console.log(res.data)
                if (res.data.message) {
                    alert(res.data.message)
                }
            })
            .catch((err) => {
                console.log(err)
                alert("server error")
            })
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => {
                                setemail(e.target.value);

                            }}
                            className="mt-1 p-2 w-full border rounded"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => {
                                setusername(e.target.value);

                            }}
                            className="mt-1 p-2 w-full border rounded"
                            placeholder="Enter username"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setpassword(e.target.value);

                            }}
                            className="mt-1 p-2 w-full border rounded"
                            placeholder="Enter your password"
                        />
                    </div>
                </form>

                {/* <Link to = "/home"> */}
                <button
                    // type="submit"
                    onClick={handleSignup}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Sign Up
                </button>
                {/* </Link> */}
                Already have an account?
                <a href="/" className="text-blue-500 hover:underline flex">
                    Login
                </a>
            </div>
        </div>
    );
};

export default Signup;
