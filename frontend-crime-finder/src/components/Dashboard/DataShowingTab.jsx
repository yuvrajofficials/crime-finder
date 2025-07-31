import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useTheme } from "../../context/ThemeContext";
const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;

const DataShowingTab = () => {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");

  const fetchData = async () => {
    try {
      const res = await axiosInstance.get(`${BACKEND_URI}/api/v1/admin/get-all-suspects`);
      setDataList(res.data.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = dataList
    .filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "name-asc") return a.name.localeCompare(b.name);
      if (sortOption === "name-desc") return b.name.localeCompare(a.name);
      if (sortOption === "status-asc") return a.status.localeCompare(b.status);
      if (sortOption === "status-desc") return b.status.localeCompare(a.status);
      return 0;
    });

  if (loading)
    return <div className="text-center mt-10 text-gray-500">Loading...</div>;

  return (
    <div
      className={`flex flex-col h-full max-h-[80vh] p-4 sm:p-6 rounded-xl shadow-md transition-all duration-300 ${
        isLight ? "bg-white text-gray-800" : "bg-zinc-900 text-gray-200"
      }`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <h2 className="text-xl font-semibold text-center sm:text-left">
          Submitted Suspects
        </h2>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search by name or status..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full sm:w-64 px-3 py-2 text-sm rounded-md outline-none ${
              isLight
                ? "bg-gray-100 border border-gray-300 text-black"
                : "bg-zinc-800 border border-zinc-600 text-white"
            }`}
          />

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className={`px-3 py-2 text-sm rounded-md outline-none ${
              isLight
                ? "bg-gray-100 border border-gray-300 text-black"
                : "bg-zinc-800 border border-zinc-600 text-white"
            }`}
          >
            <option value="">Sort By</option>
            <option value="name-asc">Name (A - Z)</option>
            <option value="name-desc">Name (Z - A)</option>
            <option value="status-asc">Status (A - Z)</option>
            <option value="status-desc">Status (Z - A)</option>
          </select>
        </div>
      </div>

      {/* Content List */}
      <div className="flex-1 overflow-y-auto rounded-lg">
        {filteredData.length === 0 ? (
          <p className="text-center text-gray-500">No matching results.</p>
        ) : (
          <ul
            className={`space-y-4 p-4 rounded-lg ${
              isLight
                ? "bg-gray-100 border border-gray-300"
                : "bg-zinc-800 border border-zinc-700"
            }`}
          >
            {filteredData.map((item) => (
              <li
                key={item.id}
                className="p-3 border-b border-gray-400 text-sm sm:text-base"
              >
                <p
                  className={`font-medium ${
                    item.status === "criminal"
                      ? "text-red-500"
                      : item.status === "pending"
                      ? "text-violet-500"
                      : "text-green-500"
                  }`}
                >
                  Name: {item.name}
                </p>
                <p className="mt-1">Description: {item.description}</p>
                <p className="mt-1">Status: {item.status}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DataShowingTab;
