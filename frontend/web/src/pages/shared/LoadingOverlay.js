import React from "react";

const LoadingOverlay = ({ message, spinnerColor = "white" }) => {
  return (
    <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-black bg-opacity-50">
      <div
        className="w-12 h-12 border-4 rounded-full animate-spin"
        style={{
          borderColor: spinnerColor,
          borderTopColor: "transparent",
        }}
      ></div>
      <p className="mt-4 text-white text-lg">{message}</p>
    </div>
  );
};

export default LoadingOverlay;
