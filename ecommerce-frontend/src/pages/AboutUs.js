import React from "react";
import { Sparkles, Heart, Shield, Truck } from "lucide-react";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-rose-500 text-white py-20 px-6">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-rose-300 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block mb-4">
            <Sparkles className="w-12 h-12 mx-auto animate-pulse" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">About Us</h1>
          <p className="text-xl md:text-2xl opacity-95 font-light">Redefining modest fashion for the modern woman</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Welcome Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12 border border-purple-100">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-1 h-16 bg-gradient-to-b from-purple-500 to-rose-500 rounded-full"></div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Welcome to Our World</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                We are your destination for contemporary modest fashion, specializing in premium hijabs that blend tradition with modern aesthetics. Our mission is to empower women with elegant, comfortable, and stylish hijab collections that celebrate individuality while honoring modesty.
              </p>
            </div>
          </div>
        </div>

        {/* Our Story Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-to-br from-purple-100 to-rose-100 rounded-3xl p-8 md:p-10 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Story</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Founded in 2025 with a vision to revolutionize modest fashion, we began as a small team of passionate designers who understood the need for hijabs that are both beautiful and practical.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Today, we proudly serve thousands of confident women worldwide, offering premium fabrics, contemporary designs, and a shopping experience that celebrates your unique style journey.
            </p>
          </div>

          <div className="bg-gradient-to-br from-rose-100 to-purple-100 rounded-3xl p-8 md:p-10 shadow-lg flex items-center justify-center">
            <div className="text-center">
              <Heart className="w-20 h-20 text-rose-500 mx-auto mb-4" />
              <p className="text-2xl font-semibold text-gray-800">Crafted with Love</p>
              <p className="text-gray-600 mt-2">Every piece tells a story</p>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Why Choose Us?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-purple-500">
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Sparkles className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Premium Collection</h3>
              <p className="text-gray-600">Curated hijabs in luxurious fabrics and contemporary designs</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-rose-500">
              <div className="w-14 h-14 bg-rose-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-7 h-7 text-rose-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Secure Shopping</h3>
              <p className="text-gray-600">Safe checkout with encrypted payment protection</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-purple-500">
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Heart className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">24/7 Support</h3>
              <p className="text-gray-600">Dedicated team ready to assist you anytime</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-rose-500">
              <div className="w-14 h-14 bg-rose-100 rounded-full flex items-center justify-center mb-4">
                <Truck className="w-7 h-7 text-rose-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Swift Delivery</h3>
              <p className="text-gray-600">Fast and reliable shipping to your doorstep</p>
            </div>
          </div>
        </div>

        {/* Closing Message */}
        <div className="bg-gradient-to-r from-purple-600 to-rose-500 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Thank You for Choosing Us</h2>
          <p className="text-lg md:text-xl opacity-95 max-w-3xl mx-auto">
            We're honored to be part of your modest fashion journey. Every hijab we create is designed with you in mind—celebrating your elegance, confidence, and grace.
          </p>
          <div className="mt-8">
            <Heart className="w-8 h-8 mx-auto animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}