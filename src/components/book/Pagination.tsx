import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { searchBooks } from '../../services/openLibrary';

export const Pagination: React.FC = () => {
  const { state, dispatch } = useBook();
  const { currentPage, totalBooks } = state;
  
  const totalPages = Math.ceil(totalBooks / 10);

  const handlePageChange = async (page: number) => {
    if (page < 1 || page > totalPages) return;
    
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const result = await searchBooks('', page);
      dispatch({ type: 'SET_BOOKS', payload: result });
      dispatch({ type: 'SET_PAGE', payload: page });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch books' });
    }
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
      >
        <ChevronLeft size={20} />
      </button>
      <span className="px-4 py-2">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};