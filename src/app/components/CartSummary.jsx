'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useStore } from '../store/useStore';



const CartSidebar = () => {
  const cart = useStore(state => state.cart);
  const removeFromCart = useStore(state => state.removeFromCart);
  const updateQuantity = useStore(state => state.updateQuantity);
  const getCartTotal = useStore(state => state.getCartTotal);
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([
    {
      id: '1',
      name: 'Baby Soft Blanket',
      price: 29.99,
      quantity: 1,
      image: '/images/blanket.jpg'
    },
    {
      id: '2',
      name: 'Organic Cotton Onesie',
      price: 19.99,
      quantity: 2,
      image: '/images/onesie.jpg'
    }
  ]);

  // const updateQuantity = (id, change) => {
  //   setCartItems(items =>
  //     items.map(item => {
  //       if (item.id === id) {
  //         const newQuantity = Math.max(0, item.quantity + change);
  //         return newQuantity === 0 ? null : { ...item, quantity: newQuantity };
  //       }
  //       return item;
  //     }).filter
  //   );
  // };

  // const removeItem = (id) => {
  //   setCartItems(items => items.filter(item => item.id !== id));
  // };

  // const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  // const tax = subtotal * 0.1; // 10% tax
  // const total = subtotal + tax;

  return (
    <>
      {/* Cart Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="right-4 bottom-4 z-30 fixed bg-pink-500 hover:bg-pink-600 shadow-lg p-3 rounded-full text-white transition-colors"
      >
        <ShoppingCart className="w-6 h-6" />
        {cart.length > 0 && (
          <span className="-top-2 -right-2 absolute flex justify-center items-center bg-blue-500 rounded-full w-6 h-6 text-white text-xs">
            {cart.reduce((sum, item) => sum + item.quantity, 0)}
          </span>
        )}
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="z-40 fixed inset-0 bg-black bg-opacity-50"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20 }}
            className="top-0 right-0 z-50 fixed bg-white shadow-xl w-full sm:w-96 h-full"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex justify-between items-center border-gray-200 bg-pink-50 p-4 border-b">
                <h2 className="font-semibold text-gray-800 text-xl">Shopping Cart</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-pink-100 p-2 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 space-y-4 p-4 overflow-y-auto">
                {cartItems.length === 0 ? (
                  <div className="py-8 text-center text-gray-500">
                    Your cart is empty
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item._id} className="flex gap-4 bg-white shadow-sm p-4 rounded-lg">
                      <div className="relative w-20 h-20">
                        <Image
                          src={item.img}
                          alt={item.title}
                          fill
                          className="rounded-md object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-800">{item.title.slice(0,15)}</h3>
                        <p className="font-medium text-pink-500">{item.price.toFixed(2)}XAF</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                            className="hover:bg-pink-100 p-1 rounded-full transition-colors"
                          >
                            <Minus className="w-4 h-4 text-gray-600" />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                            className="hover:bg-pink-100 p-1 rounded-full transition-colors"
                          >
                            <Plus className="w-4 h-4 text-gray-600" />
                          </button>
                          <button
                            onClick={() => removeFromCart(item._id)}
                            className="hover:bg-red-100 ml-auto p-1 rounded-full transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Summary */}
              <div className="border-gray-200 bg-gray-50 p-4 border-t">
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>{getCartTotal()}XAF</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="bg-gray-200 my-2 h-px" />
                  <div className="flex justify-between font-semibold text-gray-800">
                    <span>Total</span>
                    <span>{getCartTotal()}XAF</span>
                  </div>
                </div>
                <button
                  className="bg-pink-500 hover:bg-pink-600 disabled:opacity-50 mt-4 py-3 rounded-lg w-full font-medium text-white transition-colors disabled:cursor-not-allowed"
                  disabled={cart.length === 0}
                  onClick={() => {
                    // Handle checkout
                    console.log('Proceeding to checkout...');
                  }}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CartSidebar;