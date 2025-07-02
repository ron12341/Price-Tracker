import { useState, useEffect } from "react";
import axios from "axios";

import "./ProductList.css";
import Navbar from "./components/Navbar";
import AddProductPopup from "./components/AddProductPopup";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [checkedBoxes, setCheckBoxes] = useState(0);
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

  const handleSelectAll = () => {
    var checkboxTitle = document.querySelector("#checkbox-title");
    var checkboxes = document.querySelectorAll("#checkbox");

    checkboxes.forEach((checkbox) => {
      checkbox.checked = checkboxTitle.checked;
    });

    setCheckBoxes(checkboxTitle.checked ? checkboxes.length : 0);
  };

  const handleCheckbox = () => {
    var checkboxTitle = document.querySelector("#checkbox-title");
    var checkboxes = document.querySelectorAll("#checkbox");

    var checked = 0;
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        checked++;
      }
    });

    setCheckBoxes(checked);
    checkboxTitle.checked = checked === checkboxes.length;
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
            <button>Apply</button>
            <p>
              {checkedBoxes} of {products.length} selected
            </p>
          </div>

          <div className="list">
            <div className="list-item-container title">
              <input
                type="checkbox"
                id="checkbox-title"
                onClick={handleSelectAll}
              />
              <p id="title">Select All</p>
            </div>
            {products.map((product, index) => (
              <div className="list-item-container item">
                <input type="checkbox" id="checkbox" onClick={handleCheckbox} />
                <p>{product.name}</p>
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
            refreshPage();
          }}
        />
      )}
    </div>
  );
}

export default ProductList;
