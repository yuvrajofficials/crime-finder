import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance"; // your configured axios instance
import DashboardWrapper from "./DashboardWrapper";

const NotificationsView = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const res = await axiosInstance.get("/api/v1/admin/all-notification");
      setNotifications(res.data.data);
    } catch (err) {
      console.error("Failed to fetch notifications", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  if (loading) {
    return <p className="text-gray-600 dark:text-gray-300">Loading notifications...</p>;
  }

  if (notifications.length === 0) {
    return <p className="text-gray-600 dark:text-gray-300">No notifications found.</p>;
  }

  return (
    <DashboardWrapper>

    <div className="w-full max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        Criminal Alerts ({notifications.length})
      </h2>
      <ul className="space-y-4">
        {notifications.map((item) => (
            <li
            key={item.id}
            className="border-l-4 border-red-600 bg-red-50 dark:bg-red-900/40 p-4 rounded shadow hover:bg-red-100 dark:hover:bg-red-800 transition"
            >
            <p className="text-lg font-bold text-red-800 dark:text-red-300">{item.name}</p>
            <p className="text-sm text-red-700 dark:text-red-200">
              {item.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
        </DashboardWrapper>
  );
};

export default NotificationsView;
