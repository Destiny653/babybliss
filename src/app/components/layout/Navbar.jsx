// components/layout/Navbar.js
'use client';
import { useState } from 'react';
import Link from 'next/link';
// import { useStore } from  ;
import { ShoppingCart, Menu, X, User } from 'lucide-react';
import { useStore } from '@/app/store/useStore';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartCount = useStore(state => state.getCartCount());
  const user = useStore(state => state.user);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex flex-shrink-0 items-center">
              <span className="font-bold text-2xl text-pink-600">
                BabyShop
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="sm:flex sm:items-center sm:space-x-8 hidden">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-3 py-2 rounded-md font-medium text-gray-600 text-sm hover:text-pink-600"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <Link href="/profile" className="text-gray-600 hover:text-pink-600">
                <User className="w-6 h-6" />
              </Link>
            ) : (
              <Link href="/login" className="text-gray-600 hover:text-pink-600">
                Login
              </Link>
            )}

            <Link href="/cart" className="relative text-gray-600 hover:text-pink-600">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="top-[-10px] right-[-10px] absolute flex justify-center items-center bg-pink-600 rounded-full w-5 h-5 text-white text-xs">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex justify-center items-center sm:hidden p-2 rounded-md text-gray-600 hover:text-pink-600"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="sm:hidden">
          <div className="space-y-1 px-2 pt-2 pb-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 rounded-md font-medium text-base text-gray-600 hover:text-pink-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}