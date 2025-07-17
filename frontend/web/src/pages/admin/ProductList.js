import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import AddProductPopup from "./components/AddProductPopup";
import {
  deleteProducts,
  addProduct,
} from "../../services/admin/productService";
import { fetchProducts } from "../../services/public/productService";

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [action, setAction] = useState("");
  const [showAddPopup, setShowAddPopup] = useState(false);

  const handleFetchProducts = async () => {
    try {
      const res = await fetchProducts();
      setProducts(res);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const handleAddProduct = async (name, query, imageUrl, stores) => {
    try {
      console.log(name, query, imageUrl, stores);
      await addProduct(name, query, imageUrl, stores);
      setShowAddPopup(false);
    } catch (err) {
      alert(err.response.data.error);
      console.error("Error adding product:", err);
    }
  };

  const handleDelete = async () => {
    if (selectedIds.length === 0) {
      alert("Select items to delete.");
      return;
    }

    try {
      await deleteProducts(selectedIds);
      setProducts((prev) =>
        prev.filter((item) => !selectedIds.includes(item._id))
      );
      setSelectedIds([]);
    } catch (err) {
      alert(err.response.data.error);
      console.error("Error deleting:", err);
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(products.map((p) => p._id));
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
    handleFetchProducts();
  }, []);

  return (
    <AdminLayout current="Products">
      <div className="flex justify-between items-center mb-6 text-2xl">
        <p>Select collection to change</p>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          onClick={() => setShowAddPopup(true)}
        >
          Add Product
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
          {selectedIds.length} of {products.length} selected
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center bg-cyan-800 px-4 py-2 text-white font-bold rounded">
          <input
            type="checkbox"
            checked={
              products.length > 0 && selectedIds.length === products.length
            }
            onChange={handleSelectAll}
            className="w-5 h-5 mr-3"
          />
          <p>Select All</p>
        </div>

        {products.map((product) => (
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
        <p className="text-sm">{products.length} products total</p>
      </div>

      {showAddPopup && (
        <AddProductPopup
          onClose={() => setShowAddPopup(false)}
          onSubmit={handleAddProduct}
        />
      )}
    </AdminLayout>
  );
};

export default ProductListPage;
