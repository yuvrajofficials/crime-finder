import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import axiosInstance from "../../api/axiosInstance";
const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;

const DataCollectionForm = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
 
    try {
      const res = await axiosInstance.post(
        `${BACKEND_URI}/api/v1/admin/add-details`,
        formData
      );
      console.log("Response:", res.data);
      alert("Submitted successfully!");
      setFormData({ name: "", description: "" }); // reset form
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Something went wrong.");
    }
  };

  const isLight = theme === "light";

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className={`w-full max-w-2xl p-6 sm:p-8 rounded-2xl shadow-lg border ${
  isLight
    ? "bg-white border-gray-200 text-gray-900"
    : "bg-zinc-800 border-gray-700 text-gray-100"
} transition-all duration-300`}

      >
             <h2 className="text-xl font-semibold mb-6 text-center">   Submit New Suspect</h2>

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-semibold mb-2">
            Name
          </label>
          <input
            id="name"
            name="name"
            placeholder="Enter the name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
              isLight
                ? "bg-white text-black border-gray-300 focus:ring-violet-400"
                : "bg-zinc-700 text-white border-gray-600 focus:ring-violet-400"
            }`}
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="description" className="block text-sm font-semibold mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Write a short description..."
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className={`w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 ${
              isLight
                ? "bg-white text-black border-gray-300 focus:ring-violet-400"
                : "bg-zinc-700 text-white border-gray-600 focus:ring-violet-400"
            }`}
            required
          />
        </div>

        <button
          type="submit"
          className={`w-full py-3 rounded-lg font-semibold transition duration-200 ${
            isLight
              ? "bg-violet-600 hover:bg-violet-700 text-white"
              : "bg-violet-500 hover:bg-violet-600 text-white"
          }`}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default DataCollectionForm;
