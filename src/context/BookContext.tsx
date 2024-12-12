import React, { createContext, useContext, useReducer } from 'react';
import { Book } from '../types';

interface BookState {
  books: Book[];
  savedBooks: Book[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalBooks: number;
}

type BookAction =
  | { type: 'SET_BOOKS'; payload: { books: Book[]; total: number } }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'SAVE_BOOK'; payload: Book }
  | { type: 'REMOVE_BOOK'; payload: string }
  | { type: 'UPDATE_BOOK'; payload: Book };

const initialState: BookState = {
  books: [],
  savedBooks: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalBooks: 0
};

const BookContext = createContext<{
  state: BookState;
  dispatch: React.Dispatch<BookAction>;
} | null>(null);

const bookReducer = (state: BookState, action: BookAction): BookState => {
  switch (action.type) {
    case 'SET_BOOKS':
      return {
        ...state,
        books: action.payload.books,
        totalBooks: action.payload.total,
        loading: false,
        error: null
      };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_PAGE':
      return { ...state, currentPage: action.payload };
    case 'SAVE_BOOK':
      return {
        ...state,
        savedBooks: [...state.savedBooks, action.payload]
      };
    case 'REMOVE_BOOK':
      return {
        ...state,
        savedBooks: state.savedBooks.filter(book => book.id !== action.payload)
      };
    case 'UPDATE_BOOK':
      return {
        ...state,
        savedBooks: state.savedBooks.map(book =>
          book.id === action.payload.id ? action.payload : book
        )
      };
    default:
      return state;
  }
};

export const BookProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(bookReducer, initialState);

  return (
    <BookContext.Provider value={{ state, dispatch }}>
      {children}
    </BookContext.Provider>
  );
};

export const useBook = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBook must be used within a BookProvider');
  }
  return context;
};