import { useState } from "react";

const ProductSuggestionForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    name: "",
    query: "",
    reason: "",
    stores: [{ storeName: "", url: "" }],
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleStoreChange = (index, field, value) => {
    const updatedStores = [...form.stores];
    updatedStores[index][field] = value;
    setForm({ ...form, stores: updatedStores });
  };

  const addStore = () => {
    setForm({ ...form, stores: [...form.stores, { storeName: "", url: "" }] });
  };

  const removeStore = (index) => {
    const updatedStores = form.stores.filter((_, i) => i !== index);
    setForm({ ...form, stores: updatedStores });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form.name, form.query, form.stores, form.reason);
    console.log("Submitted:", form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block font-medium mb-1">Product Name</label>
        <textarea
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          rows={3}
          className="w-full border border-gray-300 rounded-md px-4 py-2"
          placeholder="e.g., Razer DeathAdder V3 Pro Wireless Gaming Mouse: 63g Lightweight - Focus Pro 30K Optical Sensor - Optical Switches Gen-3 - HyperSpeed Wireless - 5 Programmable Buttons - 90 Hr Battery - Faker Edition"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Query</label>
        <input
          type="text"
          name="query"
          value={form.query}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-4 py-2"
          placeholder="e.g., Razer DeathAdder V3 Pro - Faker Edition"
          required
        />
      </div>

      <div>
        <label className="block font-medium mb-2">
          Where can we find this product?
        </label>
        {form.stores.map((store, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row gap-2 items-start sm:items-center mb-2"
          >
            <input
              type="text"
              className="flex-1 px-4 py-2 rounded-md border border-gray-300"
              placeholder="Store Name"
              value={store.storeName}
              onChange={(e) =>
                handleStoreChange(index, "storeName", e.target.value)
              }
            />
            <input
              type="text"
              className="flex-1 px-4 py-2 rounded-md border border-gray-300"
              placeholder="Store URL"
              value={store.url}
              onChange={(e) => handleStoreChange(index, "url", e.target.value)}
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
          className="text-blue-600 mt-1 hover:underline font-medium"
        >
          + Add another store
        </button>
      </div>

      <div>
        <label className="block font-medium mb-1">
          Why are you suggesting this?
        </label>
        <textarea
          name="reason"
          value={form.reason}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-4 py-2"
          rows={4}
          placeholder="Tell us why this product should be tracked"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
      >
        Submit Suggestion
      </button>
    </form>
  );
};

export default ProductSuggestionForm;
