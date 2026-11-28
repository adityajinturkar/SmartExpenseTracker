import { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaMoon,
  FaSun,
  FaChevronDown,
  FaSignOutAlt,
} from "react-icons/fa";
import NotificationBell from "./NotificationBell";

export default function Navbar({ darkMode, setDarkMode, notifications, user }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const today = new Date().toLocaleDateString("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

         {/* Logo and Date */}
<div className="flex items-center gap-2 shrink-0">
  <span className="text-2xl">💰</span>

  <div className="flex flex-col">
    <h1 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white whitespace-nowrap">
      SmartExpenseAI
    </h1>

    <span className="hidden xl:block text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
      {today}
    </span>
  </div>
</div>

          {/* Navigation */}
          <div className="hidden lg:flex items-center gap-8 font-medium text-gray-700 dark:text-gray-200">
            <a href="#home" className="hover:text-blue-600">
              Home
            </a>
            <a href="#features" className="hover:text-blue-600">
              Features
            </a>
            <a href="#dashboard" className="hover:text-blue-600">
              Dashboard
            </a>
            <a href="#ai" className="hover:text-blue-600">
              AI Insights
            </a>
            <a href="#transactions" className="hover:text-blue-600">
              Transactions
            </a>
            <a href="#about" className="hover:text-blue-600">
              About
            </a>
            <a href="#contact" className="hover:text-blue-600">
              Contact
            </a>
          </div>
          {/* Right Side */}
          <div className="flex items-center gap-2 sm:gap-4">
            <NotificationBell notifications={notifications} />

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              <span className="flex items-center gap-2">
                {darkMode ? "☀️" : "🌙"}
                {/* {darkMode ?  } */}
              </span>

              <span className="text-gray-400">
                {/* {darkMode ? "" : ""} */}
              </span>
            </button>

            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <div className="flex items-center gap-2">
                  <span className="hidden sm:block font-medium text-gray-900 dark:text-white">
  Welcome,
</span>

                  <span className=" hidden md:block font-semibold text-gray-900 dark:text-white">
                    {user?.name?.split(" ")[0] || "User"}
                  </span>

                  <FaChevronDown
                    className={`transition-transform ${
                      showProfileMenu ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-3 w-52 bg-white dark:bg-gray-800 rounded-xl shadow-xl border dark:border-gray-700 overflow-hidden">
                  {/* <button className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700">
        👤 My Profile
      </button> */}

                  <hr className="dark:border-gray-700" />

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <FaSignOutAlt />
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* ✅ Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              <FaBars className="text-2xl text-gray-700 dark:text-white" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Background Overlay */}
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Drawer */}
        <div
          className={`absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white dark:bg-slate-900 shadow-2xl transition-transform duration-300 ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-slate-700">
            <h2 className="text-xl font-bold text-blue-600">
              💰 SmartExpenseAI
            </h2>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl text-gray-700 dark:text-slate-100"
            >
              <FaTimes />
            </button>
          </div>

          {/* Menu */}
          <div className="flex flex-col p-5 gap-2 text-base font-medium text-gray-800 dark:text-gray-100">
            <a
              href="#home"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 rounded-xl hover:bg-blue-50 dark:hover:bg-slate-800 transition"
            >
              Home
            </a>

            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 rounded-xl hover:bg-blue-50 dark:hover:bg-slate-800 transition"
            >
              Features
            </a>

            <a
              href="#dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 rounded-xl hover:bg-blue-50 dark:hover:bg-slate-800 transition"
            >
              Dashboard
            </a>

            <a
              href="#ai"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 rounded-xl hover:bg-blue-50 dark:hover:bg-slate-800 transition"
            >
              AI Insights
            </a>

            <a
              href="#transactions"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 rounded-xl hover:bg-blue-50 dark:hover:bg-slate-800 transition"
            >
              Transactions
            </a>

            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 rounded-xl hover:bg-blue-50 dark:hover:bg-slate-800 transition"
            >
              About
            </a>

            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 rounded-xl hover:bg-blue-50 dark:hover:bg-slate-800 transition"
            >
              Contact
            </a>

            <hr className="my-2 dark:border-gray-700" />

            {/* Dark Mode */}
            <button
              onClick={() => {
                setDarkMode(!darkMode);
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 dark:hover:bg-slate-800 transition"
            >
              {darkMode ? <FaSun /> : <FaMoon />}
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>

            <hr className="my-2 dark:border-slate-700" />

            {/* User */}
            {/* 
      
      */}

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 transition mt-3"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
