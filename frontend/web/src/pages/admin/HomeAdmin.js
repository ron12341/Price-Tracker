import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { FiBox, FiUsers, FiArchive, FiTrash2, FiChevronRight } from "react-icons/fi";
import { getCounts } from "@adminServices/statsService";
import { useAuth } from "@context/AuthContext";

const HomeAdmin = () => {
  const { user, isAuthLoading } = useAuth();
  const navigate = useNavigate();

  const [counts, setCounts] = useState([]);
  const [adminSections, setAdminSections] = useState([
    {
      name: "Products",
      icon: <FiBox className="text-blue-500" size={24} />,
      path: "/admin/products",
      count: 0,
      color: "blue",
    },
    {
      name: "Product Suggestions",
      icon: <FiArchive className="text-amber-500" size={24} />,
      path: "/admin/product-suggestions",
      count: 0,
      color: "amber",
    },
    {
      name: "Users",
      icon: <FiUsers className="text-green-500" size={24} />,
      path: "/admin/users",
      count: 0,
      color: "green",
    },
  ]);

  const handleFetchCounts = async () => {
    try {
      const counts = await getCounts(user.token);

      setAdminSections((prev) =>
        prev.map((section) => {
          if (section.name === "Products") {
            section.count = counts[0].value;
          } else if (section.name === "Product Suggestions") {
            section.count = counts[1].value;
          } else if (section.name === "Users") {
            section.count = counts[2].value;
          }
          return section;
        })
      );
      return counts;
    } catch (error) {
      console.error("Error fetching counts:", error);
    }
  };

  useEffect(() => {
    if (user && !isAuthLoading) {
      handleFetchCounts();
    }
  }, [user, isAuthLoading]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">Manage your site content and users</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {adminSections.map((section) => (
            <div
              key={section.name}
              className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate(section.path)}
            >
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-full bg-${section.color}-50`}>{section.icon}</div>
                <FiChevronRight className="text-gray-400" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">{section.name}</h3>
              <p className="mt-2 text-2xl font-semibold text-gray-900">{section.count}</p>
              <p className="mt-1 text-sm text-gray-500">Total entries</p>
            </div>
          ))}
        </div>

        {/* Management Sections */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Management Sections
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {adminSections.map((section) => (
                <tr
                  key={section.name}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => navigate(section.path)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div
                        className={`flex-shrink-0 h-10 w-10 rounded-full bg-${section.color}-100 flex items-center justify-center`}
                      >
                        {section.icon}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{section.name}</div>
                        <div className="text-sm text-gray-500">{section.count} items</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log(`Delete ${section.name}`);
                      }}
                      className="text-red-600 hover:text-red-900 flex items-center justify-end w-full"
                    >
                      <FiTrash2 className="mr-1" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HomeAdmin;
