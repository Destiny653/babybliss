// app/page.js
'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShoppingBag,
  Truck,
  Shield,
  Gift,
  Star,
  ChevronRight,
  Heart,
  RefreshCcw,
  Headphones,
  ChevronRightCircle,
  ChevronLeft,
  ChevronsRight,
  ChevronsLeft
} from 'lucide-react';
import { useStore } from './store/useStore';
import { basicUrl } from './components/url';

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);
  const addToCart = useStore((state) => state.addToCart)
  const [data, setData] = useState([])

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${basicUrl}/api/category`);
      const json = await response.json();
      setData(json.data);
    } catch (error) {
      console.error('Error fetching products:', error);

    }
  }

  useEffect(() => {
    fetchProducts();
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Parent of two",
      image: "https://i.pravatar.cc/150?img=1",
      comment: "The quality of clothes I received was outstanding. My kids love wearing them, and they've held up beautifully through countless washes.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "First-time parent",
      image: "https://i.pravatar.cc/150?img=2",
      comment: "Amazing selection of baby essentials. The customer service team was incredibly helpful in helping me choose the right items.",
      rating: 5
    },
    {
      name: "Emma Thompson",
      role: "Mother of three",
      image: "https://i.pravatar.cc/150?img=3",
      comment: "I've been shopping here for years. The quality and style of their products never disappoint. Highly recommended!",
      rating: 5
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };


  const featuredProducts = [
    {
      id: 1,
      name: "Organic Cotton Onesie",
      price: 24.99,
      image: "https://images.pexels.com/photos/3932957/pexels-photo-3932957.jpeg",
      rating: 4.8,
      reviews: 128
    },
    {
      id: 2,
      name: "Wooden Educational Toy Set",
      price: 39.99,
      image: "https://images.pexels.com/photos/3933025/pexels-photo-3933025.jpeg",
      rating: 4.9,
      reviews: 95
    },
    {
      id: 3,
      name: "Baby Care Essential Kit",
      price: 49.99,
      image: "https://images.pexels.com/photos/3933027/pexels-photo-3933027.jpeg",
      rating: 4.7,
      reviews: 156
    },
    {
      id: 4,
      name: "Soft Plush Animal",
      price: 19.99,
      image: "https://images.pexels.com/photos/3933028/pexels-photo-3933028.jpeg",
      rating: 4.9,
      reviews: 203
    }
  ];

  const categories = [
    {
      name: "Clothing",
      image: "https://images.pexels.com/photos/3932930/pexels-photo-3932930.jpeg",
      count: "250+ Products"
    },
    {
      name: "Toys",
      image: "https://images.pexels.com/photos/3932931/pexels-photo-3932931.jpeg",
      count: "180+ Products"
    },
    {
      name: "Care",
      image: "https://images.pexels.com/photos/3932932/pexels-photo-3932932.jpeg",
      count: "120+ Products"
    },
    {
      name: "Feeding",
      image: "https://images.pexels.com/photos/3932933/pexels-photo-3932933.jpeg",
      count: "150+ Products"
    }
  ];

  return (
    <div className="relative">
      {/* Hero Section with Parallax */}
      <div className="relative h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-300"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/3932934/pexels-photo-3932934.jpeg')",
            transform: `translateY(${scrollY * 0.5}px)`
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="relative h-full flex items-center justify-center text-center text-white px-4">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-slide-up">
              Welcome to Baby Paradise
            </h1>
            <p className="text-xl mb-8 animate-slide-up-delay">
              Discover our curated collection of premium baby products
            </p>
            <div className="animate-slide-up-delay-2">
              <Link
                href="/products"
                className="inline-flex items-center bg-pink-600 text-white px-8 py-3 rounded-full hover:bg-pink-700 transition-colors"
              >
                Shop Now
                <ChevronRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: <Truck />, title: "Free Shipping", desc: "On orders over $50" },
              { icon: <Shield />, title: "Secure Payment", desc: "100% secure checkout" },
              { icon: <Gift />, title: "Special Gifts", desc: "On first purchase" },
              { icon: <ShoppingBag />, title: "Easy Returns", desc: "30-day return policy" }
            ].map((feature, idx) => (
              <div
                key={idx}
                className="feature-card flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg transform transition-transform hover:-translate-y-2"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-pink-100 text-pink-600 rounded-full mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Parallax Content Section */}
      <div className="relative h-screen flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/3932935/pexels-photo-3932935.jpeg')"
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative text-white text-center max-w-4xl px-4">
          <h2 className="text-4xl font-bold mb-6">Our Promise to You</h2>
          <p className="text-xl mb-8">
            We carefully select each product to ensure the highest quality and safety for your little ones.
            Every item in our collection meets strict safety standards and is tested thoroughly.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-gray-900 transition-colors"
          >
            Learn More
            <ChevronRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Featured Products */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {data?.slice(0,4).map((product) => (
              <div
                key={product._id}
                className="product-card group relative bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:-translate-y-2"
              >
                <div className="relative h-64">
                  <Image
                    src={product.img}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <button className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-pink-600 transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center text-yellow-400">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500 ml-2">({product.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">{product.price}XAF</span>
                    <button className="bg-pink-600 text-white px-4 py-2 rounded-full hover:bg-pink-700 transition-colors" onClick={()=>addToCart(product)}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {categories.map((category, idx) => (
              <div
                key={idx}
                className="category-card relative h-80 rounded-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                  <p className="text-sm">{category.count}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Customers Say
          </h2>

          <div className="relative max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-pink-700 hover:bg-pink-800 transition-colors"
              >
                <ChevronsLeft className="w-6 h-6" />
              </button>

              <div className="text-center px-8">
                <div className="mb-6">
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-20 h-20 rounded-full mx-auto object-cover border-4 border-pink-400"
                  />
                </div>

                <div className="flex justify-center mb-4">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current text-yellow-400" />
                  ))}
                </div>

                <p className="text-lg italic mb-6">
                  "{testimonials[currentIndex].comment}"
                </p>

                <div className="font-semibold text-xl">
                  {testimonials[currentIndex].name}
                </div>
                <div className="text-pink-200">
                  {testimonials[currentIndex].role}
                </div>
              </div>

              <button
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-pink-700 hover:bg-pink-800 transition-colors"
              >
                <ChevronsRight className="w-6 h-6" />
              </button>
            </div>

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${index === currentIndex ? 'bg-white' : 'bg-pink-400'
                    }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Trust Badges */}
      <section className="bg-gradient-to-b from-white to-pink-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="bg-pink-100 p-4 rounded-full">
                <Shield className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Safe & Secure</h3>
              <p className="text-sm text-gray-600">100% Secure Payments</p>
            </div>

            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="bg-blue-100 p-4 rounded-full">
                <Truck className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Fast Delivery</h3>
              <p className="text-sm text-gray-600">2-3 Business Days</p>
            </div>

            {/* Trust Badges */}


            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="bg-green-100 p-4 rounded-full">
                <RefreshCcw className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Easy Returns</h3>
              <p className="text-sm text-gray-600">30-Day Return Policy</p>
            </div>

            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="bg-purple-100 p-4 rounded-full">
                <Headphones className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900">24/7 Support</h3>
              <p className="text-sm text-gray-600">Always Here to Help</p>
            </div>
          </div>

          {/* <div className="mt-12 flex flex-wrap justify-center items-center gap-8">
      {trustBadges.map((category) => (
        <div key={category.category} className="flex flex-col items-center">
          <h3 className="text-sm text-gray-600 mb-3">{category.category}</h3>
          <div className="flex gap-4 items-center">
            {category.badges.map((badge) => (
              <div 
                key={badge.alt}
                className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <Image
                  src={badge.src}
                  alt={badge.alt}
                  width={badge.width}
                  height={badge.width}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div> */}
        </div>
      </section>
    </div>
  );
}