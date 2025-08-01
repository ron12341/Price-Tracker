import { useEffect, useState } from "react";
import { deleteProducts, addProduct, updateProduct } from "@adminServices/productService";
import { fetchProducts } from "@publicServices/productService";
import { useLoading } from "@context/LoadingContext";
import AdminLayout from "./AdminLayout";
import ProductCard from "./components/ProductCard";
import AddProductPopup from "./components/forms/AddProductPopup";
import UpdateProductPopup from "./components/forms/UpdateProductPopup";

const ProductListPage = () => {
  const { isLoading, showLoading, hideLoading } = useLoading();

  const [products, setProducts] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [action, setAction] = useState("");
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleFetchProducts = async () => {
    try {
      showLoading("Fetching products...");
      const res = await fetchProducts();
      setProducts(res);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      hideLoading();
    }
  };

  const handleAddProduct = async (name, query, imageUrl, stores) => {
    try {
      showLoading("Adding product...");
      console.log(name, query, imageUrl, stores);
      const res = await addProduct(name, query, imageUrl, stores);
      setProducts((prev) => [...prev, res]);
      setShowAddPopup(false);
    } catch (err) {
      alert(err.response.data.error);
      console.error("Error adding product:", err);
    } finally {
      hideLoading();
    }
  };

  const handleSingleDelete = async (id) => {
    try {
      showLoading("Deleting...");
      await deleteProducts([id]);
      setProducts((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      alert(err.response.data.error);
      console.error("Error deleting:", err);
    } finally {
      hideLoading();
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) {
      alert("Select items to delete.");
      return;
    }

    try {
      showLoading("Deleting...");
      await deleteProducts(selectedIds);
      setProducts((prev) => prev.filter((item) => !selectedIds.includes(item._id)));
      setSelectedIds([]);
    } catch (err) {
      alert(err.response.data.error);
      console.error("Error deleting:", err);
    } finally {
      hideLoading();
    }
  };

  const handleUpdateProduct = async (id, name, query, imageUrl, stores) => {
    try {
      showLoading("Updating...");
      const res = await updateProduct(id, name, query, imageUrl, stores);
      setProducts((prev) => prev.map((item) => (item._id === res._id ? res : item)));
      setShowUpdatePopup(false);
    } catch (err) {
      alert(err.response.data.error);
      console.error("Error updating:", err);
    } finally {
      hideLoading();
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
    setSelectedIds((prev) => (e.target.checked ? [...prev, id] : prev.filter((x) => x !== id)));
  };

  useEffect(() => {
    handleFetchProducts();
  }, []);

  if (isLoading) return null;

  return (
    <AdminLayout current="Products">
      <div className="flex justify-between items-center mb-6 text-2xl">
        <p>Select collection to change</p>
        <button
          className="border px-3 py-1 rounded border-gray-400 hover:bg-white hover:text-gray-900 transition"
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
          className="bg-transparent text-black border border-gray-500 rounded px-2 py-1"
        >
          <option className="text-black" value="default">
            --------
          </option>
          <option className="text-black" value="delete">
            Delete
          </option>
        </select>
        <button
          onClick={() => action === "delete" && handleBulkDelete()}
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
            checked={products.length > 0 && selectedIds.length === products.length}
            onChange={handleSelectAll}
            className="w-5 h-5 mr-3"
          />
          <p>Select All</p>
        </div>

        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onSelect={handleCheckbox}
            isSelected={selectedIds.includes(product._id)}
            onUpdate={() => {
              setShowUpdatePopup(true);
              setSelectedProduct(product);
            }}
            onDelete={handleSingleDelete}
          />
        ))}
      </div>

      <div className="mt-6 border-t border-gray-600 pt-3">
        <p className="text-sm">{products.length} products total</p>
      </div>

      {showAddPopup && <AddProductPopup onClose={() => setShowAddPopup(false)} onSubmit={handleAddProduct} />}

      {showUpdatePopup && selectedProduct && (
        <UpdateProductPopup
          productToUpdate={selectedProduct}
          onClose={() => setShowUpdatePopup(false)}
          onSubmit={handleUpdateProduct}
        />
      )}
    </AdminLayout>
  );
};

export default ProductListPage;
