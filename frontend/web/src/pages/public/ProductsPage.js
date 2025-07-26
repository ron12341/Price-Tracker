import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLoading } from "@context/LoadingContext";
import { useAuth } from "@context/AuthContext";

import { handleTrackProduct } from "@publicServices/userService";

import Navbar from "./components/Navbar";
import ProductsGrid from "./components/ProductsGrid";

const ProductsPage = () => {
  const { user, isAuthLoading, setUserTrackedProducts } = useAuth();
  const { isLoading, showLoading, hideLoading } = useLoading();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [trackedProducts, setTrackedProducts] = useState([]);

  const fetchProducts = async () => {
    showLoading("Fetching products...");
    try {
      const response = await axios.get("http://localhost:5000/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      hideLoading();
    }
  };

  const handleTrackingProducts = async (productId) => {
    if (!user && !isAuthLoading) {
      navigate("/auth/login", { replace: true });
      return;
    }

    try {
      const response = await handleTrackProduct(productId, user.token);

      setTrackedProducts(response.trackedProducts);
      setUserTrackedProducts(response.trackedProducts);

      return response;
    } catch (error) {
      console.error("Error saving product:", error);
      throw error;
    }
  };

  const handleFiltering = () => {
    setFilteredProducts(products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase())));
  };

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (user?.trackedProducts) {
      setTrackedProducts(user.trackedProducts);
    }
  }, [user]);

  // Update filtered products when searchTerm or products change
  useEffect(() => {
    handleFiltering();
  }, [searchTerm, products]);

  // If loading, return null
  if (isLoading) return null;

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

        {/* Tracked Products Section - Only shows if user is logged in */}
        {user && trackedProducts.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-medium mb-3">Your Saved Products</h3>
            <ProductsGrid
              products={products.filter((p) => trackedProducts.includes(p._id))}
              trackedProducts={trackedProducts}
              onTrackingProduct={handleTrackingProducts}
            />
          </div>
        )}

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

        <ProductsGrid
          products={filteredProducts}
          trackedProducts={trackedProducts}
          onTrackingProduct={handleTrackingProducts}
        />
      </div>
    </div>
  );
};

export default ProductsPage;
