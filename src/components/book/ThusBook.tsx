import React from 'react';
import { BookProvider } from '../../context/BookContext';
import { BookSearch } from './BookSearch';
import { BookList } from './BookList';
import { Pagination } from './Pagination';
import { SavedBooks } from './SavedBooks';

export const ThusBook: React.FC = () => {
  return (
    <BookProvider>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-6">Book Search</h1>
            <BookSearch />
            <BookList />
            <Pagination />
          </div>
          <div className="lg:col-span-1">
            <SavedBooks />
          </div>
        </div>
      </div>
    </BookProvider>
  );
};