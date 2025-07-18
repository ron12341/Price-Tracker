import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Navbar from "./components/Navbar";
import ProductsGrid from "./components/ProductsGrid";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#f2f2f2] font-sans">
      <Navbar />

      <div className="flex-1 p-5 bg-white rounded-md shadow-md overflow-y-auto">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-3xl font-semibold mb-5">Products</h2>
          <button
            onClick={() => navigate("/suggest-product")}
            className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-md shadow mb-4"
          >
            + Suggest a Product
          </button>
        </div>

        <div className="flex items-center mb-5 text-lg">
          <label htmlFor="search" className="mr-2">
            Search:
          </label>
          <input
            name="search"
            type="text"
            placeholder="Search products..."
            className="px-4 py-2 border border-gray-500 rounded-md w-full max-w-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <ProductsGrid products={filteredProducts} />
      </div>
    </div>
  );
};

export default ProductsPage;
