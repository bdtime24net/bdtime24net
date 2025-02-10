import useSWR from "swr";

// Fetch function to get category count from the API
const fetchCategoryCount = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category`);
  if (!response.ok) {
    throw new Error("Failed to fetch category counts");
  }
  const jsonData = await response.json();

  // Make sure the response has the necessary structure
  if (!jsonData.success || !jsonData.data) {
    throw new Error("Invalid response structure");
  }

  // Returning the length of the data (number of categories)
  return jsonData.data.length;
};

export function useCategoryCount() {
  const { data, error } = useSWR("category-count", fetchCategoryCount, {
    revalidateOnFocus: true,
    refreshInterval: 60000, // Refresh data every 1 minute
  });

  return {
    categoryCount: data || 0,    // Default to 0 if no data is available
    loading: !data && !error,  // Show loading if data is not available and there is no error
    error,
  };
}
