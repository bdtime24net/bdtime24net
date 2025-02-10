import useSWR from "swr";

// Fetch function to get tag count from the API
const fetchTagCount = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tag`);
  if (!response.ok) {
    throw new Error("Failed to fetch tag counts");
  }
  const jsonData = await response.json();

  // Make sure the response has the necessary structure
  if (!jsonData.success || !jsonData.data) {
    throw new Error("Invalid response structure");
  }

  // Returning the length of the data (number of tags)
  return jsonData.data.length;
};

export function useTagCount() {
  const { data, error } = useSWR("tag-count", fetchTagCount, {
    revalidateOnFocus: true,
    refreshInterval: 60000, // Refresh data every 1 minute
  });

  return {
    tagCount: data || 0,    // Default to 0 if no data is available
    loading: !data && !error,  // Show loading if data is not available and there is no error
    error,
  };
}
