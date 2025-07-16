import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";

const HomeAdmin = () => {
  const navigate = useNavigate();

  const goToProducts = () => {
    navigate("/admin/products");
  };

  const goToProductSuggestions = () => {
    navigate("/admin/product-suggestions");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 font-sans">
      <Navbar />

      <div className="flex flex-col p-5">
        <h1 className="text-4xl font-semibold mb-5">Site Administration</h1>

        <table className="w-3/4 border-collapse mt-5 mb-5 border border-gray-300">
          <thead>
            <tr>
              <th className="text-left text-3xl border border-gray-300 p-4">
                Collections
              </th>
            </tr>
          </thead>

          <tbody>
            <tr
              className="hover:bg-gray-300 cursor-pointer border border-gray-300"
              onClick={goToProducts}
            >
              <td className="text-2xl flex justify-between items-center p-4">
                <p>Products</p>
                <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                  Delete
                </button>
              </td>
            </tr>
            <tr
              className="hover:bg-gray-300 cursor-pointer border border-gray-300"
              onClick={goToProductSuggestions}
            >
              <td className="text-2xl flex justify-between items-center p-4">
                <p>Product Suggestions</p>
                <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                  Delete
                </button>
              </td>
            </tr>
            <tr className="hover:bg-gray-300 cursor-pointer border border-gray-300">
              <td className="text-2xl flex justify-between items-center p-4">
                <p>Users</p>
                <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HomeAdmin;
