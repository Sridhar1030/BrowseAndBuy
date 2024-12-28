import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowRight, Lock } from "lucide-react";
import axios from "axios";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [isAutoResendEnabled, setIsAutoResendEnabled] = useState(false);
    const [countdown, setCountdown] = useState(10);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => setEmail(e.target.value);

    const base_url = import.meta.env.VITE_API_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");
        setIsLoading(true);
        setIsAutoResendEnabled(true);
        setCountdown(10);

        try {
            const response = await axios.post(
                `${base_url}/auth/forgot-password`,
                { email }
            );
            if (response.status === 200) {
                setMessage("Password reset link sent to your email.");
            }
        } catch (error) {
            setError("Error sending password reset link.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        let interval;
        if (isAutoResendEnabled) {
            interval = setInterval(() => {
                setCountdown((prev) => {
                    if (prev === 1) {
                        setIsAutoResendEnabled(false);
                        clearInterval(interval);
                        return 10;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isAutoResendEnabled]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                <div className="text-center">
                    <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100">
                        <Lock className="w-8 h-8 text-blue-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        Forgot Password?
                    </h2>
                    <p className="text-gray-500 mb-8">
                        No worries, we'll send you reset instructions.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={handleChange}
                                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center transition-colors ${
                            isLoading
                                ? "bg-gray-400 text-white cursor-wait"
                                : "bg-blue-600 hover:bg-blue-700 text-white"
                        }`}
                        disabled={isLoading}
                    >
                        <span>
                            {isAutoResendEnabled ? `Resend in ${countdown}s` : "Reset Password"}
                        </span>
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </button>
                </form>

                {message && (
                    <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-green-600">{message}</p>
                    </div>
                )}
                {error && (
                    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600">{error}</p>
                    </div>
                )}

                <div className="mt-8 text-center">
                    <Link to="/" className="text-blue-600 hover:text-blue-700">
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
