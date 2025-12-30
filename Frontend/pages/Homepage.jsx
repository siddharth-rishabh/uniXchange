import React from "react";
import {
  Search,
  Heart,
  ArrowRight,
  Plug,
  Ruler,
  LibraryBig,
  Package,
  SoapDispenserDroplet,
  Hamburger,
  Dumbbell,
  Sparkles,
  Footprints,
  Shirt,
} from "lucide-react";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Homepage() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!search.trim()) return;

    navigate(`/products/all?search=${encodeURIComponent(search)}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="bg-black py-10 md:py-20">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-8">
            What are you looking for?
          </h2>
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search for anything..."
              className="w-full px-4 md:px-8 py-3 md:py-5 rounded-lg border-2 border-white bg-black text-white"
            />

            <button
              onClick={handleSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white text-black p-2 md:p-3 rounded-lg"
            >
              <Search className="h-5 w-5 md:h-6 md:w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-20">
        <h2 className="text-3xl md:text-5xl font-black text-black mb-8 md:mb-12 text-center">
          Browse categories
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-8">
          <Link to="/products/electronics">
            <div className="bg-white border-2 border-black rounded-2xl p-6 md:p-10 text-center hover:bg-black hover:text-white  transition-all cursor-pointer group">
              <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-white group-hover:bg-black rounded-xl mx-auto mb-4 md:mb-6 transition-colors">
                <Plug className="h-12 w-12 md:h-16 md:w-16" />
              </div>
              <h3 className="text-lg md:text-2xl font-bold">Electronics</h3>
            </div>
          </Link>
          <Link to="/products/stationery">
            <div className="bg-white border-2 border-black rounded-2xl p-6 md:p-10 text-center hover:bg-black hover:text-white  transition-all cursor-pointer group">
              <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-white group-hover:bg-black rounded-xl mx-auto mb-4 md:mb-6 transition-colors">
                <Ruler className="h-12 w-12 md:h-16 md:w-16" />
              </div>
              <h3 className="text-lg md:text-2xl font-bold">Stationery</h3>
            </div>
          </Link>
          <Link to="/products/books">
            <div className="bg-white border-2 border-black rounded-2xl p-6 md:p-10 text-center hover:bg-black hover:text-white  transition-all cursor-pointer group">
              <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-white group-hover:bg-black rounded-xl mx-auto mb-4 md:mb-6 transition-colors">
                <LibraryBig className="h-12 w-12 md:h-16 md:w-16" />
              </div>
              <h3 className="text-lg md:text-2xl font-bold">Books</h3>
            </div>
          </Link>
          <Link to="/products/clothing">
            <div className="bg-white border-2 border-black rounded-2xl p-6 md:p-10 text-center hover:bg-black hover:text-white  transition-all cursor-pointer group">
              <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-white group-hover:bg-black rounded-xl mx-auto mb-4 md:mb-6 transition-colors">
                <Shirt className="h-12 w-12 md:h-16 md:w-16" />
              </div>
              <h3 className="text-lg md:text-2xl font-bold">Clothing</h3>
            </div>
          </Link>
          <Link to="/products/footwear">
            <div className="bg-white border-2 border-black rounded-2xl p-6 md:p-10 text-center hover:bg-black hover:text-white  transition-all cursor-pointer group">
              <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-white group-hover:bg-black rounded-xl mx-auto mb-4 md:mb-6 transition-colors">
                <Footprints className="h-12 w-12 md:h-16 md:w-16" />
              </div>
              <h3 className="text-lg md:text-2xl font-bold">Footwear</h3>
            </div>
          </Link>
          <Link to="/products/accessories">
            <div className="bg-white border-2 border-black rounded-2xl p-6 md:p-10 text-center hover:bg-black hover:text-white  transition-all cursor-pointer group">
              <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-white group-hover:bg-black rounded-xl mx-auto mb-4 md:mb-6 transition-colors">
                <Sparkles className="h-12 w-12 md:h-16 md:w-16" />
              </div>
              <h3 className="text-lg md:text-2xl font-bold">Accessories</h3>
            </div>
          </Link>
          <Link to="/products/sports">
            <div className="bg-white border-2 border-black rounded-2xl p-6 md:p-10 text-center hover:bg-black hover:text-white  transition-all cursor-pointer group">
              <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-white group-hover:bg-black rounded-xl mx-auto mb-4 md:mb-6 transition-colors">
                <Dumbbell className="h-12 w-12 md:h-16 md:w-16" />
              </div>
              <h3 className="text-lg md:text-2xl font-bold">Sports</h3>
            </div>
          </Link>
          <Link to="/products/snacks">
            <div className="bg-white border-2 border-black rounded-2xl p-6 md:p-10 text-center hover:bg-black hover:text-white  transition-all cursor-pointer group">
              <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-white group-hover:bg-black rounded-xl mx-auto mb-4 md:mb-6 transition-colors">
                <Hamburger className="h-12 w-12 md:h-16 md:w-16" />
              </div>
              <h3 className="text-lg md:text-2xl font-bold">Snacks</h3>
            </div>
          </Link>
          <Link to="/products/toiletries">
            <div className="bg-white border-2 border-black rounded-2xl p-6 md:p-10 text-center hover:bg-black hover:text-white  transition-all cursor-pointer group">
              <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-white group-hover:bg-black rounded-xl mx-auto mb-4 md:mb-6 transition-colors">
                <SoapDispenserDroplet className="h-12 w-12 md:h-16 md:w-16" />
              </div>
              <h3 className="text-lg md:text-2xl font-bold">Toiletries</h3>
            </div>
          </Link>
          <Link to="/products/mix">
            <div className="bg-white border-2 border-black rounded-2xl p-6 md:p-10 text-center hover:bg-black hover:text-white transition-all cursor-pointer group">
              <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-white group-hover:bg-black rounded-xl mx-auto mb-4 md:mb-6 transition-colors">
                <Package className="h-12 w-12 md:h-16 md:w-16" />
              </div>
              <h3 className="text-lg md:text-2xl font-bold">Mix..</h3>
            </div>
          </Link>
        </div>
      </div>
      

      {/* Stats Section */}
      {/* <div className="max-w-6xl mx-auto px-8 py-20">
        <div className="grid grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-6xl font-black text-black mb-2">10K+</div>
            <div className="text-xl text-gray-600">Active Listings</div>
          </div>
          <div className="text-center">
            <div className="text-6xl font-black text-black mb-2">5K+</div>
            <div className="text-xl text-gray-600">Happy Students</div>
          </div>
          <div className="text-center">
            <div className="text-6xl font-black text-black mb-2">50+</div>
            <div className="text-xl text-gray-600">Campus Partners</div>
          </div>
        </div>
      </div> */}


      <div className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-20">
        <div className="bg-black rounded-2xl p-8 md:p-16 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 md:mb-6">
            Ready to declutter?
          </h2>
          <p className="text-lg md:text-2xl text-gray-300 mb-6 md:mb-10">
            Start selling your stuff today
          </p>
          <Link to="/listing">
            <button className="px-6 py-3 md:px-10 md:py-5 bg-pink-600 text-white text-lg md:text-xl font-bold rounded-lg hover:bg-pink-700 transition-colors">
              POST YOUR AD
            </button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
export default Homepage;
