const ErrorMessage = ({ message, onClose }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-xl max-w-md w-full mx-4">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900">Error</h3>
        <p className="text-gray-600 text-center">{message}</p>
        <button
          onClick={onClose}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage;
