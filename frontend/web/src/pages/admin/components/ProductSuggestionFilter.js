import { useState, useEffect } from "react";

const ProductSuggestionFilter = ({
  productSuggestions,
  setProductSuggestions,
}) => {
  // Filter/Sort/Search state
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOption, setSortOption] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter product suggestions
  const filterProductSuggestions = () => {
    const filtered = productSuggestions.filter((suggestion) => {
      const matchesStatus =
        statusFilter === "all" || suggestion.status === statusFilter;
      const matchesSearch =
        searchQuery === "" ||
        suggestion.query.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (suggestion.name &&
          suggestion.name.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesStatus && matchesSearch;
    });

    setProductSuggestions(filtered);
  };

  const sortProductSuggestions = () => {
    const sorted = productSuggestions.sort((a, b) => {
      switch (sortOption) {
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "query-asc":
          return a.query.localeCompare(b.query);
        case "query-desc":
          return b.query.localeCompare(a.query);
        default: // newest
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

    setProductSuggestions(sorted);
  };

  useEffect(() => {
    filterProductSuggestions();
  }, [statusFilter, searchQuery, productSuggestions]);

  useEffect(() => {
    sortProductSuggestions();
  }, [sortOption, productSuggestions]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-black">
      {/* Status Filter */}
      <div>
        <label className="block text-sm font-medium mb-1 text-white">
          Status
        </label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Sort Options */}
      <div>
        <label className="block text-sm font-medium mb-1 text-white">
          Sort By
        </label>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="query-asc">Query (A-Z)</option>
          <option value="query-desc">Query (Z-A)</option>
        </select>
      </div>

      {/* Search */}
      <div>
        <label className="block text-sm font-medium mb-1 text-white">
          Search
        </label>
        <input
          type="text"
          placeholder="Search by query or name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
    </div>
  );
};

export default ProductSuggestionFilter;
