import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { addProductSuggestion } from "../../services/public/productSuggestionService";
import Navbar from "./components/Navbar";
import ProductSuggestionForm from "./forms/ProductSuggestionForm";

const SuggestProductPage = () => {
  const [submitted, setSubmitted] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth/login?redirect=/suggest-product");
    }
  }, [user, navigate, submitted]);

  const handleSubmit = (productName, productQuery, stores, reason) => {
    addProductSuggestion(productName, productQuery, stores, reason);
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#f2f2f2] font-sans">
      <Navbar />

      <div className="flex-1 p-5 bg-white rounded-md shadow-md overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Suggest a Product
        </h1>

        <div className="max-w-[600px] w-full mx-auto">
          {submitted ? (
            <div className="text-green-600 text-center text-lg font-medium">
              Thank you! Your suggestion has been received.
              <br />
              <br />
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md shadow"
                onClick={() => navigate("/products")}
              >
                View Products
              </button>
            </div>
          ) : (
            <ProductSuggestionForm onSubmit={handleSubmit} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SuggestProductPage;
