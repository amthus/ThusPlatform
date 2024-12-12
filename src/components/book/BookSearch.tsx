import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { searchBooks } from '../../services/openLibrary';

export const BookSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const { dispatch } = useBook();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const result = await searchBooks(query);
      dispatch({ type: 'SET_BOOKS', payload: result });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to search books' });
    }
  };

  return (
    <form onSubmit={handleSearch} className="mb-6">
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for books..."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
};