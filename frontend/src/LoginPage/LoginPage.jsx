import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { IndianRupeeIcon } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState(""); // Remove default value
  const [password, setPassword] = useState(""); // Remove default value
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

   if (password.length < 4) {
      setError("Password must be at least 4 characters long");
      return;
    }

    // Simulate login with sample credentials
    const sampleEmail = "alexjohnson0625@gmail.com";
    const samplePassword = "1234";

    if (email === sampleEmail && password === samplePassword) {
      console.log("Login successful with:", { email, password });
      navigate("/dashboard"); // Navigate to dashboard on successful login
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md transform transition-all duration-500 hover:shadow-2xl">
        {/* Logo/Title */}
        <div className="flex items-center justify-center mb-8">
          
          <h1 className="ml-3 text-2xl font-bold text-gray-800">
            Growth Guardian
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300"
              placeholder="••••••"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-600 text-sm text-center bg-red-50 p-2 rounded-lg">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
          >
            Log In
          </button>
        </form>

        {/* Additional Links */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="#" className="text-blue-600 hover:underline font-medium">
              Sign Up
            </a>
          </p>
          <p className="mt-2 text-sm text-gray-600">
            <a href="#" className="text-blue-600 hover:underline font-medium">
              Forgot Password?
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;