// components/layout/Footer.js
'use client';
import { useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function Footer() {
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    toast.success('Message sent successfully!');
    setFormData({ email: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <footer className="bg-gray-100">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl">
        <div className="gap-8 grid grid-cols-1 md:grid-cols-3">
          {/* Company Info */}
          <div>
            <h3 className="mb-4 font-semibold text-gray-900 text-lg">
              BabyShop
            </h3>
            <p className="mb-4 text-gray-600">
              Your one-stop shop for all baby essentials.
            </p>
            <div className="space-y-2">
              <p className="text-gray-600">Email: contact@babyshop.com</p>
              <p className="text-gray-600">Phone: (555) 123-4567</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold text-gray-900 text-lg">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-pink-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-600 hover:text-pink-600">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-pink-600">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-pink-600">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="mb-4 font-semibold text-gray-900 text-lg">
              Send us a message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email"
                  className="border-gray-300 px-3 py-2 border rounded-md focus:ring-1 focus:ring-pink-500 w-full focus:outline-none"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  className="border-gray-300 px-3 py-2 border rounded-md focus:ring-1 focus:ring-pink-500 w-full focus:outline-none"
                  required
                />
              </div>
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message"
                  rows="4"
                  className="border-gray-300 px-3 py-2 border rounded-md focus:ring-1 focus:ring-pink-500 w-full focus:outline-none"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded-md w-full text-white transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        <div className="border-gray-200 mt-8 pt-8 border-t text-center">
          <p className="text-gray-600">
            © {new Date().getFullYear()} BabyBliss. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}