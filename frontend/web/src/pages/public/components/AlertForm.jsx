import { useEffect, useState } from "react";
import AlertToggle from "./AlertToggle";
import { CheckIcon, BellIcon } from "@heroicons/react/24/outline";
import { FaSpinner as Spinner } from "react-icons/fa";

const AlertForm = ({ currentAlert, onSetAlert, isLoading }) => {
  const [state, setState] = useState(currentAlert || { targetPrice: "", isActive: false });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);

  const handleSetAlert = async (targetPrice, isActive) => {
    try {
      await onSetAlert(targetPrice, isActive);
      setIsEditing(false);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    setState(currentAlert || { targetPrice: "", isActive: false });
  }, [currentAlert]);

  return (
    <div className="space-y-3">
      {currentAlert ? (
        // Edit mode
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-lg flex items-center gap-2">Price Alert</h3>
            {state.isActive && (
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
            )}
            {!state.isActive && (
              <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">Inactive</span>
            )}
          </div>

          {isEditing ? (
            <div className="flex items-center gap-2">
              <input
                type="number"
                step="0.01"
                min="0"
                value={state.targetPrice}
                onChange={(e) => setState((prev) => ({ ...prev, targetPrice: e.target.value }))}
                className="px-2 py-1 border border-gray-300 rounded-md"
              />
              <button
                onClick={() => {
                  handleSetAlert(state.targetPrice, state.isActive);
                  setIsEditing(false);
                }}
                className="text-sm px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors "
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="text-sm px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <CheckIcon className="h-5 w-5 text-green-500" />
              <p className="text-gray-700">
                Alert set for <span className="font-semibold">${state.targetPrice}</span>
              </p>
            </div>
          )}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex gap-3 pt-2">
            <AlertToggle
              isActive={state.isActive}
              loading={isLoading}
              onChange={() => {
                handleSetAlert(state.targetPrice, !state.isActive);
              }}
            />
            <button
              disabled={isLoading || isEditing}
              onClick={() => setIsEditing(true)}
              className="text-sm px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors disabled:opacity-50"
            >
              Edit Price
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-2 max-w-sm">
            <input
              type="number"
              step="0.01"
              min="0"
              value={state.targetPrice}
              onChange={(e) => setState((prev) => ({ ...prev, targetPrice: e.target.value }))}
              className="flex-1 border border-gray-300 p-2 rounded w-32 focus:ring-2 focus:ring-[#8675b3] focus:border-[#8675b3] outline-none transition-all"
              placeholder="Enter target price"
              disabled={isLoading}
            />
            <button
              onClick={() => {
                handleSetAlert(state.targetPrice, state.isActive);
              }}
              disabled={!state.targetPrice || isLoading}
              className={`px-4 py-2 rounded-md flex items-center gap-1 transition-all ${
                state.targetPrice && !isLoading
                  ? "bg-[#8675b3] text-white hover:bg-[#7564a2] shadow-md"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              {isLoading ? <Spinner className="h-5 w-5" /> : <BellIcon className="h-5 w-5" />}
              Set Alert
            </button>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <p className="text-xs text-gray-500">We'll notify you when the price drops to your target</p>
        </>
      )}
    </div>
  );
};

export default AlertForm;
