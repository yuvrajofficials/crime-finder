import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import axiosInstance from "../../api/axiosInstance";
import { useTheme } from "../../context/ThemeContext";

const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;

const COLORS = {
  criminal: "#EF4444", 
  pending: "#8B5CF6", 
  verified: "#10B981", 
};

const DataGraph = () => {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(true);


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

  const statusCounts = dataList.reduce((acc, curr) => {
    acc[curr.status] = (acc[curr.status] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(statusCounts).map(([status, count]) => ({
    name: status,
    value: count,
  }));

  if (loading) return <p className="text-center mt-6 text-gray-500">Loading...</p>;

  return (
    <div
      className={`p-4 sm:p-6 rounded-xl shadow-md transition-all duration-300 ${
        isLight ? "bg-white text-gray-800" : "bg-zinc-900 text-gray-200"
      }`}
    >
      <h2 className="text-xl font-semibold mb-6 text-center">Status Distribution</h2>


      <div className="flex justify-center mb-10">
        <PieChart width={300} height={300}>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            dataKey="value"
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={`pie-cell-${index}`} fill={COLORS[entry.name] || "#ccc"} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>


      <div className="flex justify-center">
        <BarChart width={400} height={300} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8">
            {chartData.map((entry, index) => (
              <Cell key={`bar-cell-${index}`} fill={COLORS[entry.name] || "#ccc"} />
            ))}
          </Bar>
        </BarChart>
      </div>
    </div>
  );
};

export default DataGraph;
