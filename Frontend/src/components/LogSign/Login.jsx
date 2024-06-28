import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Login ()  {
    const navigate = useNavigate();
    const [username, setusername] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    const login = async () => {
        console.log({ username, password, email });
        const url = "http://localhost:3000/login";
        const data = { username, password, email };
        
        try {
            const res = await axios.post(url, data);
            console.log(res.data);
            if (res.data.message) {
                alert(res.data.message);
                if(res.data.token){
                    localStorage.setItem("token",res.data.token)
                    navigate("/home")
                }
            }
        } catch (err) {
            console.log(err);
            alert("server is in error");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-semibold mb-4">Login</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                            className="mt-1 p-2 w-full border rounded"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setusername(e.target.value)}
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
                            onChange={(e) => setpassword(e.target.value)}
                            className="mt-1 p-2 w-full border rounded"
                            placeholder="Enter your password"
                        />
                    </div>
                </form>
                <button
                    type="submit"
                    onClick={login}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Log In
                </button>
                Don't have an account?
                <a href="/signup" className="text-blue-500 hover:underline flex">
                    Register
                </a>
            </div>
        </div>
    );
};

export default Login;
