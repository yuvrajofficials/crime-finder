import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import AppLogo from "../../assets/app-logo.png";
import { useTheme } from "../../context/ThemeContext";
import { CiMail } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdErrorOutline } from "react-icons/md";
import { FaUser, FaPhoneAlt } from "react-icons/fa";

const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
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

    if (!form.name || !form.email || !form.phone || !form.password) {
      setIsLoading(false);
      return setError("All fields are required.");
    }

    try {
      await axiosInstance.post(`${BACKEND_URI}/api/v1/auth/register`, form);
      navigate("/login");
    } catch (err) {
      const message = err.response?.data?.message || "Registration failed. Please try again.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 py-10 transition-colors duration-300 ${
        theme === "light"
          ? "bg-gradient-to-br from-blue-50 to-indigo-50"
          : "bg-gradient-to-br from-zinc-900 via-zinc-800 to-gray-900"
      }`}
    >
      <div className="w-full max-w-6xl bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex flex-col justify-center items-center px-6 py-12 lg:py-0">
          <img
            src={AppLogo}
            alt="App Logo"
            className="w-24 h-24 mb-6 rounded-full border-4 border-white/20 shadow-lg"
          />
          <h2 className="text-3xl font-bold text-center mb-3">
            Join <span className="text-indigo-200">Crime Finder</span>
          </h2>
          <p className="text-sm text-center text-indigo-100 max-w-md">
            Register to access crime verification tools and ensure safety and transparency.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className={`w-full p-8 sm:p-10 md:p-12 space-y-6 ${
            theme === "light" ? "bg-white" : "bg-gray-800"
          }`}
        >
          <div className="text-center">
            <h2 className={`text-2xl font-bold mb-2 ${theme === "light" ? "text-gray-800" : "text-white"}`}>Register</h2>
            <p className={`text-sm ${theme === "light" ? "text-gray-800" : "text-white"}`}>
              Create your account by filling the form below
            </p>
          </div>

          {error && (
            <div className="bg-red-100 dark:bg-red-900/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-100 px-4 py-3 rounded-lg text-sm">
              <div className="flex items-center space-x-2">
                <MdErrorOutline className="h-5 w-5" />
                <span>{error}</span>
              </div>
            </div>
          )}

          {[
            { label: "Full Name", name: "name", icon: <FaUser /> },
            { label: "Email Address", name: "email", icon: <CiMail /> },
            { label: "Phone Number", name: "phone", icon: <FaPhoneAlt /> },
            { label: "Password", name: "password", type: "password", icon: <RiLockPasswordLine /> },
          ].map(({ label, name, type = "text", icon }) => (
            <div key={name}>
              <label className={`block text-sm font-medium mb-2 ${theme === "light" ? "text-gray-800" : "text-white"}`}>
                {label}
              </label>
              <div className="relative">
                <input
                  type={type}
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    theme === "light"
                      ? "bg-gray-50 border-gray-200 text-gray-800 focus:border-indigo-400"
                      : "bg-gray-700 border-gray-600 text-white focus:border-indigo-500"
                  } focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-500/50 transition`}
                  placeholder={label}
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                  {icon}
                </div>
              </div>
            </div>
          ))}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-lg shadow-sm text-white font-medium transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              isLoading ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Registering...
              </>
            ) : (
              "Register"
            )}
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className={`px-2 ${theme === "light" ? "bg-white text-gray-500" : "bg-gray-800 text-gray-400"}`}>
                Already have an account?
              </span>
            </div>
          </div>

          <a
            href="/login"
            className={`w-full flex justify-center py-2.5 px-4 border rounded-lg text-sm font-medium transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              theme === "light" ? "text-gray-700 hover:bg-gray-50" : "text-gray-300 hover:bg-gray-700"
            }`}
          >
            Sign in here
          </a>
        </form>
      </div>
    </div>
  );
};

export default Register;
