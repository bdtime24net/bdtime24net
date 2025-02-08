'use client';

import React, { useState } from 'react';
import { useSearch } from '@/hooks/search/useSearch'; // Use the custom hook
import { useRouter } from 'next/navigation'; // Next.js router hook
import { SearchOutlined } from '@ant-design/icons'; // Ant Design Search Icon



const SearchComponent: React.FC = () => {
  const [query, setQuery] = useState<string>(''); // Track the search query
  const { results, loading, error } = useSearch(query); // Get results, loading, and error from the hook
  const router = useRouter(); // Next.js router for navigation

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value); // Update query as the user types
  };

  const handleClick = (id: string) => {
    // Navigate to article page on click
    router.push(`/latest/${id}`);
  };

  return (
    <div className="relative">
      {/* Search input with icon */}
      <div className="flex items-center border border-gray-300 rounded-md p-2">
        <SearchOutlined className="text-gray-500" />
        <input
          type="text"
          value={query}
          onChange={handleSearchChange}
          placeholder="Search articles..."
          className="w-60 ml-2 focus:outline-none"
        />
      </div>

      {/* Display loading indicator */}
      {loading && <div className="absolute top-10 left-2 text-sm text-gray-500">Loading...</div>}

      {/* Display error if any */}
      {error && <div className="absolute top-10 left-2 text-sm text-red-500">{error}</div>}

      {/* Display search results */}
      {results.length > 0 && (
        <div className="absolute w-72 bg-white shadow-md mt-2 rounded-md">
          {results.map((result: any) => (
            <div
              key={result.id}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleClick(result.id)} // Navigate to article
            >
              <p className="font-semibold">{result.headline}</p>
            </div>
          ))}
        </div>
      )}

      {/* No results found */}
      {results.length === 0 && !loading && query.trim() !== '' && (
        <div className="absolute w-72 bg-white shadow-md mt-2 rounded-md p-2 text-gray-500">
          No results found
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
