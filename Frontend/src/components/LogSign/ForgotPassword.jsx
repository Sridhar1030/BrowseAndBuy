import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [isAutoResendEnabled, setIsAutoResendEnabled] = useState(false);
    const [countdown, setCountdown] = useState(10);
    const [autoResendInterval, setAutoResendInterval] = useState(null);

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");
        setIsAutoResendEnabled(true);
        setCountdown(10);
        clearInterval(autoResendInterval); // Clear any existing interval

        try {
            const response = await axios.post(
                "/api/auth/forgot-password",
                { email }
            );
            if (response.status === 200) {
                setMessage("Password reset link sent to your email.");
            }
        } catch (error) {
            if (error.response && error.response.status === 429) {
                setError(
                    "You have exceeded the maximum number of reset requests for today. Please try again tomorrow."
                );
            } else if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                setError(error.response.data.message);
            } else {
                setError("Error sending password reset link.");
            }
        }
    };

    useEffect(() => {
        if (isAutoResendEnabled) {
            const interval = setInterval(() => {
                setCountdown((prev) => {
                    if (prev === 1) {
                        setIsAutoResendEnabled(false);
                        clearInterval(interval);
                        return 10;
                    }
                    return prev - 1;
                });
            }, 1000);
            setAutoResendInterval(interval);
        }
        return () => clearInterval(autoResendInterval);
    }, [isAutoResendEnabled]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-semibold mb-4">Forgot Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border rounded"
                            placeholder="Enter your email"
                        />
                    </div>
                    {isAutoResendEnabled ? (
                        <button
                            type="submit"
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400"
                            disabled
                        >
                            Resend in {countdown}s
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Submit
                        </button>
                    )}
                </form>
                {message && <p className="mt-4 text-green-500">{message}</p>}
                {error && <p className="mt-4 text-red-500">{error}</p>}
                <p className="mt-4">
                    Remember your password?{" "}
                    <Link to="/" className="text-blue-500 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default ForgotPassword;
