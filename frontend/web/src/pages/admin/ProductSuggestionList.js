import { useEffect, useState } from "react";
import {
  fetchProductSuggestions,
  bulkApproveProductSuggestions,
  updateProductSuggestion,
  bulkDeleteProductSuggestions,
} from "@adminServices/productSuggestionService";
import { useAuth } from "@context/AuthContext";
import AdminLayout from "./AdminLayout";
import ProductSuggestionCard from "./components/ProductSuggestionCard";
import UpdateProductSuggestionPopup from "./components/forms/UpdateProductSuggestionPopup";
import ProductSuggestionFilter from "./components/ProductSuggestionFilter";

const ProductSuggestionListPage = () => {
  const { user } = useAuth();

  // State management
  const [productSuggestions, setProductSuggestions] = useState([]);
  const [filteredProductSuggestions, setFilteredProductSuggestions] = useState(
    []
  );
  const [selectedIds, setSelectedIds] = useState([]);
  const [action, setAction] = useState("");
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleFetch = async () => {
    try {
      const res = await fetchProductSuggestions(user.token);
      setProductSuggestions(res);
    } catch (err) {
      console.error("Error fetching product suggestions:", err);
    }
  };

  const handleDelete = async () => {
    if (selectedIds.length === 0) {
      alert("Select items to delete.");
      return;
    }

    try {
      await bulkDeleteProductSuggestions(selectedIds, user.token);
      setProductSuggestions((prev) =>
        prev.filter((item) => !selectedIds.includes(item._id))
      );
      setSelectedIds([]);
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  const handleApprove = async () => {
    if (selectedIds.length === 0) {
      alert("Select items to delete.");
      return;
    }

    try {
      console.log("Approving:", selectedIds);
      const res = await bulkApproveProductSuggestions(selectedIds, user.token);
      handleFetch();
      setSelectedIds([]);
    } catch (err) {
      console.error("Error deleting:", err);
      let errMsg = "";
      err.response.data.details.map(
        (detail) =>
          (errMsg += detail.error.toUpperCase() + ": " + detail.query + "\n\n")
      );
      alert(errMsg);
    }
  };

  const handleUpdate = async (updates) => {
    try {
      const res = await updateProductSuggestion(
        selectedProduct._id,
        updates,
        user.token
      );
      console.log(res);
      setProductSuggestions((prev) =>
        prev.map((item) => (item._id === selectedProduct._id ? res : item))
      );
    } catch (err) {
      console.error("Error updating:", err);
      throw err;
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(productSuggestions.map((p) => p._id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleCheckbox = (e) => {
    const id = e.target.id;
    setSelectedIds((prev) =>
      e.target.checked ? [...prev, id] : prev.filter((x) => x !== id)
    );
  };

  // Fetch suggestions
  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <AdminLayout current="Products Suggestions">
      <div className="flex justify-between items-center mb-6 text-2xl">
        <p>Select collection to change</p>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          onClick={() => setShowAddPopup(true)}
        >
          Add
        </button>
      </div>

      {/* Filter */}
      <ProductSuggestionFilter
        productSuggestions={productSuggestions}
        setProductSuggestions={setFilteredProductSuggestions}
      />

      {/* Action Bar */}
      <div className="flex items-center gap-3 mb-6 text-sm">
        <p>Action:</p>
        <select
          value={action}
          onChange={(e) => setAction(e.target.value)}
          className="bg-transparent text-white border border-gray-500 rounded px-2 py-1"
        >
          <option className="text-black" value="default">
            --------
          </option>
          <option className="text-black" value="delete">
            delete
          </option>
          <option className="text-black" value="approve">
            approve
          </option>
        </select>
        <button
          onClick={() => {
            if (action === "delete") {
              handleDelete();
            } else if (action === "approve") {
              handleApprove();
            }
          }}
          className="border px-3 py-1 rounded border-gray-400 hover:bg-white hover:text-gray-900 transition"
        >
          Apply
        </button>
        <p>
          {selectedIds.length} of {filteredProductSuggestions.length} selected
        </p>
      </div>

      {/* Product Suggestion List */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center bg-cyan-800 px-4 py-2 text-white font-bold rounded">
          <input
            type="checkbox"
            checked={
              filteredProductSuggestions.length > 0 &&
              selectedIds.length === filteredProductSuggestions.length
            }
            onChange={handleSelectAll}
            className="w-5 h-5 mr-3"
          />
          <p>Select All</p>
        </div>

        {filteredProductSuggestions.length === 0 ? (
          <p className="text-center">No product suggestions found.</p>
        ) : (
          <>
            {filteredProductSuggestions.map((product) => (
              <ProductSuggestionCard
                key={product._id}
                product={product}
                onUpdate={() => {
                  setShowUpdatePopup(true);
                  setSelectedProduct(product);
                }}
                onSelect={handleCheckbox}
                isSelected={selectedIds.includes(product._id)}
              />
            ))}
          </>
        )}
      </div>
      <div className="mt-6 border-t border-gray-600 pt-3">
        <p className="text-sm">
          {filteredProductSuggestions.length} product suggestions total
        </p>
      </div>

      {showAddPopup && <div></div>}

      {showUpdatePopup && selectedProduct && (
        <UpdateProductSuggestionPopup
          productToUpdate={selectedProduct}
          onClose={() => {
            setShowUpdatePopup(false);
            setSelectedProduct(null);
          }}
          onSubmit={handleUpdate}
        />
      )}
    </AdminLayout>
  );
};

export default ProductSuggestionListPage;
