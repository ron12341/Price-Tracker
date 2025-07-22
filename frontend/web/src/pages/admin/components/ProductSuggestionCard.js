import React, { useState } from "react";

const ProductSuggestionCard = ({ product, onUpdate, isSelected, onSelect }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`border rounded-lg shadow-sm overflow-hidden ${
        isSelected ? "ring-2 ring-blue-500" : ""
      }`}
    >
      {/* Card Header */}
      <div className="flex items-center p-4 bg-gray-50">
        <input
          id={product._id}
          type="checkbox"
          checked={isSelected}
          onChange={onSelect}
          className="w-5 h-5 mr-3"
        />

        <div className="flex-1 flex justify-between items-center">
          {isExpanded ? (
            <p></p>
          ) : (
            <h3 className="font-medium text-lg text-black">{product.query}</h3>
          )}

          <div className="flex space-x-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 text-gray-500 hover:text-gray-700"
            >
              <svg
                className={`w-5 h-5 transition-transform ${
                  isExpanded ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Card Content */}
      {isExpanded && (
        <div className="transition-all duration-300 max-h-100 bg-white overflow-y-auto">
          <div className="p-4 border-t">
            <div className="space-y-3 text-black">
              <div>
                <p className="text-md text-gray-500">Suggested By</p>
                <p className="font-medium">{product.suggestedBy.email}</p>
              </div>
              <div>
                <p className="text-md text-gray-500">Name</p>
                <p className="font-medium">{product.name}</p>
              </div>
              <div>
                <p className="text-md text-gray-500">Search Query</p>
                <p className="font-medium">{product.query}</p>
              </div>
              <div>
                <p className="text-md text-gray-500">Reason</p>
                <p className="font-medium">{product.reason}</p>
              </div>
              <div>
                <p className="text-md text-gray-500">Stores</p>
                <div className="space-y-2 mt-1">
                  {product.stores?.map((store, index) => (
                    <div
                      key={index}
                      className="flex flex-row justify-between p-2 border rounded"
                    >
                      <p className="font-medium">{store.storeName}</p>{" "}
                      <a
                        href={store.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 text-sm hover:underline"
                      >
                        Visit Store
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-2 mt-4">
              <>
                <button
                  onClick={onUpdate}
                  className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Edit
                </button>
              </>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductSuggestionCard;
