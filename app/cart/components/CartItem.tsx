import React from 'react';
import { X } from 'lucide-react';
import { CartItem as CartItemType } from '../types/cart';
import { QuantitySelector } from './QuantitySelector';

interface CartItemProps {
  item: CartItemType;
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export const CartItem: React.FC<CartItemProps> = ({
  item,
  onQuantityChange,
  onRemove
}) => {
  const formatPrice = (price: number) =>
    `${new Intl.NumberFormat('ko-KR').format(price)}원`;

  return (
    <div className="border-b border-gray-200 py-6">
      <div className="flex items-start space-x-4">
        
        {/* Product Image */}
        <div className="flex-shrink-0">
          <img
            src={
              item.image ||
              'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=300'
            }
            alt={item.name || '상품 이미지'}
            className="w-20 h-20 object-cover rounded-lg"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-medium text-gray-900 mb-1">{item.name}</h3>
          {item.option && (
            <p className="text-sm text-gray-500 mb-2">{item.option}</p>
          )}

          <div className="flex items-center space-x-2 mb-2">
            {item.originalPrice && item.originalPrice > item.price && (
              <span className="text-sm text-gray-400 line-through">
                {formatPrice(item.originalPrice)}
              </span>
            )}
            <span className="text-lg font-semibold text-red-600">
              {formatPrice(item.price)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <QuantitySelector
              quantity={item.quantity}
              onQuantityChange={(quantity) => onQuantityChange(item.id, quantity)}
            />
            <div className="text-right">
              <p className="text-lg font-bold text-gray-900">
                {formatPrice(item.price * item.quantity)}
              </p>
            </div>
          </div>
        </div>

        {/* Remove Button */}
        <button
          onClick={() => onRemove(item.id)}
          className="p-1 text-gray-400 hover:text-red-500 transition-colors"
          aria-label={`Remove ${item.name} from cart`}
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};
