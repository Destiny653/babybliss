// app/contact/page.js
'use client';
import { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Facebook,
  Instagram,
  Twitter
} from 'lucide-react';
import toast from 'react-hot-toast';
import { basicUrl } from '../components/url';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    title: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // This would be your actual API call
      // Simulating API call with timeout 
      const res = await fetch(` ${basicUrl}/api/client/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const req = await res.json()
      if (!res.ok) {
        toast.error(req.message)
        // e.target.reset();
        return;
      }

      // Reset form
      setFormData({
        phone: '',
        email: '',
        title: '',
        message: '',
      });

      toast.success('Message sent successfully!');
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 py-12 min-h-screen">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 font-bold text-gray-900 text-4xl">Contact Us</h1>
          <p className="mx-auto max-w-2xl text-gray-600 text-lg">
            Have questions? We'd love to hear from you. Send us a message
            and we'll respond as soon as possible.
          </p>
        </div>

        <div className="gap-8 grid grid-cols-1 lg:grid-cols-3">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="space-y-8 bg-white shadow-lg p-6 rounded-lg">
              <h2 className="font-semibold text-gray-900 text-2xl">
                Contact Information
              </h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="mt-1 w-6 h-6 text-pink-600" />
                  <div>
                    <h3 className="font-medium text-gray-900">Our Location</h3>
                    <p className="text-gray-600">
                      240 BabyBliss Shed Number
                      <br />
                      Bamenda Food Market
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="mt-1 w-6 h-6 text-pink-600" />
                  <div>
                    <h3 className="font-medium text-gray-900">Phone Number</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="mt-1 w-6 h-6 text-pink-600" />
                  <div>
                    <h3 className="font-medium text-gray-900">Email Address</h3>
                    <p className="text-gray-600">support@babybliss.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="mt-1 w-6 h-6 text-pink-600" />
                  <div>
                    <h3 className="font-medium text-gray-900">Working Hours</h3>
                    <p className="text-gray-600">
                      Monday - Friday: 8:00 AM - 6:00 PM
                      <br />
                      Saturday: 9:00 AM - 5:00 PM
                      <br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="pt-6 border-t">
                <h3 className="mb-4 font-medium text-gray-900">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-600 hover:text-pink-600">
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-gray-600 hover:text-pink-600">
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-gray-600 hover:text-pink-600">
                    <Twitter className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow-lg p-6 rounded-lg">
              <h2 className="mb-6 font-semibold text-gray-900 text-2xl">
                Send Us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block mb-1 font-medium text-gray-700 text-sm"
                    >
                      Your Phone Number
                    </label>
                    <input
                      type="tel"
                      id="name"
                      name="phone"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="px-4 py-2 border border-gray-300 focus:border-pink-500 rounded-md focus:ring-pink-500 w-full"
                      placeholder="+237-547-686-79"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-1 font-medium text-gray-700 text-sm"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="px-4 py-2 border border-gray-300 focus:border-pink-500 rounded-md focus:ring-pink-500 w-full"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="title"
                    className="block mb-1 font-medium text-gray-700 text-sm"
                  >
                    Subject
                  </label>
                  <select className="bg-[#fff] px-4 sm:py-[4px] md:py-2 border border-gray-300 focus:border-pink-500 rounded-md focus:outline-none focus:ring-pink-500 w-full"
                    name="title"
                    id="title"
                    value={formData.title}
                    onChange={handleChange}

                  >
                    <option value="">How can we help you?</option>
                    <option value="feedback">Feedback</option>
                    <option value="suggestion">Suggestion</option>
                    <option value="question">Question</option>
                    <option value="complaint">Complaint</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block mb-1 font-medium text-gray-700 text-sm"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="px-4 py-2 border border-gray-300 focus:border-pink-500 rounded-md focus:ring-pink-500 w-full"
                    placeholder="Your message here..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex justify-center items-center space-x-2 bg-pink-600 hover:bg-pink-700 disabled:bg-pink-400 py-3 rounded-md w-full text-white transition-colors"
                >
                  {loading ? (
                    <>
                      <div className="border-white border-b-2 rounded-full w-5 h-5 animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12">
          <div className="bg-white shadow-lg p-6 rounded-lg">
            <h2 className="mb-6 font-semibold text-gray-900 text-2xl">
              Our Location
            </h2>
            <div className="aspect-h-9 aspect-w-16">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30596698663!2d-74.25987368715491!3d40.69714941932609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1645756805741!5m2!1sen!2s"
                className="rounded-lg w-full h-full"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}