import { useAuth } from "@context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { ChevronDownIcon, UserIcon } from "@heroicons/react/24/solid";
import { LightBulbIcon, ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");

    setTimeout(() => {
      setUser(null);
      localStorage.removeItem("user");
    }, 100);
  };
  const handleLogin = () => navigate("/auth/login");

  return (
    <header className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white shadow-lg w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <a
              href="/"
              className="flex items-center text-2xl font-bold tracking-tight hover:text-blue-200 transition-colors"
            >
              <span className="text-blue-400">Price</span>
              <span className="text-white">Tracker</span>
            </a>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-6">
            {user && (
              <button
                onClick={() => navigate("/suggest-product")}
                className="hidden md:flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md hover:bg-white/10 transition-colors"
              >
                <LightBulbIcon className="h-5 w-5" />
                <span>Suggest Products</span>
              </button>
            )}

            {/* User Dropdown */}
            <div className="relative">
              {user ? (
                <Menu as="div" className="relative">
                  <MenuButton
                    className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-sm font-medium hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 transition-colors"
                    aria-label="User menu"
                  >
                    <UserIcon className="h-5 w-5" />
                    <span className="truncate max-w-[100px]">{user.name || "Account"}</span>
                    <ChevronDownIcon className="h-4 w-4" />
                  </MenuButton>

                  <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-50">
                    <div className="px-1 py-1">
                      <MenuItem>
                        {({ active }) => (
                          <button
                            onClick={() => navigate("/profile")}
                            className={`${
                              active ? "bg-blue-500 text-white" : "text-gray-900"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            My Profile
                          </button>
                        )}
                      </MenuItem>
                      <MenuItem>
                        {({ active }) => (
                          <button
                            onClick={() => navigate("/my-suggestions")}
                            className={`${
                              active ? "bg-blue-500 text-white" : "text-gray-900"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            My Suggestions
                          </button>
                        )}
                      </MenuItem>
                    </div>
                    <div className="px-1 py-1">
                      <MenuItem>
                        {({ active }) => (
                          <button
                            onClick={handleLogout}
                            className={`${
                              active ? "bg-red-500 text-white" : "text-gray-900"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            <ArrowRightEndOnRectangleIcon className="mr-2 h-5 w-5" />
                            Logout
                          </button>
                        )}
                      </MenuItem>
                    </div>
                  </MenuItems>
                </Menu>
              ) : (
                <button
                  onClick={handleLogin}
                  className="flex items-center gap-1 rounded-md bg-white px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-colors"
                >
                  <ArrowRightEndOnRectangleIcon className="h-5 w-5" />
                  <span>Login</span>
                </button>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
