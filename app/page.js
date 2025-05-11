// app/page.js
'use client';

import React, { useState, useEffect } from 'react';
import SearchBar from '@/components/SearchBar';
import ProductList from '@/components/ProductList';
import { getAllProducts } from '@/lib/products';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchType, setSearchType] = useState('regular'); // 'regular' or 'semantic'
  const [currentQuery, setCurrentQuery] = useState('');
  const [error, setError] = useState(null);

  // Load initial products on component mount
  useEffect(() => {
    setProducts(getAllProducts());
  }, []);

  const handleSearch = async (query) => {
    setIsLoading(true);
    setCurrentQuery(query);
    setError(null);

    try {
      // Determine which API to use based on search type
      const endpoint = searchType === 'regular' 
        ? `/api/search?query=${encodeURIComponent(query)}` 
        : `/api/semantic-search?query=${encodeURIComponent(query)}`;
      
      const response = await fetch(endpoint);
      
      if (!response.ok) {
        throw new Error(`Search failed with status: ${response.status}`);
      }
      
      const data = await response.json();
      setProducts(data.results);
    } catch (error) {
      console.error('Search error:', error);
      setError('Failed to perform search. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSearchType = () => {
    const newSearchType = searchType === 'regular' ? 'semantic' : 'regular';
    setSearchType(newSearchType);
    
    // Re-run the search with the new search type if there's a query
    if (currentQuery) {
      handleSearch(currentQuery);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <header className="text-center mb-10">
        <h1 className="text-3xl font-bold text-indigo-800 mb-2">Product Search</h1>
        <p className="text-gray-600">Find products with regular or semantic search powered by Gemini AI</p>
      </header>

      <SearchBar 
        onSearch={handleSearch} 
        searchType={searchType} 
        onToggleSearchType={toggleSearchType} 
      />
      
      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      
      <div className="mt-4">
        {currentQuery && !isLoading && (
          <div className="text-gray-600">
            Found {products.length} {products.length === 1 ? 'product' : 'products'} for "{currentQuery}"
          </div>
        )}
      </div>

      <ProductList 
        products={products} 
        isLoading={isLoading}
        searchType={searchType}
      />
    </main>
  );
}