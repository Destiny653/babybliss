// components/product/ProductCard.js
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingCart } from 'lucide-react';
import { useStore } from '@/app/store/useStore';

export default function ProductCard({ product }) {
  const addToCart = useStore(state => state.addToCart);

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent navigation when clicking the add to cart button
    addToCart(product);
  };

  return (
    <div key={product._id} className="relative bg-white shadow-md hover:shadow-lg rounded-lg overflow-hidden transition-transform hover:-translate-y-1 duration-300">
      {/* Badge */}
      {product.badge && (
        <div className="top-2 right-2 z-10 absolute">
          <span className="bg-pink-600 px-2 py-1 rounded-full text-white text-xs">
            {product.badge}
          </span>
        </div>
      )}

      {/* Image */}
      <Link  href={`/products/${product._id}`} className="group">
        <div className="flex items-center bg-[#fff] w-full h-[300px] aspect-h-1 aspect-w-1 overflow-hidden">
          <img
            src={product.img}
            alt={product.title}
            width={300}
            height={300}
            className="h-full object-center object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        <h3 className="mb-2 font-medium text-[16px] text-gray-900">
          {product.title.slice(0, 16)}
        </h3>
        <p className="mb-2 text-gray-500 text-sm">
          {product.description.slice(0, 75)}...
        </p>

        {/* Price and Rating */}
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <Star className="fill-current w-4 h-4 text-yellow-400" />
            <span className="ml-1 text-gray-600 text-sm">
              {product.rate} ({product.reviewCount})
            </span>
          </div>
        </div>

        {/* Stock Status */}
        <div className="mb-3">
          <span className={`text-sm ${product.stockStatus === 'In Stock'
            ? 'text-green-600'
            : 'text-red-600'
            }`}>
            {product.stockStatus}
          </span>
        </div>

        {/* Add to Cart Button */}
        <div className="flex justify-between items-center">
          <span className="font-bold text-pink-600 text-lg">{product.price}XAF</span>
          <button className="flex justify-center items-center gap-2 bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded-full text-white transition-colors" onClick={() => addToCart(product)}>
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}