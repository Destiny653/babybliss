// app/cart/page.js
'use client'; 
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useStore } from '../store/useStore';

export default function CartPage() {
  const router = useRouter();
  const cart = useStore(state => state.cart);
  const removeFromCart = useStore(state => state.removeFromCart);
  const updateQuantity = useStore(state => state.updateQuantity);
  const getCartTotal = useStore(state => state.getCartTotal);
  const clearCart = useStore(state => state.clearCart);

  if (cart.length === 0) {
    return (
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl">
        <div className="text-center">
          <h2 className="mb-4 font-bold text-2xl text-gray-900">
            Your cart is empty
          </h2>
          <p className="mb-8 text-gray-600">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link
            href="/products"
            className="inline-block bg-pink-600 hover:bg-pink-700 px-6 py-2 rounded-md text-white transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl">
      <h1 className="mb-8 font-bold text-3xl text-gray-900">Shopping Cart</h1>

      <div className="gap-8 grid grid-cols-1 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-4 bg-white shadow-md p-4 rounded-lg"
              >
                <div className="relative w-24 h-24">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="rounded-md object-cover"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 text-lg">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.price}XAF</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    className="hover:bg-gray-100 p-1 rounded-md"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    className="hover:bg-gray-100 p-1 rounded-md"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h2 className="mb-4 font-medium text-gray-900 text-lg">
              Order Summary
            </h2>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{getCartTotal()}XAF</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="pt-4 border-t">
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>{getCartTotal()}XAF</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => router.push('/checkout')}
              className="bg-pink-600 hover:bg-pink-700 mt-6 px-4 py-2 rounded-md w-full text-white transition-colors"
            >
              Proceed to Checkout
            </button>

            <button
              onClick={clearCart}
              className="border-gray-300 hover:bg-gray-50 mt-4 px-4 py-2 border rounded-md w-full text-gray-600 transition-colors"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}