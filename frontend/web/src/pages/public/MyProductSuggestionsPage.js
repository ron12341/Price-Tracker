import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getMyProductSuggestions, deleteProductSuggestion } from "@publicServices/productSuggestionService";
import Navbar from "./components/Navbar";
import ProductSuggestionCard from "./components/ProductSuggestionCard";
// import Pagination from "../../components/Pagination";
import { useSorter } from "@hooks/useSorter";

const UserSuggestionsPage = () => {
  const { user, isAuthLoading } = useAuth();
  const { sortItems } = useSorter();
  const navigate = useNavigate();
  const [rawSuggestions, setRawSuggestions] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const [filters, setFilters] = useState({
    status: "all", // 'pending'|'approved'|'rejected'
    sort: "date-desc", // newest
  });
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
  });

  const handleFetch = async () => {
    try {
      const res = await getMyProductSuggestions(user.token);
      setRawSuggestions(res);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      console.log(user.token);
      await deleteProductSuggestion(id, user.token);
      setRawSuggestions((prev) => prev.filter((suggestion) => suggestion._id !== id));
    } catch (err) {
      console.log(err);
      alert(err.response.data.error);
    }
  };

  const handleSort = () => {
    const [sortedBy, order] = filters.sort.split("-");
    setFilteredSuggestions(sortItems(filteredSuggestions, { sortBy: sortedBy, direction: order }));
  };

  const handleFilterAndSort = () => {
    if (rawSuggestions.length === 0) return;

    const filtered =
      filters.status === "all"
        ? rawSuggestions
        : rawSuggestions.filter((suggestion) => suggestion.status === filters.status);

    const [sortedBy, order] = filters.sort.split("-");
    const sorted = sortItems(filtered, { sortBy: sortedBy, direction: order });

    setFilteredSuggestions(sorted);
  };

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthLoading && !user) {
      navigate("/auth/login?redirect=/my-suggestions", { replace: true });
    }
  }, [user, isAuthLoading]);

  // Effect to fetch suggestions
  useEffect(() => {
    if (user && !isAuthLoading) {
      handleFetch();
    }
  }, [user]);

  // Effect to Filtering Status
  useEffect(() => {
    if (rawSuggestions.length > 0) {
      handleFilterAndSort();
    } else {
      setFilteredSuggestions([]);
    }
  }, [filters.status, rawSuggestions]);

  // Effect to Sorting
  useEffect(() => {
    if (filteredSuggestions.length > 0) {
      handleSort();
    }
  }, [filters.sort]);

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#f2f2f2] font-sans">
      <Navbar />
      <div className="flex-1 p-5 bg-white rounded-md shadow-md overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">My Suggested Products</h1>
            <button
              onClick={() => navigate("/suggest-product")}
              className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-md shadow mb-4"
            >
              + Suggest a Product
            </button>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="w-full p-2 border rounded border-gray-500"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Sort By</label>
              <select
                value={filters.sort}
                onChange={(e) => {
                  setFilters({ ...filters, sort: e.target.value });
                }}
                className="w-full p-2 border rounded border-gray-500"
              >
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
              </select>
            </div>
          </div>

          {/* Suggestions List */}
          <div className="mb-6">
            {filteredSuggestions.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-500">No suggestions found</p>
                <a href="/suggest-product" className="text-blue-600 hover:underline mt-2 inline-block">
                  Suggest your first product
                </a>
              </div>
            ) : (
              filteredSuggestions.map((suggestion) => (
                <ProductSuggestionCard key={suggestion._id} suggestion={suggestion} onDelete={handleDelete} />
              ))
            )}
          </div>

          {/* Pagination
      {pagination.totalPages > 1 && (
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          onPageChange={(page) => setPagination({...pagination, page})}
        />
      )} */}
        </div>
      </div>
    </div>
  );
};

export default UserSuggestionsPage;
