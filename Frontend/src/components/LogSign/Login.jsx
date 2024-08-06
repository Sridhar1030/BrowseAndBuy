import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {
        const baseURL = import.meta.env.VITE_API_URL;
        const url = "https://browseandbuy-1.onrender.com/api/auth/login";
        const data = { username, password };

        try {
            const res = await axios.post(url, data);
            const user = res.data.data.user;
            if (res.status === 201) {
                console.log(res);
                if (res.data.data.accessToken && res.data.data.refreshToken) {
                    localStorage.setItem("accessToken", res.data.data.accessToken);
                    localStorage.setItem("user", JSON.stringify(user));
                    Cookies.set("accessToken", res.data.data.accessToken);

                    navigate("/home");
                }
            } else {
                console.log("error", res.data.message); // Handle other response codes if necessary
            }
        } catch (err) {
            console.error(err);
            alert("Server error occurred");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-semibold mb-4">Login</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 p-2 w-full border rounded"
                            placeholder="Enter your password"
                        />
                    </div>
                </form>
                <button
                    type="button"
                    onClick={login}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Log In
                </button>
                <p className="mt-2">Do not have an account?</p>
                <Link to="/signup" className="text-blue-500 hover:underline flex">
                    Register
                </Link>
                <div className="mt-4">
                    <Link to="/forgot-password" className="text-blue-500 hover:underline">
                        Forgot Password?
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
