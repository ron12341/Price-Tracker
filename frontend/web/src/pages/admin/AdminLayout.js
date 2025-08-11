import { useNavigate } from "react-router-dom";
import { FiPlus, FiTrash2, FiChevronRight } from "react-icons/fi";
import Navbar from "./components/Navbar";

const AdminLayout = ({ children, current, counts = {} }) => {
  const navigate = useNavigate();

  const sidebarItems = [
    { key: "products", label: "Products", count: counts.products },
    { key: "product-suggestions", label: "Product Suggestions", count: counts.productSuggestions },
    { key: "users", label: "Users", count: counts.users },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Breadcrumb */}
      <div className="h-12 flex items-center px-8 bg-white border-b text-gray-600 text-sm">
        <a href="/admin" className="hover:text-blue-600 cursor-pointer">
          Home
        </a>
        <FiChevronRight className="mx-2" />
        <span className="hover:text-blue-600">Collections</span>
        <FiChevronRight className="mx-2" />
        <span className="text-gray-800 font-medium">{current}</span>
      </div>

      <div className="flex flex-row">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r min-h-[calc(100vh-112px)]">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold text-gray-800">Collections</h2>
          </div>
          <div className="divide-y">
            {sidebarItems.map(({ key, label, count }) => (
              <div
                key={key}
                onClick={() => navigate(`/admin/${key}`)}
                className={`flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                  current === label ? "bg-blue-50 border-l-4 border-blue-600" : ""
                }`}
              >
                <span className="text-gray-700">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-6 bg-gray-50">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
