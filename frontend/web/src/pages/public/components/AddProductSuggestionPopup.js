const AddProductSuggestionPopup = ({ onClose, onSubmit }) => {
  return (
    <div className="add-product-suggestion-popup">
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

export default AddProductSuggestionPopup;
