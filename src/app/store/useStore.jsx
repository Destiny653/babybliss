// store/useStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import toast from 'react-hot-toast';

export const useStore = create(
  persist(
    (set, get) => ({
      cart: [],
      user: null,
      
      // Cart actions
      addToCart: (product) => {
        const cart = get().cart;
        const existingItem = cart.find(item => item._id === product._id);
        
        if (existingItem) {
          const updatedCart = cart.map(item =>
            item._id === product._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
          set({ cart: updatedCart });
        } else {
          set({ cart: [...cart, { ...product, quantity: 1 }] });
        }
        
        toast.success('Added to cart!', {
          duration: 2000,
          position: 'top-right',
          style: {
            background: '#10B981',
            color: '#fff',
          },
        });
      },
      
      removeFromCart: (productId) => {
        set({ cart: get().cart.filter(item => item._id !== productId) });
        toast.success('Removed from cart');
      },
      
      updateQuantity: (productId, quantity) => {
        if (quantity < 1) return;
        
        set({
          cart: get().cart.map(item =>
            item._id === productId
              ? { ...item, quantity }
              : item
          )
        });
      },
      
      clearCart: () => set({ cart: [] }),
      
      // Cart calculations
      getCartTotal: () => {
        return get().cart.reduce(
          (total, item) => total + (item.price * item.quantity),
          0
        ).toFixed(2);
      },
      
      getCartCount: () => {
        return get().cart.reduce(
          (count, item) => count + item.quantity,
          0
        );
      },
    }),
    {
      name: 'baby-shop-storage', // unique name for localStorage
      getStorage: () => localStorage, // Use localStorage for persistence
    }
  )
);