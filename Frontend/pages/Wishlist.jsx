import React from 'react';
import { Heart, Trash2 } from 'lucide-react';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';

function Wishlist() {
  return (
    <div className="min-h-screen bg-white">
        <Navbar/>
      <div className="max-w-6xl mx-auto px-8 py-8">
        {/* Products Grid */}
        <div className="grid grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div key={item} className="border-2 border-black rounded-2xl overflow-hidden hover:shadow-lg transition-all cursor-pointer">
              {/* Image */}
              <div className="relative bg-gray-200 h-48">
                <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                  <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                </button>
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="font-bold text-black mb-2">Product Name {item}</h3>
                <p className="text-2xl font-black text-black mb-3">${50 * item}</p>
                <button className="w-full py-2 border-2 border-red-600 text-red-600 rounded-lg font-bold hover:bg-red-50 transition-colors flex items-center justify-center gap-2">
                  <Trash2 className="h-4 w-4" />
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Wishlist