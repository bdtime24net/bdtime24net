'use client';

import React, { useState } from 'react';
import { useSearch } from '@/hooks/search/useSearch'; // Use the custom hook
import { useRouter } from 'next/navigation'; // Next.js router hook
import { SearchOutlined } from '@ant-design/icons'; // Ant Design Search Icon

const SearchComponent: React.FC = () => {
  const [query, setQuery] = useState<string>(''); // Search query state
  const { results, loading, error } = useSearch(query); // Get results from the custom hook
  const router = useRouter(); // Next.js router

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value); // Update query state on input change
  };

  // Handle click on a search result
  const handleClick = (id: string) => {
    router.push(`/latest/${id}`); // Navigate to the article page
  };

  return (
    <div className="relative">
      {/* Search Box */}
      <div className="flex items-center border border-gray-300 rounded-md p-2">
        <SearchOutlined className="text-gray-500" />
        <input
          type="text"
          value={query}
          onChange={handleSearchChange}
          placeholder="Search..."
          className="w-60 ml-2 focus:outline-none"
        />
      </div>

      {/* Loading State */}
      {loading && <div className="absolute top-10 left-2 text-sm text-gray-500">Loading...</div>}

      {/* Error State */}
      {error && <div className="absolute top-10 left-2 text-sm text-red-500">{error}</div>}

      {/* Search Results */}
      {results.length > 0 && (
        <div className="absolute w-72 bg-white shadow-md mt-2 rounded-md">
          {results.map((result: any, index: number) => (
            <div
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleClick(result.id)} // Navigate on result click
            >
              <p className="font-semibold">{result.headline}</p> {/* Display headline */}
            </div>
          ))}
        </div>
      )}

      {/* No Results State */}
      {results.length === 0 && !loading && query.trim() !== '' && (
        <div className="absolute w-72 bg-white shadow-md mt-2 rounded-md p-2 text-gray-500">
          No results found
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
