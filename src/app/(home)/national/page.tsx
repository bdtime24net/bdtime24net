"use client";

import useSWR from "swr";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { bn } from "date-fns/locale";
import { getAllArticle } from "@/hooks/article/getAllArticle";
import { useState } from "react";

const fetchArticles = async (page: number, limit: number) => {
  const data = await getAllArticle(page, limit); // Fetch 10 articles per page
  return data.articles || [];
};

const NationalPage = () => {
  const [currentPage] = useState<number>(1); // State for the current page
  const limit = 9; // Define limit for articles per page
  
  const { data: articles, error } = useSWR(
    `national-articles-page-${currentPage}`,
    () => fetchArticles(currentPage, limit),
    {
      refreshInterval: 60000, // Refresh every 60 seconds
    }
  );

  return (
    <div className="max-w-7xl mx-auto px-4 mt-44">
      <h1 className="text-3xl font-bold text-center mb-8">জাতীয় সংবাদ</h1>

      {/* Loading Indicator */}
      {!articles && !error && (
        <p className="text-center text-gray-500">লোড হচ্ছে...</p>
      )}

      {/* Error Message */}
      {error && (
        <p className="text-center text-red-500">ডেটা লোড করতে সমস্যা হয়েছে</p>
      )}

      {/* Articles List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles?.map((article) => (
          <div
            key={article.id}
            className=" shadow-md rounded-lg overflow-hidden flex flex-col"
          >
            <Link href={`/latest/${article.id}`}>
              <picture>
                <img
                  src={article.urlToImage?.[0] || "/default-image.jpg"}
                  alt={article.headline}
                  className="w-full h-48 object-cover"
                />
              </picture>
            </Link>
            <div className="p-4 flex-grow">
              <h2 className="text-lg font-semibold hover:text-indigo-600 transition">
                <Link href={`/latest/${article.id}`}>{article.headline}</Link>
              </h2>

              <p className="text-xs text-gray-500 mt-2">{article.keywords}</p>

              {/* Display time in Bangla */}
              <p className="text-xs text-gray-500 mt-1">
                {formatDistanceToNow(new Date(article.publishedAt), {
                  addSuffix: true,
                  locale: bn,
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NationalPage;
