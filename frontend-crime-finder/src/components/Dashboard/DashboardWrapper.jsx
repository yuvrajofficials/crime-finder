import React, { useEffect, useState } from "react";
import {
  MdOutlineMenu,
  MdClose,
  MdDarkMode,
  MdLightMode,
} from "react-icons/md";
import {
  IoSettings,
  IoNotifications,
  IoLogOut,
  IoAnalytics,
} from "react-icons/io5";
import { useTheme } from "../../context/ThemeContext";
import { NavLink } from "react-router-dom";

const navItems = [
  { icon: IoAnalytics, label: "Dashboard", path: "/dashboard" },
  { icon: IoSettings, label: "Settings", path: "#settings" },
  { icon: IoNotifications, label: "Notifications", path: "/notifications" },
  { icon: IoLogOut, label: "Logout", path: "/logout" },
];

const DashboardWrapper = ({ children }) => {
  const { theme, toggleTheme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user,setUser] = useState({});

  
useEffect(() => {
  const storedUser = localStorage.getItem("crimeFinderAccessToken");


  if (storedUser) {
    try {
      const authUser = JSON.parse(storedUser); // ✅ parse string to object
      
      setUser(authUser);
      

    } catch (err) {
      console.error("Failed to parse user token:", err);
    }
  } else {
    console.warn("No user token found");
  }
}, []);


  const isDark = theme === "dark";

  return (
    <div className={`flex min-h-screen font-sans ${isDark ? "bg-zinc-950 text-white" : "bg-gray-100 text-gray-800"}`}>
      
      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`min-h-screen fixed md:relative top-0 left-0 z-50 w-64 h-full transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 shadow-lg md:shadow-none flex flex-col ${
          isDark ? "bg-zinc-900 border-r border-zinc-800" : "bg-white border-r border-gray-200"
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b dark:border-gray-700 border-gray-200">
          <h2 className="text-2xl font-bold text-violet-600 dark:text-violet-400">
            CRIME<span className="text-gray-900 dark:text-gray-400"> FINDER</span>
          </h2>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6 space-y-2">
          {navItems.map((item, index) => {
            const isActive = index === 0; // mock
            return (
              <NavLink to={item.path}
                key={item.label}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${
                  isActive
                    ? isDark
                      ? "bg-gray-700 text-violet-400 font-semibold"
                      : "bg-violet-100 text-violet-800 font-semibold"
                    : isDark
                    ? "text-gray-300 hover:bg-gray-700 hover:text-violet-400"
                    : "text-gray-700 hover:bg-violet-50 hover:text-violet-700"
                }`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Profile */}
        <div className="p-6 border-t dark:border-gray-700 border-gray-200">
          <div className="flex items-center gap-3 font-semibold">
            <div className="w-10 h-10 flex items-center justify-center bg-violet-500 rounded-full text-white text-xl">
              {user.name?.slice(0,1).toUpperCase()}
            </div>
            <span> {user?.name?.slice(0,1).toUpperCase()}{user?.name?.slice(1,).toLowerCase()}</span>
          </div>
        </div>
      </aside>

      {/* Mobile menu icon */}
      <div className="md:hidden fixed top-5 right-20 ">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-full bg-white dark:bg-gray-800 shadow text-gray-700 dark:text-white"
        >
          {isSidebarOpen ? <MdClose size={24} /> : <MdOutlineMenu size={24} />}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className={`w-full px-6 py-5 shadow ${isDark ? "bg-zinc-900 border-b border-zinc-700" : "bg-white border-b border-gray-200"}`}>
          <div className="flex justify-between items-center">
            <h1 className="text-xl md:text-2xl font-semibold">Dashboard</h1>
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition ${
                isDark
                  ? "text-yellow-400 hover:text-yellow-300"
                  : "text-gray-700 hover:text-gray-900"
              }`}
              aria-label="Toggle Theme"
            >
              {isDark ? <MdDarkMode size={24} /> : <MdLightMode size={24} />}
            </button>
          </div>
        </header>

        {/* Page Content */}
        {/* Page Content */}
<main className="flex-1 overflow-y-auto max-h-[calc(100vh-80px)] p-6 md:p-8">
  {children}
</main>

      </div>
    </div>
  );
};

export default DashboardWrapper;
