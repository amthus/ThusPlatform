import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { Navigation } from './components/Navigation';
import { WelcomePage } from './components/WelcomePage';
import { Cart } from './components/Cart';
import { PaymentModal } from './components/PaymentModal';
import { ProductCard } from './components/ProductCard';
import { ShoppingCart as CartIcon } from 'lucide-react';
import { products } from './data/products';
import { ThusBook } from './components/book/ThusBook'; // Importation de ThusBook

function App() {
  const [currentPath, setCurrentPath] = useState('/');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // Fonction pour rendre le contenu en fonction du chemin
  const renderContent = () => {
    switch (currentPath) {
      case '/':
        return <WelcomePage onNavigate={setCurrentPath} />;
      case '/commerce':
        return (
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex gap-8">
              <div className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
              {isCartOpen && (
                <div className="w-96 bg-white p-6 rounded-lg shadow-lg h-fit">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Shopping Cart</h2>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <CartIcon size={24} />
                    </button>
                  </div>
                  <Cart />
                  <button
                    onClick={() => setIsPaymentModalOpen(true)}
                    className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Proceed to Payment
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      case '/book':
        return <ThusBook />; // Affiche ThusBook
      default:
        return null;
    }
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">ThusPlatform</h1>
            {/* Affichage de l'icône du panier uniquement sur /commerce */}
            {currentPath === '/commerce' && (
              <button
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="p-2 hover:bg-gray-100 rounded-full relative"
              >
                <CartIcon size={24} />
              </button>
            )}
          </div>
        </header>

        {/* Navigation et contenu */}
        <Navigation currentPath={currentPath} onNavigate={setCurrentPath} />
        {renderContent()}

        {/* Modal de Paiement */}
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
        />
      </div>
    </CartProvider>
  );
}

export default App;
