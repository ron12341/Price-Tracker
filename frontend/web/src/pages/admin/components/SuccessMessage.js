const SuccessMessage = ({ message, onClose }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-xl max-w-md w-full mx-4">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900">Success!</h3>
        <p className="text-gray-600 text-center">{message}</p>
        <button
          onClick={onClose}
          className="mt-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessMessage;
