import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
    Mail,
    User,
    Lock,
    UserCircle,
    Loader2,
    CheckCircle2,
    XCircle,
} from "lucide-react";

const Signup = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        fullName: "",
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [validatingEmail, setValidatingEmail] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setError("");
        setMessage("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");
        setIsLoading(true);
        setValidatingEmail(true);

        try {
            const apiKey = import.meta.env.VITE_EMAIL_VALIDATION_API_KEY;
            const email = formData.email.replace("@", "%40");

            // Email validation
            const emailUrl = `https://emailvalidation.abstractapi.com/v1?api_key=${apiKey}&email=${email}`;
            const emailValidation = await axios.get(emailUrl);

            if (emailValidation.data.is_smtp_valid.value === false) {
                setError("Invalid email address. Please check and try again.");
                setValidatingEmail(false);
                setIsLoading(false);
                return;
            }

            // Signup request
            const base_url = import.meta.env.VITE_API_URL;
            const url = `${base_url}/auth/signup`;
            const response = await axios.post(url, formData);

            setMessage(response.data.message);
            setFormData({
                username: "",
                email: "",
                password: "",
                fullName: "",
            });
        } catch (error) {
            setError(
                error.response?.data?.message ||
                    "An error occurred during signup"
            );
        } finally {
            setIsLoading(false);
            setValidatingEmail(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Left side - decorative */}
            <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 p-12 text-white justify-center items-center">
                <div className="max-w-md space-y-6">
                    <h1 className="text-4xl font-bold">Start Your Journey</h1>
                    <p className="text-lg text-blue-100">
                        Join our marketplace community and discover amazing
                        deals. Create your account today to start buying and
                        selling with confidence.
                    </p>
                    <div className="space-y-4 mt-8">
                        <div className="flex items-center space-x-3">
                            <CheckCircle2 className="h-6 w-6 text-blue-300" />
                            <span>Access to exclusive deals</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <CheckCircle2 className="h-6 w-6 text-blue-300" />
                            <span>Secure transactions</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <CheckCircle2 className="h-6 w-6 text-blue-300" />
                            <span>24/7 customer support</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right side - form */}
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-900">
                            Create your account
                        </h2>
                        <p className="mt-2 text-gray-600">
                            Join our community today
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                        {message && (
                            <div className="bg-green-50 text-green-600 p-4 rounded-lg flex items-center">
                                <CheckCircle2 className="h-5 w-5 mr-2" />
                                {message}
                            </div>
                        )}

                        {error && (
                            <div className="bg-red-50 text-red-500 p-4 rounded-lg flex items-center">
                                <XCircle className="h-5 w-5 mr-2" />
                                {error}
                            </div>
                        )}

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <div className="mt-1 relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="pl-10 block w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        placeholder="Enter your email"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Username
                                </label>
                                <div className="mt-1 relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        className="pl-10 block w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        placeholder="Choose a username"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Full Name
                                </label>
                                <div className="mt-1 relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <UserCircle className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        className="pl-10 block w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        placeholder="Enter your full name"
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
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="pl-10 block w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        placeholder="Create a password"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <div className="flex items-center">
                                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                                    {validatingEmail
                                        ? "Validating Email..."
                                        : "Creating Account..."}
                                </div>
                            ) : (
                                "Sign Up"
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{" "}
                            <Link
                                to="/"
                                className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                            >
                                Sign in instead
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
