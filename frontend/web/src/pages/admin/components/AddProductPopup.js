import { useState } from "react";
import axios from "axios";

import "./AddProductPopup.css";

const AddProductPopup = ({ onClose }) => {
  const [productName, setProductName] = useState("");
  const [productQuery, setProductQuery] = useState("");
  const [stores, setStores] = useState([{ storeName: "", url: "" }]);

  const handleStoreChange = (index, field, value) => {
    const newStores = [...stores];
    newStores[index][field] = value;
    setStores(newStores);
  };

  const addStore = () => {
    setStores([...stores, { storeName: "", url: "" }]);
  };

  const removeStore = (index) => {
    const newStores = [...stores];
    newStores.splice(index, 1);
    setStores(newStores);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    while (true) {
      if (productName === "" || productQuery === "" || stores.length === 0) {
        alert("Please fill in all fields.");
        return;
      }
      break;
    }

    while (true) {
      for (let i = 0; i < stores.length; i++) {
        if (stores[i].storeName === "" || stores[i].url === "") {
          alert("Please fill in all fields for all stores.");
          return;
        }
      }
      break;
    }

    try {
      const response = await axios.post("http://localhost:5000/products", {
        name: productName,
        query: productQuery,
        stores: stores,
      });

      console.log(response.data);
      onClose();
      alert("Product added successfully!");
    } catch (err) {
      alert(err.response.data.error);
      console.error(err.response.data.error);
    }
  };

  return (
    <div className="add-product-popup">
      <form onSubmit={handleSubmit}>
        <h2>Add Product</h2>
        <label>
          Product Name*:
          <input
            type="text"
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </label>

        <label>
          Query*:
          <input
            type="text"
            placeholder="Query"
            value={productQuery}
            onChange={(e) => setProductQuery(e.target.value)}
            required
          />
        </label>

        <h3>Stores*:</h3>
        <div className="store-list-container">
          {stores.map((store, index) => (
            <div key={index} className="store-input-group">
              <label>
                Store Name:
                <input
                  type="text"
                  placeholder="Store Name"
                  value={store.storeName}
                  onChange={(e) =>
                    handleStoreChange(index, "storeName", e.target.value)
                  }
                />
              </label>

              <label>
                URL:
                <input
                  type="text"
                  placeholder="URL"
                  value={store.url}
                  onChange={(e) =>
                    handleStoreChange(index, "url", e.target.value)
                  }
                />
              </label>

              <button
                type="button"
                className="remove-store-button"
                onClick={() => removeStore(index)}
              >
                Remove Store
              </button>
            </div>
          ))}
        </div>
        <button type="button" onClick={addStore} className="add-store-button">
          Add Store
        </button>
        <button type="submit" onClick={handleSubmit}>
          Add Product
        </button>
        <button type="button" className="close-button" onClick={onClose}>
          x
        </button>
      </form>
    </div>
  );
};

export default AddProductPopup;
