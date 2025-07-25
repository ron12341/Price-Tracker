import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";

const AdminLayout = ({ children, current }) => {
  const navigate = useNavigate();

  const sidebarItems = [
    { key: "products", label: "Products" },
    { key: "product-suggestions", label: "Product Suggestions" },
    { key: "users", label: "Users" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Navbar />

      <div className="h-12 flex items-center px-8 bg-gray-100 font-bold text-gray-800 text-lg">
        Home / Collections / {current}
      </div>

      <div className="flex flex-row bg-gray-700 flex-1">
        {/* Sidebar */}
        <div className="w-1/4 bg-white border-r">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-2xl text-left p-4 border border-gray-300">
                  Collections
                </th>
              </tr>
            </thead>
            <tbody>
              {sidebarItems.map(({ key, label }) => (
                <tr
                  key={key}
                  onClick={() => navigate(`/admin/${key}`)}
                  className={`hover:bg-gray-200 cursor-pointer ${
                    current === label ? "bg-gray-100" : ""
                  }`}
                >
                  <td className="p-4 text-lg border border-gray-300 flex justify-between items-center">
                    <p>{label}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Main content */}
        <div className="flex-1 bg-gray-800 text-white p-6">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
