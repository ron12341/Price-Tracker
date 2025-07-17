import { useState } from "react";

const AddProductPopup = ({ onClose, onSubmit }) => {
  const [productName, setProductName] = useState("");
  const [productQuery, setProductQuery] = useState("");
  const [imageUrl, setImageUrl] = useState("");
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
      if (
        productName === "" ||
        productQuery === "" ||
        stores.length === 0 ||
        imageUrl === ""
      ) {
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

    await onSubmit(productName, productQuery, imageUrl, stores);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-[999]">
      <form
        onSubmit={handleSubmit}
        className="text-gray-800 bg-white p-6 md:px-10 rounded-xl shadow-[0_8px_20px_rgba(0,0,0,0.2)] w-full max-w-[600px] max-h-[80vh] relative flex flex-col gap-4"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-4 text-2xl font-bold text-gray-500 hover:text-red-500"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-center">Add Product</h2>

        <div className="flex flex-col gap-4">
          {/* Product Name */}
          <div>
            <label className="block font-semibold mb-1">
              Product Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </div>

          {/* Product Query */}
          <div>
            <label className="block font-semibold mb-1">
              Query<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Search Query"
              value={productQuery}
              onChange={(e) => setProductQuery(e.target.value)}
              required
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block font-semibold mb-1">
              Image URL<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />
          </div>

          {/* Stores Section */}
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Stores<span className="text-red-500">*</span>
            </h3>
            {stores.map((store, index) => (
              <div key={index} className="flex gap-2 items-center mb-2">
                <input
                  type="text"
                  className="flex-1 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400"
                  placeholder="Store Name"
                  value={store.storeName}
                  onChange={(e) =>
                    handleStoreChange(index, "storeName", e.target.value)
                  }
                />
                <input
                  type="text"
                  className="flex-1 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400"
                  placeholder="Store URL"
                  value={store.url}
                  onChange={(e) =>
                    handleStoreChange(index, "url", e.target.value)
                  }
                />
                <button
                  type="button"
                  onClick={() => removeStore(index)}
                  className="text-red-500 font-bold text-xl hover:text-red-700 px-2"
                >
                  &times;
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addStore}
              className="mt-2 bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded hover:bg-blue-200"
            >
              + Add Store
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="bg-green-600 text-white font-semibold px-5 py-2 rounded-md hover:bg-green-700 transition"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductPopup;
