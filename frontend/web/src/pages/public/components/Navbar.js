import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { ChevronDownIcon, UserIcon } from "@heroicons/react/24/solid";

const Navbar = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/"); // Go home first
    setTimeout(() => {
      setUser(null); // Then log out
      localStorage.removeItem("token");
    }, 100);
  };
  const handleLogin = () => navigate("/auth/login");

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between shadow-md w-full">
      <div className="text-2xl font-bold tracking-wide">Price Tracker</div>

      <div className="flex items-center gap-4">
        {user ? (
          <Menu as="div" className="relative inline-block text-left">
            <MenuButton className="flex items-center gap-2 px-4 py-2 bg-white text-gray-900 font-semibold rounded-md hover:bg-blue-500 hover:text-white transition">
              <UserIcon className="h-5 w-5" />
              <span>{user.name || "Profile"}</span>
              <ChevronDownIcon className="w-4 h-4" />
            </MenuButton>

            <MenuItems className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md py-1 text-sm text-gray-700 z-50">
              <MenuItem
                as="button"
                onClick={() => navigate("/profile")}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                My Profile
              </MenuItem>
              <MenuItem
                as="button"
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </MenuItem>
            </MenuItems>
          </Menu>
        ) : (
          <button
            onClick={handleLogin}
            className="px-4 py-2 bg-white text-gray-900 font-semibold rounded-md hover:bg-blue-500 hover:text-white transition"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
