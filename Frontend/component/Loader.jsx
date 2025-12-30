import React from 'react';

function Loader() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        {/* Simple Logo */}
        <div className="w-16 h-16 rounded-b-full mx-auto mb-6 animate-pulse">
        <img src='../logo-1.png'/>
        </div>
        
        {/* Brand Name */}
        <h1 className="text-2xl font-bold text-black mb-4">uniXchange</h1>
        
        {/* Three Dots */}
        <div className="flex gap-2 justify-center">
          <div className="w-3 h-3 bg-pink-600 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-pink-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          <div className="w-3 h-3 bg-pink-600 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
        </div>
      </div>
    </div>
  );
}

export default Loader