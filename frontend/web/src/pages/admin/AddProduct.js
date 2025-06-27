import { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [stores, setStores] = useState([
    { storeName: "", url: "", price: "N/A" },
  ]);

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
    try {
      const response = await axios.post("http://localhost:5000/products", {
        name: productName,
        query: productName,
        stores: stores,
      });

      console.log(response.data);

      alert("Product added successfully!");
      //   setProductName("");
      //   setStores([{ storeName: "", url: "" }]);
    } catch (err) {
      alert(err.response.data.error);
      console.error(err.response.data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Product</h2>
      <input
        type="text"
        placeholder="Product Name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />

      <h3>stores</h3>
      {stores.map((store, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Store Name"
            value={store.storeName}
            onChange={(e) =>
              handleStoreChange(index, "storeName", e.target.value)
            }
          />
          <input
            type="text"
            placeholder="URL"
            value={store.url}
            onChange={(e) => handleStoreChange(index, "url", e.target.value)}
          />
          <button type="button" onClick={() => removeStore(index)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={addStore}>
        Add Store
      </button>
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProduct;
