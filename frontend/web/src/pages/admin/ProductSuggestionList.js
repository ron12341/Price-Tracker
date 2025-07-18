import { useEffect, useState } from "react";
import { fetchProductSuggestions } from "../../services/admin/productSuggestionService";
import { useLoading } from "../../context/LoadingContext";
import AdminLayout from "./AdminLayout";
import { useAuth } from "../../context/AuthContext";

const ProductSuggestionListPage = () => {
  const [productSuggestions, setProductSuggestions] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [action, setAction] = useState("");
  const [showAddPopup, setShowAddPopup] = useState(false);

  const { setIsLoading } = useLoading();
  const { user } = useAuth();

  const handleFetch = async () => {
    // setIsLoading(true);
    try {
      const res = await fetchProductSuggestions(user.token);
      setProductSuggestions(res);
    } catch (err) {
      console.error("Error fetching product suggestions:", err);
    } finally {
      // setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (selectedIds.length === 0) {
      alert("Select items to delete.");
      return;
    }

    // try {
    //   await deleteProducts(selectedIds);
    //   setProducts((prev) =>
    //     prev.filter((item) => !selectedIds.includes(item._id))
    //   );
    //   setSelectedIds([]);
    // } catch (err) {
    //   console.error("Error deleting:", err);
    // }
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
            Delete
          </option>
        </select>
        <button
          onClick={() => action === "delete" && handleDelete()}
          className="border px-3 py-1 rounded border-gray-400 hover:bg-white hover:text-gray-900 transition"
        >
          Apply
        </button>
        <p>
          {selectedIds.length} of {productSuggestions.length} selected
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center bg-cyan-800 px-4 py-2 text-white font-bold rounded">
          <input
            type="checkbox"
            checked={
              productSuggestions.length > 0 &&
              selectedIds.length === productSuggestions.length
            }
            onChange={handleSelectAll}
            className="w-5 h-5 mr-3"
          />
          <p>Select All</p>
        </div>

        {productSuggestions.map((product) => (
          <div
            key={product._id}
            className="flex items-center px-4 py-3 bg-gray-300 text-black rounded hover:bg-gray-200"
          >
            <input
              type="checkbox"
              id={product._id}
              checked={selectedIds.includes(product._id)}
              onChange={handleCheckbox}
              className="w-5 h-5 mr-3"
            />
            <p>{product.query}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t border-gray-600 pt-3">
        <p className="text-sm">
          {productSuggestions.length} product suggestions total
        </p>
      </div>

      {showAddPopup && <div></div>}
    </AdminLayout>
  );
};

export default ProductSuggestionListPage;
