const { useLoading } = require("../context/LoadingContext");

const TestPage = () => {
  const { isLoading, setIsLoading } = useLoading();

  const handleClick = () => setIsLoading((prev) => !prev);
  return (
    <div>
      <p>Loading? {isLoading ? "Yes" : "No"}</p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleClick}
      >
        Toggle Loading
      </button>
    </div>
  );
};

export default TestPage;
