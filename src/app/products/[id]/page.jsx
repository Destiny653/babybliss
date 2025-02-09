// app/products/[id]/page.js
'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Star, Minus, Plus, ShoppingCart, Heart } from 'lucide-react';
import { useStore } from '@/app/store/useStore'; 
import { basicUrl } from '@/app/components/url';

export default function ProductDetail() {
  const params = useParams();
  const addToCart = useStore((state) => state.addToCart);
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      // This would be your actual API call
      // Simulating API call with dummy data
      const res = await fetch(`${basicUrl}/api/categories`)
      const json = res.json()
      setProduct(json.data)
      const dummyProduct = {
        id: params.id,
        title: "Anti-Colic Bottle Set",
        description: "Set of 3 anti-colic bottles with advanced vent system that helps reduce colic, gas, and fussiness. Perfect for newborns and growing babies.",
        price: 24.99,
        category: "Feeding",
        images: [
          "https://images.pexels.com/photos/3662847/pexels-photo-3662847.jpeg",
          "https://images.pexels.com/photos/3662848/pexels-photo-3662848.jpeg",
          "https://images.pexels.com/photos/3662849/pexels-photo-3662849.jpeg",
        ],
        rate: 4.8,
        reviewCount: 1560,
        stock: 15,
        features: [
          "BPA-free materials",
          "Anti-colic vent system",
          "Easy to clean",
          "Dishwasher safe",
        ],
        specifications: {
          "Material": "Premium PP",
          "Capacity": "8 oz / 240ml",
          "Age Range": "0-12 months",
          "Package Contents": "3 bottles, 3 nipples",
        }
      };

      setProduct(dummyProduct);
      setLoading(false);
    };

    fetchProduct();
  }, [params.id]);

  const handleQuantityChange = (action) => {
    if (action === 'increase' && quantity < product?.stock) {
      setQuantity(prev => prev + 1);
    } else if (action === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="border-pink-600 border-t-2 border-b-2 rounded-full w-32 h-32 animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-12 min-h-screen">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="gap-8 grid grid-cols-1 md:grid-cols-2 p-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative rounded-lg aspect-w-1 aspect-h-1 overflow-hidden">
                <Image
                  src={product.images[selectedImage]}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="gap-4 grid grid-cols-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-w-1 aspect-h-1 rounded-lg overflow-hidden ${
                      selectedImage === index ? 'ring-2 ring-pink-600' : ''
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="font-bold text-3xl text-gray-900">{product.title}</h1>
                <div className="flex items-center mt-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rate)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600 text-sm">
                    {product.rate} ({product.reviewCount} reviews)
                  </span>
                </div>
              </div>

              <p className="text-gray-600">{product.description}</p>

              <div className="font-bold text-3xl text-pink-600">
                ${product.price}
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700">Quantity:</span>
                  <div className="flex items-center border rounded-md">
                    <button
                      onClick={() => handleQuantityChange('decrease')}
                      className="hover:bg-gray-100 p-2"
                      disabled={quantity <= 1}
                    >
                      <Minus size={20} />
                    </button>
                    <span className="border-x px-4 py-2">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange('increase')}
                      className="hover:bg-gray-100 p-2"
                      disabled={quantity >= product.stock}
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                  <span className="text-gray-500 text-sm">
                    {product.stock} items available
                  </span>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => addToCart({ ...product, quantity })}
                    className="flex flex-1 justify-center items-center space-x-2 bg-pink-600 hover:bg-pink-700 py-3 rounded-md text-white transition-colors"
                  >
                    <ShoppingCart size={20} />
                    <span>Add to Cart</span>
                  </button>
                  <button className="hover:bg-gray-50 p-3 border rounded-md">
                    <Heart size={20} />
                  </button>
                </div>
              </div>

              {/* Features */}
              <div>
                <h3 className="mb-2 font-semibold text-lg">Key Features</h3>
                <ul className="space-y-1 list-disc list-inside">
                  {product.features.map((feature, index) => (
                    <li key={index} className="text-gray-600">{feature}</li>
                  ))}
                </ul>
              </div>

              {/* Specifications */}
              <div>
                <h3 className="mb-2 font-semibold text-lg">Specifications</h3>
                <div className="border rounded-md">
                  {Object.entries(product.specifications).map(([key, value], index) => (
                    <div
                      key={key}
                      className={`flex ${
                        index !== 0 ? 'border-t' : ''
                      }`}
                    >
                      <div className="bg-gray-50 p-3 w-1/3 font-medium">
                        {key}
                      </div>
                      <div className="p-3 w-2/3">
                        {value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}