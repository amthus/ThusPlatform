import React from 'react';
import { BookOpen, ShoppingBag, Library, CreditCard, BookMarked, Search } from 'lucide-react';
import { Feature } from '../types';

const features: Feature[] = [
  {
    title: 'ThusCommerce',
    description: 'A complete e-commerce solution with shopping cart and mobile money integration.',
    icon: ShoppingBag,
    path: '/commerce'
  },
  {
    title: 'ThusBook',
    description: 'Digital library management with book catalog and external API integration.',
    icon: BookOpen,
    path: '/book'
  }
];

const subFeatures = [
  {
    icon: CreditCard,
    title: 'Secure Payments',
    description: 'Integrated MTN and Moov Money payment solutions'
  },
  {
    icon: Library,
    title: 'Digital Library',
    description: 'Comprehensive book management system'
  },
  {
    icon: Search,
    title: 'Open Library API',
    description: 'Access millions of books and metadata'
  },
  {
    icon: BookMarked,
    title: 'CRUD Operations',
    description: 'Full management of books and authors'
  }
];

interface WelcomePageProps {
  onNavigate: (path: string) => void;
}

export const WelcomePage: React.FC<WelcomePageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Welcome to Thus Platform
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
              Discover our integrated solutions for e-commerce and digital library management
            </p>
          </div>
        </div>
      </div>

      {/* Main Features */}
      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => onNavigate(feature.path)}
            >
              <div className="inline-flex items-center justify-center p-3 bg-blue-600 rounded-xl text-white mb-4">
                <feature.icon size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sub Features */}
      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {subFeatures.map((feature) => (
            <div key={feature.title} className="relative bg-white p-6 rounded-xl shadow">
              <div className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-lg text-blue-600 mb-4">
                <feature.icon size={20} />
              </div>
              <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
              <p className="mt-2 text-sm text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};