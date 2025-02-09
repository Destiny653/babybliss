// components/product/ProductFilters.js
'use client';
import { useState } from 'react';

export default function ProductFilters({ onFilterChange }) {
  const [priceRange, setPriceRange] = useState('all');
  const [model, setModel] = useState('all');

  const models = ['Feeding', 'Clothing', 'Valies', 'Toy', 'Underwear', 'Diaper'];
  const priceRanges = [
    { label: 'All', value: 'all' },
    { label: 'Under $15', value: '0-15' },
    { label: '$15 - $30', value: '15-30' },
    { label: '$30 - $50', value: '30-50' },
    { label: 'Over $50', value: '50-above' },
  ];

  const handleModelChange = (e) => {
    setModel(e.target.value);
    onFilterChange({ model: e.target.value, priceRange });
  };

  const handlePriceChange = (e) => {
    setPriceRange(e.target.value);
    onFilterChange({ model, priceRange: e.target.value });
  };

  return (
    <div className="bg-white shadow-sm p-4 rounded-lg">
      <div className="space-y-4">
        {/* Model Filter */}
        <div>
          <h3 className="mb-2 font-medium text-gray-900 text-lg">Category</h3>
          <select
            value={model}
            onChange={handleModelChange}
            className="border-gray-300 focus:border-pink-500 shadow-sm rounded-md focus:ring-pink-500 w-full"
          >
            <option value="all">All Categories</option>
            {models.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range Filter */}
        <div>
          <h3 className="mb-2 font-medium text-gray-900 text-lg">Price Range</h3>
          <select
            value={priceRange}
            onChange={handlePriceChange}
            className="border-gray-300 focus:border-pink-500 shadow-sm rounded-md focus:ring-pink-500 w-full"
          >
            {priceRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}