import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";

const ProductsGrid = ({ products, trackedProducts, onTrackingProduct }) => {
  const navigate = useNavigate();

  if (!products || products.length === 0) {
    return (
      <div className="text-center mt-10">
        <p className="text-gray-600 text-lg mb-4">No products found.</p>
        <button
          onClick={() => navigate("/suggest-product")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-md shadow"
        >
          Suggest a Product
        </button>
      </div>
    );
  }

  return (
    <div className="grid gap-5 grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          isTracked={trackedProducts.includes(product._id)}
          onTrackingProduct={onTrackingProduct}
        />
      ))}
    </div>
  );
};

export default ProductsGrid;
