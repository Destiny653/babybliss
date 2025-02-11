// app/checkout/page.js
'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  CreditCard,
  Truck,
  Shield,
  ChevronRight,
  AlertCircle,
  Check
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useStore } from '../store/useStore';
import axios from 'axios';
import { makePayment } from '@/utils/helper';
import { basicUrl } from '../components/url'; 

const SHIPPING_METHODS = [
  {
    id: 'standard',
    name: 'Standard Shipping',
    price: 5.99,
    duration: '3-5 business days',
    icon: <Truck className="w-5 h-5" />,
  },
  {
    id: 'express',
    name: 'Express Shipping',
    price: 14.99,
    duration: '1-2 business days',
    icon: <Truck className="w-5 h-5" />,
  },
];

export default function CheckoutPage() {
  const router = useRouter();
  const cartItems = useStore((state) => state.cart);
  const clearCart = useStore((state) => state.clearCart);
  const [paymentUrl, setPaymentUrl] = useState(null);
  const [payUrl, setPayUrl] = useState(null)
  const [payment, setPayment] = useState(false)


  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment
  const [formData, setFormData] = useState({
    // Shipping Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    // Shipping Method
    shippingMethod: 'standard',
    // Payment Information
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  // Calculate order summary
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = SHIPPING_METHODS.find(method => method.id === formData.shippingMethod)?.price || 0;
  const tax = subtotal * 0.1; // 10% tax
  const total = Math.round(subtotal + shipping + tax);


  // setCoinbasePayment

  const config = {
    headers: {
      "X-CC-Api-Key": process.env.NEXT_PUBLIC_COINBASE_API,
    },
  }

  const payWithCrypto = async (amount, currency) => {
    const data = {
      local_price: {
        amount,
        currency,
      },
      description: "Payment for a product",
      pricing_type: "fixed_price",
    };
    await axios
      .post("https://api.commerce.coinbase.com/charges", data, config)
      .then((response) => {
        setPaymentUrl(response.data.data.hosted_url);
        console.log('hosted URl', response.data.data.hosted_url);
      }).catch((error) => {
        console.error("error from fronted func:", error);
      })
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    // Validate shipping information
    if (!formData.firstName || !formData.lastName || !formData.email ||
      !formData.phone || !formData.address || !formData.city ||
      !formData.state || !formData.zipCode) {
      toast.error('Please fill in all required fields');
      return;
    }
    setStep(2);
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // This would be your actual payment processing API call
      const res = await fetch(`${basicUrl}/api/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          client: localStorage.getItem('clientId'),
          products: cartItems,
          shippingAddress: {
            fullName: formData.firstName + " " + formData.lastName,
            zipCode: formData.zipCode,
            street: formData.street,
            city: formData.city, 
            state: formData.state,
            address: formData.address,
            email: formData.email,
            phone: formData.phone
          }
        })
      })

      const req = await res.json()
      if(!res.ok){
        toast.error(req.message)
      }
      toast.success('Payment in progress')

      // Clear cart and redirect to success page
      clearCart();
      // router.push('/checkout/success');
    } catch (error) {
      toast.error('Payment fail: '+ error.message);
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex justify-center items-center bg-gray-50 min-h-screen">
        <div className="text-center">
          <h2 className="mb-4 font-bold text-gray-900 text-2xl">Your cart is empty</h2>
          <button
            onClick={() => router.push('/products')}
            className="inline-flex items-center bg-pink-600 hover:bg-pink-700 px-6 py-3 rounded-md text-white"
          >
            Continue Shopping
            <ChevronRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-12 min-h-screen">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-center items-center space-x-4">
            <div className={`flex items-center ${step >= 1 ? 'text-pink-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-pink-100' : 'bg-gray-100'
                }`}>
                {step > 1 ? <Check className="w-5 h-5" /> : '1'}
              </div>
              <span className="ml-2 font-medium">Shipping</span>
            </div>
            <div className={`w-16 h-0.5 ${step >= 2 ? 'bg-pink-600' : 'bg-gray-200'}`} />
            <div className={`flex items-center ${step >= 2 ? 'text-pink-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-pink-100' : 'bg-gray-100'
                }`}>
                2
              </div>
              <span className="ml-2 font-medium">Payment</span>
            </div>
          </div>
        </div>

        <div className="gap-8 grid grid-cols-1 lg:grid-cols-3">
          {/* Order Summary */}
          <div className="order-2 lg:order-2 lg:col-span-1">
            <div className="top-6 sticky bg-white shadow-lg p-6 rounded-lg">
              <h2 className="mb-6 font-semibold text-gray-900 text-xl">Order Summary</h2>

              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex space-x-4">
                    <div className="relative w-20 h-20">
                      <Image
                        src={item.img}
                        alt={item.title}
                        fill
                        className="rounded-md object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 text-sm">{item.title}</h3>
                      <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                      <p className="font-medium text-gray-900 text-sm">
                        {(item.price * item.quantity).toFixed(2)}XAF
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 pt-4 border-t">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{subtotal.toFixed(2)}XAF</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">{shipping.toFixed(2)}XAF</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">{tax.toFixed(2)}XAF</span>
                </div>
                <div className="flex justify-between pt-2 border-t font-semibold text-lg">
                  <span>Total</span>
                  <span>{total.toFixed(2)}XAF</span>
                </div>
              </div>

              <div className="space-y-2 mt-6">
                <div className="flex items-center text-gray-600 text-sm">
                  <Shield className="mr-2 w-4 h-4" />
                  Secure checkout
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <Truck className="mr-2 w-4 h-4" />
                  Free returns
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Forms */}
          <div className="order-1 lg:order-1 lg:col-span-2">
            <div className="bg-white shadow-lg p-6 rounded-lg">
              {step === 1 ? (
                // Shipping Information Form
                <form onSubmit={handleShippingSubmit} className="space-y-6">
                  <h2 className="mb-6 font-semibold text-gray-900 text-xl">
                    Shipping Information
                  </h2>

                  <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
                    <div>
                      <label className="block mb-1 font-medium text-gray-700 text-sm">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="px-4 py-2 border border-gray-300 focus:border-pink-500 rounded-md focus:ring-pink-500 w-full"
                      />
                    </div>

                    <div>
                      <label className="block mb-1 font-medium text-gray-700 text-sm">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="px-4 py-2 border border-gray-300 focus:border-pink-500 rounded-md focus:ring-pink-500 w-full"
                      />
                    </div>

                    <div>
                      <label className="block mb-1 font-medium text-gray-700 text-sm">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="px-4 py-2 border border-gray-300 focus:border-pink-500 rounded-md focus:ring-pink-500 w-full"
                      />
                    </div>

                    <div>
                      <label className="block mb-1 font-medium text-gray-700 text-sm">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="px-4 py-2 border border-gray-300 focus:border-pink-500 rounded-md focus:ring-pink-500 w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-1 font-medium text-gray-700 text-sm">
                      Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="px-4 py-2 border border-gray-300 focus:border-pink-500 rounded-md focus:ring-pink-500 w-full"
                    />
                  </div>

                  <div className="gap-6 grid grid-cols-1 md:grid-cols-3">
                    <div>
                      <label className="block mb-1 font-medium text-gray-700 text-sm">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="px-4 py-2 border border-gray-300 focus:border-pink-500 rounded-md focus:ring-pink-500 w-full"
                      />
                    </div>

                    <div>
                      <label className="block mb-1 font-medium text-gray-700 text-sm">
                        State *
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                        className="px-4 py-2 border border-gray-300 focus:border-pink-500 rounded-md focus:ring-pink-500 w-full"
                      />
                    </div>

                    <div>
                      <label className="block mb-1 font-medium text-gray-700 text-sm">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        required
                        className="px-4 py-2 border border-gray-300 focus:border-pink-500 rounded-md focus:ring-pink-500 w-full"
                      />
                    </div>
                  </div>

                  {/* Shipping Methods */}
                  <div className="pt-6 border-t">
                    <h3 className="mb-4 font-medium text-gray-900 text-lg">
                      Shipping Method
                    </h3>
                    <div className="space-y-4">
                      {SHIPPING_METHODS.map((method) => (
                        <label
                          key={method.id}
                          className={`flex items-center p-4 border rounded-lg cursor-pointer ${formData.shippingMethod === method.id
                            ? 'border-pink-600 bg-pink-50'
                            : 'border-gray-300'
                            }`}
                        >
                          <input
                            type="radio"
                            name="shippingMethod"
                            value={method.id}
                            checked={formData.shippingMethod === method.id}
                            onChange={handleChange}
                            className="hidden"
                          />
                          <div className="flex-1">
                            <div className="flex items-center">
                              {method.icon}
                              <span className="ml-2 font-medium">{method.name}</span>
                            </div>
                            <p className="mt-1 text-gray-500 text-sm">
                              {method.duration}
                            </p>
                          </div>
                          <span className="font-medium">${method.price.toFixed(2)}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="bg-pink-600 hover:bg-pink-700 py-3 rounded-md w-full text-white transition-colors"
                  >
                    Continue to Payment
                  </button>
                </form>
              ) : (
                // Payment Form
                <form onSubmit={handlePaymentSubmit} className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-gray-900 text-xl">
                      Payment Information
                    </h2>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-pink-600 hover:text-pink-700 text-sm"
                    >
                      Edit Shipping Info
                    </button>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center text-gray-600 text-sm">
                      <AlertCircle className="mr-2 w-4 h-4" />
                      This is a demo checkout. No real payment will be processed.
                    </div>
                  </div>

                  <div>
                    <label className="block mb-1 font-medium text-gray-700 text-sm">
                      Card Number *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        required
                        placeholder="1234 5678 9012 3456"
                        className="py-2 pr-10 pl-4 border border-gray-300 focus:border-pink-500 rounded-md focus:ring-pink-500 w-full"
                      />
                      <CreditCard className="top-2.5 right-3 absolute w-5 h-5 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-1 font-medium text-gray-700 text-sm">
                      Cardholder Name *
                    </label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleChange}
                      required
                      className="px-4 py-2 border border-gray-300 focus:border-pink-500 rounded-md focus:ring-pink-500 w-full"
                    />
                  </div>

                  <div className="gap-6 grid grid-cols-2">
                    <div>
                      <label className="block mb-1 font-medium text-gray-700 text-sm">
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        required
                        placeholder="MM/YY"
                        className="px-4 py-2 border border-gray-300 focus:border-pink-500 rounded-md focus:ring-pink-500 w-full"
                      />
                    </div>

                    <div>
                      <label className="block mb-1 font-medium text-gray-700 text-sm">
                        CVV *
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        required
                        placeholder="123"
                        className="px-4 py-2 border border-gray-300 focus:border-pink-500 rounded-md focus:ring-pink-500 w-full"
                      />
                    </div>
                  </div>
                  <div>
                    {/* choose payment method radio button*/}
                    <label className="block mb-1 font-medium text-gray-700 text-sm">
                      Payment Method *
                    </label>
                    <div className="space-y-4">
                      <label className='flex gap-[5px]'>
                        <input type='radio' name='pay' value={1}
                          onChange={() => setPayment(true)}
                        />
                        Crypto
                      </label>
                      <label className='flex gap-[5px] space-x-4'>
                        <input type='radio' name='pay' value={2}
                          onChange={() => setPayment(false)}
                        />
                        Mobile Payment
                      </label>
                    </div>
                  </div>

                  {
                    paymentUrl || payUrl ?
                      <a href={paymentUrl || payUrl}
                        className="flex justify-center items-center space-x-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 mt-[10px] py-3 rounded-md w-full text-white transition-colors"
                        target='_blank'>
                        Validate Payment
                        {/* <button className="flex justify-center items-center space-x-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 mt-[10px] py-3 rounded-md w-full text-white transition-colors">Pay with Crypto</button> */}
                      </a>
                      :
                      <button
                        disabled={loading}
                        type='submit'
                        className="flex justify-center items-center space-x-2 bg-pink-600 hover:bg-pink-700 disabled:bg-pink-400 py-3 rounded-md w-full text-white transition-colors"
                      >
                        {
                          loading ? (
                            <>
                              <div className="border-white border-b-2 rounded-full w-5 h-5 animate-spin"></div>
                              <span>Processing...</span>
                            </>
                          ) : (
                            <>
                              <span onClick={() => { payment ? payWithCrypto(total, 'XAF') : makePayment(cartItems, total).then(data => setPayUrl(data)) }} >Pay {total.toFixed(2)}XAF</span>
                            </>
                          )
                        }
                      </button>
                  }
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}