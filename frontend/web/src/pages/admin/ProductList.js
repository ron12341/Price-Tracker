import "./ProductList.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import AddProductPopup from "./components/AddProductPopup";
import { deleteProducts } from "../../services/admin/productService";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [action, setAction] = useState("");

  const [showAddProductPopup, setShowAddProductPopup] = useState(false);

  const refreshPage = () => {
    window.location.reload(false);
  };

  const handleFetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleDeleteSelectedProducts = async () => {
    try {
      if (selectedProductIds.length === 0) {
        alert("Please select at least one product to delete.");
        return;
      }

      await deleteProducts(selectedProductIds);
      refreshPage();
    } catch (error) {
      console.error("Error deleting products:", error);
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedProductIds(products.map((product) => product._id));
    } else {
      setSelectedProductIds([]);
    }
  };

  const handleCheckbox = (e) => {
    const productId = e.target.id;

    if (e.target.checked) {
      setSelectedProductIds([...selectedProductIds, productId]);
    } else {
      setSelectedProductIds(
        selectedProductIds.filter((id) => id !== productId)
      );
    }
  };

  useEffect(() => {
    handleFetchProducts();
  }, []);

  return (
    <div className="listpage-container">
      <Navbar />

      <div className="breadcrumb-container">
        <p>Home / Collections / Products</p>
      </div>

      <div className="content">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Collections</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>
                  <p>Products</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="list-container">
          <div className="header-container">
            <p>Select collection to change</p>
            <button onClick={() => setShowAddProductPopup(true)}>
              Add Product
            </button>
          </div>

          <div className="action-container">
            <p>Action:</p>
            <select
              name="action"
              id="action"
              onChange={(e) => setAction(e.target.value)}
            >
              <option value="default">--------</option>
              <option value="delete">Delete</option>
            </select>
            <button
              onClick={() => {
                if (action === "delete") {
                  handleDeleteSelectedProducts();
                }
              }}
            >
              Apply
            </button>
            <p>
              {selectedProductIds.length} of {products.length} selected
            </p>
          </div>

          <div className="list">
            <div className="list-item-container title">
              <input
                type="checkbox"
                id="checkbox-title"
                checked={
                  selectedProductIds.length === products.length &&
                  products.length > 0
                }
                onChange={handleSelectAll}
              />
              <p id="title">Select All</p>
            </div>
            {products.map((product) => (
              <div className="list-item-container item" key={product._id}>
                <input
                  type="checkbox"
                  id={product._id}
                  checked={selectedProductIds.includes(product._id)}
                  onChange={handleCheckbox}
                />
                <p>{product.query}</p>
              </div>
            ))}
          </div>

          <div className="counter-container">
            <p>{products.length} products</p>
          </div>
        </div>
      </div>

      {showAddProductPopup && (
        <AddProductPopup
          onClose={() => {
            setShowAddProductPopup(false);
          }}
          onSubmit={() => {
            setShowAddProductPopup(false);
            refreshPage();
          }}
        />
      )}
    </div>
  );
}

export default ProductList;
