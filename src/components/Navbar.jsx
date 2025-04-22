import { useDarkMode } from "../hooks/useDarkMode";
import { Link } from "react-router-dom"; // This assumes you're using React Router for navigation

export const Navbar = () => {
  const { isDark, toggleDarkMode } = useDarkMode();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between p-6 bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md dark:from-gray-800 dark:to-gray-900">
      {/* Website Logo or Title */}
      <h1 className="text-xl font-bold text-white">My Portfolio</h1>

      {/* Navbar Links */}
      <div className="flex space-x-6">
        {/* Dark Mode Toggle Button */}
        <button
          onClick={toggleDarkMode}
          aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
          className="flex items-center justify-center p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500"
        >
          {isDark ? (
            <span className="text-xl">☀️ Light</span>
          ) : (
            <span className="text-xl">🌙 Dark</span>
          )}
        </button>
      </div>
    </nav>
  );
};
