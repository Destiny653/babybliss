'use client';
import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, User, Phone, ArrowLeft, Loader, CheckCircle } from 'lucide-react'; 
import { useRouter } from 'next/navigation';
import { basicUrl } from '../components/url';
const RegistrationForm = () => {
    const [step, setStep] = useState(1);
    const navigation = useRouter()
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      phone: '',
      password: '',
      confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
  
    // API basicUrl from environment variable 
  
    const handleEmailSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
  
      try {
        const res = await fetch(`${basicUrl}/api/client/email`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
  
        const data = await res.json();
  
        if (!res.ok) {
          throw new Error(data.message || 'Something went wrong');
        }
  
        localStorage.setItem('otpEmail', email);
        alert(data.message);
        setStep(2);
      } catch (error) {
        alert(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
  
    const handleOtpVerification = async (e) => {
      e.preventDefault();
      const email = localStorage.getItem('otpEmail');
  
      if (!email) {
        alert("Please submit email first");
        setStep(1);
        return;
      }
  
      const otpString = otp.join('');
      if (otpString.length !== 6) {
        alert("Please enter complete OTP");
        return;
      }
  
      setLoading(true);
  
      try {
        const res = await fetch(`${basicUrl}/api/client/otp`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ otp: otpString, email })
        });
  
        const data = await res.json();
  
        if (!res.ok) {
          throw new Error(data.message || 'OTP verification failed');
        }
  
        localStorage.setItem('otp', otpString);
        setOtpVerified(true);
        alert(data.message);
        setStep(3);
      } catch (error) {
        alert(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
  
    const handleOtpChange = useCallback((index, value) => {
      if (value.length <= 1) {
        setOtp(prev => {
          const newOtp = [...prev];
          newOtp[index] = value;
          return newOtp;
        });
  
        // Auto-focus next input
        if (value.length === 1 && index < 5) {
          const nextInput = document.getElementById(`otp-${index + 1}`);
          nextInput?.focus();
        }
      }
    }, []);
  
    const handleFinalSubmit = async (e) => {
      e.preventDefault();
      
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords don't match");
        return;
      }
  
      const email = localStorage.getItem('otpEmail');
      const otpString = localStorage.getItem('otp');
  
      if (!email || !otpString) {
        alert("Please complete email verification first");
        setStep(1);
        return;
      }
  
      setLoading(true);
  
      try {
        const res = await fetch(`${basicUrl}/api/client/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            email,
            otp: otpString
          })
        });
  
        const data = await res.json();
  
        if (!res.ok) {
          throw new Error(data.message || 'Registration failed');
        }
  
        // Clear local storage
        localStorage.removeItem('otpEmail');
        localStorage.removeItem('otp');
  
        alert('Registration successful!');
        navigation.push('/login') // Redirect or handle success
        // Redirect or handle success
      } catch (error) {
        alert(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };
  
    const fadeIn = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 }
    };
  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-pink-50 to-blue-50 p-4 min-h-screen">
      <motion.div 
        className="relative bg-white shadow-xl p-8 rounded-2xl w-full max-w-md"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        {step > 1 && (
          <button
            type="button"
            onClick={() => setStep(prev => prev - 1)}
            className="top-4 left-4 absolute p-2 text-gray-400 hover:text-pink-500 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}

        <motion.div
          key={step}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={fadeIn}
        >
          {step === 1 && (
            <form onSubmit={handleEmailSubmit} className="space-y-6">
              <div className="mb-8 text-center">
                <Mail className="mx-auto mb-2 w-16 h-16 text-pink-500" />
                <h2 className="font-bold text-2xl text-gray-800">Welcome to Baby Paradise</h2>
                <p className="text-gray-600">Enter your email to begin registration</p>
              </div>

              <div className="relative">
                <Mail className="top-1/2 left-3 absolute w-5 h-5 text-gray-400 transform -translate-y-1/2" />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-gray-200 focus:border-pink-500 py-3 pr-4 pl-10 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex justify-center items-center bg-pink-500 hover:bg-pink-600 shadow-sm py-3 rounded-lg focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 w-full font-medium text-white transition-colors focus:outline-none"
              >
                {loading ? <Loader className="animate-spin" /> : 'Continue'}
              </button>

              <p className="text-center text-gray-600 text-sm">
                Already have an account?{' '}
                <a href="/login" className="font-medium text-pink-500 hover:text-pink-600 transition-colors">
                  Sign in
                </a>
              </p>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleOtpVerification} className="space-y-6">
              <div className="mb-8 text-center">
                <h2 className="font-bold text-2xl text-gray-800">Verify Email</h2>
                <p className="text-gray-600">
                  Enter the verification code sent to<br />
                  <span className="font-medium text-pink-500">{email}</span>
                </p>
              </div>

              <div className="flex justify-center gap-2 mb-6">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    className="border-gray-200 focus:border-pink-500 border rounded-lg w-12 h-12 font-semibold text-center text-xl focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all"
                    required
                  />
                ))}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex justify-center items-center bg-pink-500 hover:bg-pink-600 shadow-sm py-3 rounded-lg focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 w-full font-medium text-white transition-colors focus:outline-none"
              >
                {loading ? <Loader className="animate-spin" /> : 'Verify Code'}
              </button>

              <p className="text-center text-gray-600">
                Didn't receive the code?{' '}
                <button
                  type="button"
                  onClick={handleEmailSubmit}
                  className="font-medium text-pink-500 hover:text-pink-600 transition-colors"
                >
                  Resend
                </button>
              </p>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleFinalSubmit} className="space-y-6">
              <div className="mb-8 text-center">
                <CheckCircle className="mx-auto mb-2 w-16 h-16 text-green-500" />
                <h2 className="font-bold text-2xl text-gray-800">Complete Registration</h2>
                <p className="text-gray-600">Fill in your details to complete setup</p>
              </div>

              <div className="space-y-4">
                <div className="gap-4 grid grid-cols-2">
                  <div className="relative">
                    <User className="top-1/2 left-3 absolute w-5 h-5 text-gray-400 transform -translate-y-1/2" />
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="border-gray-200 focus:border-pink-500 py-3 pr-4 pl-10 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all"
                      required
                    />
                  </div>
                  <div className="relative">
                    <User className="top-1/2 left-3 absolute w-5 h-5 text-gray-400 transform -translate-y-1/2" />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="border-gray-200 focus:border-pink-500 py-3 pr-4 pl-10 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="relative">
                  <Phone className="top-1/2 left-3 absolute w-5 h-5 text-gray-400 transform -translate-y-1/2" />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="border-gray-200 focus:border-pink-500 py-3 pr-4 pl-10 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all"
                    required
                  />
                </div>

                <div className="relative">
                  <Lock className="top-1/2 left-3 absolute w-5 h-5 text-gray-400 transform -translate-y-1/2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="border-gray-200 focus:border-pink-500 py-3 pr-12 pl-10 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="top-1/2 right-3 absolute text-gray-400 hover:text-pink-500 transform transition-colors -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                <div className="relative">
                  <Lock className="top-1/2 left-3 absolute w-5 h-5 text-gray-400 transform -translate-y-1/2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="border-gray-200 focus:border-pink-500 py-3 pr-12 pl-10 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex justify-center items-center bg-pink-500 hover:bg-pink-600 shadow-sm py-3 rounded-lg focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 w-full font-medium text-white transition-colors focus:outline-none"
              >
                {loading ? <Loader className="animate-spin" /> : 'Complete Registration'}
              </button>
            </form>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RegistrationForm;