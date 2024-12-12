import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose }) => {
  const { state, dispatch } = useCart();
  const [loading, setLoading] = useState(false);

  const handlePayment = async (method: string) => {
    setLoading(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real app, you would integrate with MTN/Moov API here
    alert(`Payment processed successfully with ${method}`);
    
    dispatch({ type: 'CLEAR_CART' });
    setLoading(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Payment</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <X size={24} />
          </button>
        </div>
        
        <div className="mb-4">
          <p className="text-gray-600">Total Amount: ${state.total.toFixed(2)}</p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => handlePayment('MTN Mobile Money')}
            disabled={loading}
            className="w-full py-3 px-4 bg-yellow-400 text-black rounded-lg font-semibold hover:bg-yellow-500 disabled:opacity-50"
          >
            Pay with MTN Mobile Money
          </button>
          
          <button
            onClick={() => handlePayment('Moov Money')}
            disabled={loading}
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
          >
            Pay with Moov Money
          </button>
        </div>

        {loading && (
          <div className="mt-4 text-center text-gray-600">
            Processing payment...
          </div>
        )}
      </div>
    </div>
  );
};