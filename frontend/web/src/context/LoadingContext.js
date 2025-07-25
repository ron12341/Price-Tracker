import React, { createContext, useContext, useState } from "react";
import LoadingOverlay from "../pages/shared/LoadingOverlay";

const LoadingContext = createContext({
  isLoading: false,
  showLoading: () => {},
  hideLoading: () => {},
});

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Loading...");

  const showLoading = (message) => {
    setLoadingMessage(message || "Loading...");
    setIsLoading(true);
  };

  const hideLoading = () => setIsLoading(false);

  return (
    <LoadingContext.Provider value={{ isLoading, showLoading, hideLoading }}>
      {children}
      {isLoading && <LoadingOverlay message={loadingMessage} />}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
