import { useState, useMemo } from 'react';
import { CartItem, CartState } from '../types/cart';

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    // Sample data for demonstration
    {
      id: '1',
      name: '프리미엄 티셔츠',
      price: 29000,
      originalPrice: 35000,
      quantity: 2,
      option: '블랙 / L',
      image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: '2',
      name: '캐주얼 자켓',
      price: 89000,
      originalPrice: 120000,
      quantity: 1,
      option: '네이비 / M',
      image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300'
    }
  ]);

  const cartState: CartState = useMemo(() => {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal >= 50000 ? 0 : 3000;
    const discount = 0;
    
    return {
      items: cartItems,
      total: subtotal + shipping - discount,
      shipping,
      discount
    };
  }, [cartItems]);

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const addItem = (item: Omit<CartItem, 'id'>) => {
    const id = Date.now().toString();
    setCartItems(items => [...items, { ...item, id }]);
  };

  return {
    cartState,
    updateQuantity,
    removeItem,
    clearCart,
    addItem
  };
};