import useSWR from "swr";
import { getAllArticle } from "./getAllArticle"; // আপনার ফাংশনের পথে আপডেট করুন

// ফেচার ফাংশন
const fetchArticlesCount = async () => {
  const data = await getAllArticle(1, 10); // 1st page with 10 articles
  return data.totalCount;
};

export function useArticlesCount() {
  const { data, error } = useSWR("article-count", fetchArticlesCount, {
    revalidateOnFocus: false,  // Automatically revalidate when the window is focused
    refreshInterval: 60000,     // Refresh every minute
  });

  return {
    count: data || 0, // If data is undefined, return 0
    loading: !data && !error, // Show loading if no data and no error
    error,
  };
}
