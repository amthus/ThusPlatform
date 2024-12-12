import React from 'react';
import { useBook } from '../../context/BookContext';
import { BookmarkPlus, Loader } from 'lucide-react';

export const BookList: React.FC = () => {
  const { state, dispatch } = useBook();
  const { books, loading, error } = state;

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader className="animate-spin" size={32} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-600">
        {error}
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No books found. Try searching for something!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map((book) => (
        <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src={book.cover}
            alt={book.title}
            className="w-full h-64 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold">{book.title}</h3>
            <p className="text-gray-600 mt-1">By {book.author}</p>
            <p className="text-gray-500 mt-2 text-sm line-clamp-2">
              {book.description}
            </p>
            <button
              onClick={() => dispatch({ type: 'SAVE_BOOK', payload: book })}
              className="mt-4 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <BookmarkPlus size={20} />
              Save to Library
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};