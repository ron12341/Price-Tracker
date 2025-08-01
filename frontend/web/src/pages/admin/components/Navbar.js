import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/admin/login", { replace: true });
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm dark:bg-gray-800">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left side - Logo/Brand */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Price Tracker</h1>
          </div>

          {/* Right side - Navigation */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">Welcome,</span>
              <span className="font-medium text-gray-900 dark:text-white">Admin</span>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 rounded-md bg-red-50 dark:bg-red-900/30 px-3 py-1.5 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
            >
              <ArrowLeftEndOnRectangleIcon className="h-5 w-5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
