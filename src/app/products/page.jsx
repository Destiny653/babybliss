// app/products/page.js
'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Star, SlidersHorizontal, X } from 'lucide-react';
import { useStore } from '../store/useStore';
import { basicUrl } from '../components/url';
import toast from 'react-hot-toast';
import Link from 'next/link';
import ProductCard from '../components/product/ProductCart';
import ProductFilters from '../components/product/Productfilters';


const categories = [
  'All',
  'Feeding',
  'Clothing',
  'Bath',
  'Diaper',
  'Valies',
  'Underwear'
];

const sortOptions = [
  { name: 'Newest', value: 'newest' },
  { name: 'Price: Low to High', value: 'price_asc' },
  { name: 'Price: High to Low', value: 'price_desc' },
  { name: 'Popular', value: 'popular' },
];

export default function ProductsPage() {
  // const searchParams = useSearchParams();
  const addToCart = useStore((state) => state.addToCart);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSort, setSelectedSort] = useState('newest');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([])


  useEffect(() => {
    // Simulate fetching products from API

    setLoading(true);
    const fetchProducts = async () => {
      try {
        setLoading(true);

        // 1. Make the API call
        const response = await fetch(`${basicUrl}/api/category`);
        const json = await response.json();

        // 2. Store the initial data in a separate state
        const initialProducts = json.data || []; // Add fallback empty array
        setProducts(initialProducts);

        // 3. Create a copy for filtering
        let filteredProducts = [...initialProducts];

        // 4. Apply category filter
        if (selectedCategory !== 'All') {
          filteredProducts = filteredProducts.filter(p => p.model === selectedCategory);
        }

        // 5. Apply price filter
        filteredProducts = filteredProducts.filter(p =>
          p.price >= priceRange.min && p.price <= priceRange.max
        );

        // 6. Apply sorting
        switch (selectedSort) {
          case 'price_asc':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
          case 'price_desc':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
          case 'popular':
            filteredProducts.sort((a, b) => b.reviewCount - a.reviewCount);
            break;
          default:
            filteredProducts.sort((a, b) => b.id - a.id);
        }

        // 7. Update the filtered products
        setFilteredProducts(filteredProducts); // You need a separate state for filtered results
      } catch (error) {
        console.error('Error fetching products:', error);
        // Handle error appropriately
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, selectedSort, priceRange]);
  console.log("Data here: ", products)

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
        {/* Mobile filter dialog */}
        <div className="lg:hidden lg:top-8 lg:sticky mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 bg-white shadow px-4 py-2 rounded-lg"
          >
            <SlidersHorizontal size={20} />
            <span>Filters</span>
          </button>
        </div>

        <div className="relative flex lg:flex-row flex-col gap-8">
          {/* Filters - Desktop */}
          <div className={`lg:w-64 space-y-6 ${showFilters ? 'block' : 'hidden'} lg:block top-5 left-0 sticky h-fit`}>
            <div className="bg-white shadow p-6 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">Filters</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="mb-2 font-medium">Categories</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === category}
                        onChange={() => setSelectedCategory(category)}
                        className="form-radio text-pink-600"
                      />
                      <span className="ml-2">{category}</span>
                    </label>
                  ))}
                </div> 
              </div>
              {/* <ProductFilters onFilterChange={setFilteredProducts}/> */}

              {/* Price Range */}
              <div>
                <h4 className="mb-2 font-medium">Price Range</h4>
                <div className="space-y-4">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({
                      ...prev,
                      max: parseInt(e.target.value)
                    }))}
                    className="w-full"
                  />
                  <div className="flex justify-between">
                    <span>${priceRange.min}</span>
                    <span>${priceRange.max}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {/* Sort Options */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-2xl">Products</h2>
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="form-select border-gray-300 focus:border-pink-500 rounded-md focus:ring-pink-500"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>

            {loading ? (
              <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 mb-4 rounded-lg aspect-h-1 aspect-w-1"></div>
                    <div className="bg-gray-200 mb-2 rounded h-4"></div>
                    <div className="bg-gray-200 rounded w-1/2 h-4"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div  className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProducts?.map((product) => (
                  <ProductCard product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}