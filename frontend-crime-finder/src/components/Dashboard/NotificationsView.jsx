import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import DashboardWrapper from "./DashboardWrapper";
import { IoClose, IoNotifications } from "react-icons/io5";
import { FiClock, FiAlertCircle, FiUser, FiMapPin, FiAlertTriangle } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

const NotificationsView = () => {
  const { theme } = useTheme();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const handleNotificationClick = (notification) => {
    if (isMobile) {
      setSelectedNotification(notification);
    } else {
      setSelectedNotification(notification);
    }
  };

  const handleBackToList = () => {
    setSelectedNotification(null);
  };

  if (loading) {
    return (
      <DashboardWrapper>
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse flex flex-col items-center space-y-4">
            <div className={`h-12 w-12 rounded-full ${theme === 'dark' ? 'bg-violet-900' : 'bg-violet-100'}`}></div>
            <div className={`h-4 w-32 rounded ${theme === 'dark' ? 'bg-zinc-700' : 'bg-zinc-200'}`}></div>
          </div>
        </div>
      </DashboardWrapper>
    );
  }

  if (notifications.length === 0) {
    return (
      <DashboardWrapper>
        <div className="flex flex-col items-center justify-center h-64 text-center p-6">
          <IoNotifications className={`text-4xl ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'} mb-4`} />
          <h3 className={`text-xl font-medium ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-600'} mb-2`}>
            No notifications yet
          </h3>
          <p className={`max-w-md ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>
            When new criminal alerts are detected, they'll appear here.
          </p>
        </div>
      </DashboardWrapper>
    );
  }

  return (
    <DashboardWrapper>
      {isMobile ? (
        <div className="h-full">
          {!selectedNotification ? (
            <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm dark:shadow-none border border-zinc-100 dark:border-zinc-700 p-4 h-full">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-zinc-800 dark:text-white">
                  Criminal Alerts
                </h2>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${theme === 'dark' ? 'bg-violet-900 text-violet-200' : 'bg-violet-100 text-violet-600'}`}>
                  {notifications.length} new
                </span>
              </div>

              <div className="space-y-2">
                {notifications.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`border rounded-lg p-3 transition-all duration-200 cursor-pointer ${
                      theme === 'dark' ? 'border-zinc-700 hover:bg-zinc-700/50' : 'border-zinc-100 hover:bg-zinc-50'
                    }`}
                    onClick={() => handleNotificationClick(item)}
                  >
                    <div className="flex items-start gap-2">
                      <div className={`p-1.5 rounded-lg ${theme === 'dark' ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-500'}`}>
                        <FiAlertCircle size={18} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className={`font-medium ${theme === 'dark' ? 'text-zinc-100' : 'text-zinc-800'}`}>
                            {item.name}
                          </h3>
                          <span className={`text-xs flex items-center ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>
                            <FiClock className="mr-1" size={10} />
                            {new Date(item.timestamp).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                        <p className={`text-xs mt-1 line-clamp-2 ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-600'}`}>
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm dark:shadow-none border border-zinc-100 dark:border-zinc-700 p-4 h-full"
            >
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={handleBackToList}
                  className={`p-1.5 rounded-full ${theme === 'dark' ? 'hover:bg-zinc-700' : 'hover:bg-zinc-100'}`}
                >
                  <IoClose size={20} className={theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'} />
                </button>
                <h2 className="text-xl font-bold text-zinc-800 dark:text-white">
                  Alert Details
                </h2>
                <div className="w-6"></div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${theme === 'dark' ? 'bg-red-900/30 text-red-300' : 'bg-red-100 text-red-600'}`}>
                    <FiAlertTriangle className="mr-1" size={12} />
                    High Priority
                  </span>
                  
                </div>

                <div>
                  <h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-zinc-200' : 'text-zinc-700'}`}>
                    Criminal Identification
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-violet-900 text-violet-300' : 'bg-violet-100 text-violet-600'}`}>
                      <FiUser size={20} />
                    </div>
                    <div>
                      <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-zinc-800'}`}>
                        {selectedNotification.name}
                      </p>
                      <p className={`text-xs ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>
                        ID: {selectedNotification.id}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-zinc-200' : 'text-zinc-700'}`}>
                    Description
                  </h3>
                  <p className={`text-sm whitespace-pre-line ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-600'}`}>
                    {selectedNotification.description}
                  </p>
                </div>



               
              </div>
            </motion.div>
          )}
        </div>
      ) : (

        <div className="flex flex-col  lg:flex-row gap-4 h-full">
   
          <div className="w-full lg:w-2/5 xl:w-1/3">
            <div className={`overflow-auto  rounded-xl shadow-sm border p-4 h-full ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-zinc-100'}`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-800'}`}>
                  Criminal Alerts
                </h2>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${theme === 'dark' ? 'bg-violet-900 text-violet-200' : 'bg-violet-100 text-violet-600'}`}>
                  {notifications.length} new
                </span>
              </div>

              <div className="space-y-2 ">
                {notifications.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`border rounded-lg p-3 transition-all duration-200 cursor-pointer ${
                      selectedNotification?.id === item.id
                        ? theme === 'dark'
                          ? 'border-violet-500 bg-violet-900/30'
                          : 'border-violet-500 bg-violet-50'
                        : theme === 'dark'
                          ? 'border-zinc-700 hover:bg-zinc-700/50'
                          : 'border-zinc-100 hover:bg-zinc-50'
                    }`}
                    onClick={() => handleNotificationClick(item)}
                  >
                    <div className="flex items-start gap-2">
                      <div className={`p-1.5 rounded-lg ${theme === 'dark' ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-500'}`}>
                        <FiAlertCircle size={18} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className={`font-medium ${theme === 'dark' ? 'text-zinc-100' : 'text-zinc-800'}`}>
                            {item.name}
                          </h3>
                         
                        </div>
                        <p className={`text-xs mt-1 line-clamp-2 ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-600'}`}>
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <AnimatePresence>
            {selectedNotification ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="w-full lg:w-3/5 xl:w-2/3"
              >
                <div className={`rounded-xl shadow-sm border p-6 h-full ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-zinc-100'}`}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-800'}`}>
                        Alert Details
                      </h2>
                      <div className="flex items-center mt-2 gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${theme === 'dark' ? 'bg-red-900/30 text-red-300' : 'bg-red-100 text-red-600'}`}>
                          <FiAlertTriangle className="mr-1" size={12} />
                          High Priority
                        </span>
                       
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedNotification(null)}
                      className={`p-2 rounded-full ${theme === 'dark' ? 'hover:bg-zinc-700 text-zinc-400' : 'hover:bg-zinc-100 text-zinc-500'}`}
                    >
                      <IoClose size={20} />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-zinc-200' : 'text-zinc-700'}`}>
                        Criminal Identification
                      </h3>
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-violet-900 text-violet-300' : 'bg-violet-100 text-violet-600'}`}>
                          <FiUser size={24} />
                        </div>
                        <div>
                          <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-zinc-800'}`}>
                            {selectedNotification.name}
                          </p>
                          <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>
                            ID: {selectedNotification.id}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-zinc-200' : 'text-zinc-700'}`}>
                        Description
                      </h3>
                      <p className={`text-sm whitespace-pre-line ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-600'}`}>
                        {selectedNotification.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className={`w-full lg:w-3/5 xl:w-2/3 flex items-center justify-center rounded-xl ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-zinc-100'} border p-6`}>
                <div className="text-center">
                  <IoNotifications className={`mx-auto text-4xl mb-3 ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`} />
                  <h3 className={`text-lg font-medium mb-1 ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-600'}`}>
                    No alert selected
                  </h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>
                    Select a notification from the list to view details
                  </p>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      )}
    </DashboardWrapper>
  );
};

export default NotificationsView;