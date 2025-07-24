import { useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import StatusDisplay from "./StatusDisplay";

const ProductSuggestionCard = ({ suggestion }) => {
  const navigate = useNavigate();

  if (!suggestion) return null;
  return (
    <div className="border rounded-lg p-4 mb-4 hover:shadow-md transition-shadow border-gray-500">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-lg">{suggestion.name}</h3>
          <p className="text-gray-600 text-sm">Suggested on: {new Date(suggestion.createdAt).toLocaleDateString()}</p>
        </div>
        <div className="flex items-center ">
          <StatusDisplay status={suggestion.status} />

          {/* Dropdown menu */}
          {suggestion.status !== "approved" && (
            <Menu as="div" className="relative inline-block text-left ml-2">
              <MenuButton>
                <EllipsisVerticalIcon className="w-7 h-7" />
              </MenuButton>

              <MenuItems className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md py-1 text-sm text-gray-700 z-50">
                <MenuItem
                  as="button"
                  onClick={() => navigate(`/my-suggestions/${suggestion._id}/edit`)}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Edit
                </MenuItem>
                <MenuItem
                  as="button"
                  onClick={() => console.log("Delete suggestion")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Delete
                </MenuItem>
              </MenuItems>
            </Menu>
          )}
        </div>
      </div>

      <div className="mt-3">
        <p className="text-gray-700">
          <span className="font-medium">Query:</span> {suggestion.query}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Stores: </span>
          {suggestion.stores.map((store, index) => {
            return (
              <a
                key={index}
                href={store.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {index === suggestion.stores.length - 1 ? store.storeName : `${store.storeName}, `}
              </a>
            );
          })}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Reason:</span> {suggestion.reason}
        </p>
      </div>
      {suggestion.rejectionReason && (
        <p className="text-red-600 text-sm mt-1">
          <span className="font-medium">Reason:</span> Will add this attribute later
        </p>
      )}
      {suggestion.status === "approved" && (
        <a
          // href={`/products/${suggestion.approvedProductId}`}
          className="inline-block mt-3 text-blue-600 hover:underline text-sm"
        >
          View approved product →
        </a>
      )}
    </div>
  );
};

export default ProductSuggestionCard;
