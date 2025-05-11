// components/SearchBar.jsx
"use client"

import React, { useState } from 'react';

const SearchBar = ({ onSearch, searchType, onToggleSearchType }) => {
  const [query, setQuery] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
          />
          {query && (
            <button 
              type="button"
              onClick={() => {
                setQuery('');
                onSearch('');
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg font-medium transition"
          >
            Search
          </button>
          
          <button
            type="button"
            onClick={onToggleSearchType}
            className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-4 rounded-lg font-medium transition flex items-center gap-2"
          >
            <span>{searchType === 'regular' ? 'Regular' : 'Semantic'}</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
            </svg>
          </button>
        </div>
      </form>
      
      <div className="mt-2 text-sm text-gray-500 flex justify-between items-center">
        <div>
          <span className="font-medium">Search Type:</span> {searchType === 'regular' ? 'Regular Search' : 'Semantic Search with Google Gemini AI'}
        </div>
        {searchType === 'semantic' && (
          <div className="text-indigo-600">
            ✨ Try natural language queries like "waterproof portable speakers"
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;