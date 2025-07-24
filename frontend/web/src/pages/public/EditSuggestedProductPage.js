import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@context/AuthContext";
import { getEditableProductSuggestion, updateProductSuggestion } from "../../services/public/productSuggestionService";
import Navbar from "./components/Navbar";
import ProductSuggestionForm from "./forms/ProductSuggestionForm";

const UpdateSuggestedProductPage = () => {
  const { id } = useParams();
  const { user, isAuthLoading } = useAuth();
  const navigate = useNavigate();
  const [suggestion, setSuggestion] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (productName, productQuery, stores, reason) => {
    try {
      console.log(productName, productQuery, stores, reason);
      await updateProductSuggestion(
        {
          name: productName,
          query: productQuery,
          stores,
          reason,
        },
        id,
        user.token
      );
      setSubmitted(true);
    } catch (error) {
      console.error("Error adding product suggestion:", error);
      alert(error.response.data.error);
    }
  };

  const handleFetch = async () => {
    try {
      const res = await getEditableProductSuggestion(id, user.token);
      setSuggestion(res);
      console.log(res);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  // Redirect to login page if user is not authenticated
  useEffect(() => {
    if (!isAuthLoading && !user) {
      navigate(`/auth/login?redirect=/my-suggestions/${id}/edit`, { replace: true });
    }
  }, [user, navigate, submitted]);

  // Fetch the product when the component mounts
  useEffect(() => {
    if (user && !isAuthLoading) {
      handleFetch();
    }
  }, [user]);

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#f2f2f2] font-sans">
      <Navbar />

      <div className="flex-1 p-5 bg-white rounded-md shadow-md overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">Edit Suggested Product</h1>

        <div className="max-w-[600px] w-full mx-auto">
          {submitted ? (
            <div className="text-green-600 text-center text-lg font-medium">
              Product suggestion updated successfully!
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
            suggestion && <ProductSuggestionForm onSubmit={handleSubmit} suggestion={suggestion} />
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateSuggestedProductPage;
