import React from 'react';
import { BookOpen, ShoppingBag } from 'lucide-react';

interface NavigationProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentPath, onNavigate }) => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex space-x-4">
              <button
                onClick={() => onNavigate('/')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentPath === '/' 
                    ? 'bg-gray-900 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => onNavigate('/commerce')}
                className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 ${
                  currentPath === '/commerce'
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <ShoppingBag size={18} />
                ThusCommerce
              </button>
              <button
                onClick={() => onNavigate('/book')}
                className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 ${
                  currentPath === '/book'
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <BookOpen size={18} />
                ThusBook
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};