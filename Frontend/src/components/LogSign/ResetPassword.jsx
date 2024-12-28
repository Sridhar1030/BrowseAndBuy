import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

function ResetPassword() {
    const { id, token } = useParams();
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "newPassword") setNewPassword(value);
        if (name === "confirmPassword") setConfirmPassword(value);
    };

    const getPasswordStrength = (password) => {
        let strength = 0;
        if (password.length > 8) strength += 25;
        if (password.match(/[A-Z]/)) strength += 25;
        if (password.match(/[0-9]/)) strength += 25;
        if (password.match(/[^A-Za-z0-9]/)) strength += 25;
        return strength;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");
        setIsLoading(true);

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            setIsLoading(false);
            return;
        }

        const base_url = import.meta.env.VITE_API_URL;

        try {
            const response = await axios.post(
                `${base_url}/auth/reset-password/${id}/${token}`,
                {
                    newPassword,
                    confirmPassword,
                }
            );
            if (response.status === 200) {
                setMessage("Password reset successfully!");
                setTimeout(() => {
                    navigate("/");
                }, 2000);
            }
        } catch (error) {
            setError(
                error.response?.data?.message || "Error resetting password."
            );
        } finally {
            setIsLoading(false);
        }
    };

    const strengthClass = () => {
        const strength = getPasswordStrength(newPassword);
        if (strength >= 100) return "bg-green-500";
        if (strength >= 75) return "bg-blue-500";
        if (strength >= 50) return "bg-yellow-500";
        return "bg-red-500";
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="max-w-md w-full mx-4 bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="px-8 pt-8 pb-6 bg-gradient-to-r from-blue-600 to-purple-600">
                    <h2 className="text-3xl font-bold text-white mb-2">Reset Password</h2>
                    <p className="text-blue-100">Create a strong password for your account</p>
                </div>
                
                <div className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    New Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="newPassword"
                                        value={newPassword}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                        placeholder="Enter your new password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    >
                                        {showPassword ? "Hide" : "Show"}
                                    </button>
                                </div>
                                {newPassword && (
                                    <div className="mt-2">
                                        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                                            <div 
                                                className={`h-full ${strengthClass()} transition-all duration-300`}
                                                style={{ width: `${getPasswordStrength(newPassword)}%` }}
                                            />
                                        </div>
                                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                                            <span>Weak</span>
                                            <span>Strong</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        value={confirmPassword}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                        placeholder="Confirm your new password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    >
                                        {showConfirmPassword ? "Hide" : "Show"}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {message && (
                            <div className="bg-green-50 text-green-800 p-4 rounded-lg flex items-center">
                                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                {message}
                            </div>
                        )}

                        {error && (
                            <div className="bg-red-50 text-red-800 p-4 rounded-lg flex items-center">
                                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 disabled:opacity-50"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <div className="w-5 h-5 border-4 border-blue-200 border-t-white rounded-full animate-spin mr-2" />
                                    Resetting...
                                </div>
                            ) : (
                                "Reset Password"
                            )}
                        </button>

                        <div className="text-center mt-6">
                            <Link 
                                to="/" 
                                className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center transition duration-200"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Back to Login
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;