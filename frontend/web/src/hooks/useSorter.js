import { useCallback } from "react";

export const useSorter = () => {
  const sortItems = useCallback((items, { sortBy, direction }) => {
    const itemsCopy = [...items];

    const sortFunctions = {
      date: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      name: (a, b) => a.name.localeCompare(b.name),
      // Add more sort criteria as needed (e.g., price, rating, etc.)
    };

    if (!sortFunctions[sortBy]) return itemsCopy;

    return itemsCopy.sort((a, b) => {
      const result = sortFunctions[sortBy](a, b);
      return direction === "asc" ? result : -result;
    });
  });

  return { sortItems };
};
