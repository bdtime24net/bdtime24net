"use client";

import React, { useState } from "react";
import { useSearch } from "@/hooks/search/useSearch"; // Custom hook for searching
import { useRouter } from "next/navigation"; // Next.js router
import { SearchOutlined } from "@ant-design/icons"; // Ant Design Search Icon

const SearchComponent: React.FC = () => {
  const [query, setQuery] = useState<string>(""); // Search query state
  const { results, loading, error } = useSearch(query); // Fetch search results
  const router = useRouter(); // Next.js router for navigation

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleClick = (id: string) => {
    router.push(`/latest/${id}`);
  };

  return (
    <form className="max-w-md mx-auto relative">
      <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only">
        Search
      </label>
      <div className="relative">
        {/* Search Icon */}
        <div className="absolute inset-y-0 start-0 flex items-center ps-3">
          <SearchOutlined className="text-gray-500" />
        </div>

        {/* Search Input */}
        <input
          type="search"
          id="search"
          value={query}
          onChange={handleSearchChange}
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          placeholder="নিবন্ধগুলি অনুসন্ধান করুন..."
          required
        />

        {/* Search Button */}
        <button
          type="submit"
          className="text-white absolute end-2.5 bottom-2.5 bg-purple-400 hover:bg-blue-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-1 lg:px-4 lg:py-2"
        >
          Search
        </button>
      </div>

      {/* Loading Indicator */}
      {loading && <div className="absolute w-full bg-white shadow-md mt-2 p-2 text-sm text-gray-500">Loading...</div>}

      {/* Error Message */}
      {error && <div className="absolute w-full bg-white shadow-md mt-2 p-2 text-sm text-red-500">{error}</div>}

      {/* Search Results */}
      {results.length > 0 && (
        <div className="absolute w-full bg-white shadow-md mt-2 rounded-md max-h-60 overflow-y-auto">
          {results.map((result: any) => (
            <div
              key={result.id}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleClick(result.id)}
            >
              <p className="font-semibold">{result.headline}</p>
            </div>
          ))}
        </div>
      )}

      {/* No Results Found */}
      {results.length === 0 && !loading && query.trim() !== "" && (
        <div className="absolute w-full bg-white shadow-md mt-2 rounded-md p-2 text-gray-500">
          No results found
        </div>
      )}
    </form>
  );
};

export default SearchComponent;
