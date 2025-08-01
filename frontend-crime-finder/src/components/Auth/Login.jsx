// src/pages/Login.jsx

import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import AppLogo from "../../assets/app-logo.png";
import { useTheme } from "../../context/ThemeContext";
import { CiMail } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdErrorOutline } from "react-icons/md";

const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { theme } = useTheme();

  

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!form.email || !form.password) {
      setIsLoading(false);
      return setError("All fields are required.");
    }

    try {
      const res = await axiosInstance.post(
        `${BACKEND_URI}/api/v1/auth/login`,
        { email: form.email, password: form.password },
        { withCredentials: true }
      );

      const data = res.data.data;
      localStorage.setItem("crimeFinderAccessToken", JSON.stringify(data));
      navigate("/dashboard");
    } catch (err) {
      const message =
        err.response?.data?.message || "Login failed. Please try again.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 sm:px-6 py-10 transition-colors duration-300 ${
        theme === "light"
          ? "bg-gradient-to-br from-blue-50 to-indigo-50"
          : "bg-gradient-to-br from-zinc-900 via-zinc-800 to-gray-900"
      }`}
    >
      <div className="w-full max-w-6xl bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 transition-all duration-300">

        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex flex-col justify-center items-center px-6 py-12 lg:py-0">
          <div className="w-full max-w-sm mx-auto flex flex-col items-center">
            <img
              src={AppLogo}
              alt="App Logo"
              className="w-24 h-24 sm:w-28 sm:h-28 mb-6 rounded-full border-4 border-white/20 shadow-lg"
            />
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3">
              Welcome to <span className="text-indigo-200">Crime Finder</span>
            </h2>
            <p className="text-sm sm:text-base text-center text-indigo-100 max-w-md">
              Securely verify individual backgrounds with our comprehensive database.
              Empowering trust and safety in every interaction.
            </p>
            <div className="mt-8 w-full max-w-xs h-1 bg-white/20 rounded-full"></div>
          </div>
        </div>


        <form
          onSubmit={handleSubmit}
          className={`w-full p-8 sm:p-10 md:p-12 flex flex-col justify-center space-y-6 ${
            theme === "light" ? "bg-white" : "bg-gray-800"
          }`}
        >
          <div className="text-center">
            <h2 className={`text-2xl sm:text-3xl font-bold  mb-2 ${
                    theme === "light" ?
                     "text-gray-800" : "text-white"
            }`}>
              Sign In
            </h2>
            <p className={`text-sm ${
                    theme === "light" ?
                     "text-gray-800" : "text-white"
            }`}>
              Enter your credentials to access your account
            </p>
          </div>

          {error && (
            <div className="bg-red-100 dark:bg-red-900/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-100 px-4 py-3 rounded-lg text-sm">
              <div className="flex items-center justify-center space-x-2">
             
                <MdErrorOutline  className="h-5 w-5"/>
                <span>{error}</span>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium  mb-2 ${
                    theme === "light" ?
                     "text-gray-800" : "text-white"
            }`}>
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    theme === "light"
                      ? "bg-gray-50 border-gray-200 text-gray-800 focus:border-indigo-400"
                      : "bg-gray-700 border-gray-600 text-white focus:border-indigo-500"
                  } focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-500/50 transition duration-200`}
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <CiMail className="h-5 w-5 text-gray-400" />
                  
                </div>
              </div>
            </div>

            <div>
               <label className={`block text-sm font-medium  mb-2 ${
                    theme === "light" ?
                     "text-gray-800" : "text-white"
            }`}>
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    theme === "light"
                      ? "bg-gray-50 border-gray-200 text-gray-800 focus:border-indigo-400"
                      : "bg-gray-700 border-gray-600 text-white focus:border-indigo-500"
                  } focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-500/50 transition duration-200`}
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  
                  <RiLockPasswordLine   className="h-5 w-5 text-gray-400"/>
                </div>
              </div>
            </div>

           </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white font-medium ${
              isLoading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200`}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className={`px-2 text-gray-500 ${theme === "light" ? "bg-white":"bg-gray-800"}`}>
                Don't have an account?
              </span>
            </div>
          </div>

          <a
            href="/register"
            className={`w-full flex justify-center py-2.5 px-4 border  rounded-lg shadow-sm text-sm font-medium
            block text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 mb-2 ${
                    theme === "light" ?
                     "text-gray-700 hover:bg-gray-50" : "text-gray-300 hover:bg-gray-700"
            }`}>
            Register here
          </a>
        </form>
      </div>
    </div>
  );
};

export default Login;