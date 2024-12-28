import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { UserCircle2, Lock, ArrowRight, Loader2 } from "lucide-react";

export default function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const login = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        const baseURL = import.meta.env.VITE_API_URL;
        const url = `${baseURL}/auth/login`;
        const data = { username, password };

        try {
            const res = await axios.post(url, data);
            const user = res.data.data.user;

            if (res.status === 201) {
                if (res.data.data.accessToken && res.data.data.refreshToken) {
                    localStorage.setItem(
                        "accessToken",
                        res.data.data.accessToken
                    );
                    localStorage.setItem("user", JSON.stringify(user));
                    Cookies.set("accessToken", res.data.data.accessToken);
                    navigate("/home");
                }
            }
        } catch (err) {
            console.error(err);
            setError(
                err.response?.data?.message || "An error occurred during login"
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Left side - decorative */}
            <div className="hidden md:flex md:w-1/2 bg-blue-600 p-12 text-white justify-center items-center">
                <div className="max-w-md">
                    <h1 className="text-4xl font-bold mb-6">Welcome Back!</h1>
                    <p className="text-lg text-blue-100">
                        Log in to access your account and explore our
                        marketplace. Your next great purchase awaits!
                    </p>
                </div>
            </div>

            {/* Right side - login form */}
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <h2 className="mt-6 text-3xl font-bold text-gray-900">
                            Sign in to your account
                        </h2>
                    </div>

                    <form onSubmit={login} className="mt-8 space-y-6">
                        {error && (
                            <div className="bg-red-50 text-red-500 p-4 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Username
                                </label>
                                <div className="mt-1 relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <UserCircle2 className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                        className="pl-10 block w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        placeholder="Enter your username"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="mt-1 relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        className="pl-10 block w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        placeholder="Enter your password"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label
                                    htmlFor="remember-me"
                                    className="ml-2 block text-sm text-gray-700"
                                >
                                    Remember me
                                </label>
                            </div>

                            <Link
                                to="/forgot-password"
                                className="text-sm text-blue-600 hover:text-blue-500 transition-colors"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                            >
                                {isLoading ? (
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                ) : (
                                    <>
                                        Sign in
                                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{" "}
                            <Link
                                to="/signup"
                                className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                            >
                                Sign up now
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
