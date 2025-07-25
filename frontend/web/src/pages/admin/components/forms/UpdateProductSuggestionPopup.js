import { useState } from "react";
import ErrorMessage from "../ErrorMessage";
import SuccessMessage from "../SuccessMessage";

const UpdateProductSuggestionPopup = ({
  onClose,
  onSubmit,
  productToUpdate,
}) => {
  const [productName, setProductName] = useState(productToUpdate.name);
  const [productQuery, setProductQuery] = useState(productToUpdate.query);
  const [stores, setStores] = useState(productToUpdate.stores);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

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
      await onSubmit({ name: productName, query: productQuery, stores });
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setSubmitted(true);
    }
  };

  // if (submitted) {
  //   return (
  //     <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-[999]">
  //       {error ? (
  //         <ErrorMessage
  //           message={error}
  //           onClose={() => {
  //             setError(null);
  //             setSubmitted(false);
  //             onClose();
  //           }}
  //         />
  //       ) : (
  //         <SuccessMessage
  //           message="Product suggestion updated successfully"
  //           onClose={() => {
  //             setSubmitted(false);
  //             onClose();
  //           }}
  //         />
  //       )}
  //     </div>
  //   );
  // }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-[999]">
      {submitted ? (
        <>
          {error ? (
            <ErrorMessage
              message={error}
              onClose={() => {
                setError(null);
                setSubmitted(false);
                onClose();
              }}
            />
          ) : (
            <SuccessMessage
              message="Product suggestion updated successfully"
              onClose={() => {
                setSubmitted(false);
                onClose();
              }}
            />
          )}
        </>
      ) : (
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

          <h2 className="text-2xl font-bold text-center">Update Product</h2>

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
                    required
                  />
                  <input
                    type="url"
                    className="flex-1 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400"
                    placeholder="Store URL"
                    value={store.url}
                    onChange={(e) =>
                      handleStoreChange(index, "url", e.target.value)
                    }
                    required
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
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UpdateProductSuggestionPopup;
