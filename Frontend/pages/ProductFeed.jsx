import React, { useEffect, useState } from "react";
import { Search, SlidersHorizontal, MapPin, Clock, Heart, ChevronDown, ChevronUp } from "lucide-react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import axios from "../src/api/axios";
import ProductCard from "../component/ProductCard";
import User from "../../Backend/models/User";

function ProductFeed() {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const querySearch = searchParams.get("search") || "";
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState(querySearch);
  const [loading, setLoading] = useState(true);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  useEffect(() => {
    setSearch(querySearch);
  }, [querySearch]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const url =
          category === "all"
            ? "/products/all"
            : `/products/category/${category}`;

        const res = await axios.get(url, {
          params: {
            search,
          },
        });
        console.log("API response:", res.data);
        setProducts(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, search]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-8">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
        
          <div className="w-full md:w-64 shrink-0">
            <div className="border-2 border-black rounded-2xl p-4 md:p-6 md:sticky md:top-8">
              <h2 className="hidden md:block text-lg md:text-xl font-black text-black mb-4">Categories</h2>
              <button
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                className="w-full flex md:hidden items-center justify-between text-lg md:text-xl font-black text-black mb-4"
              >
                Categories
                {isCategoriesOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
              <div className={`space-y-2 ${isCategoriesOpen ? 'block' : 'hidden'} md:block`}>
                {[
                  "all",
                  "books",
                  "electronics",
                  "furniture",
                  "clothing",
                  "sports",
                  "stationery",
                  "miscellaneous",
                ].map((cat) => (
                  <Link key={cat} to={`/products/${cat}`}>
                    <button
                      className={`w-full text-left px-4 py-3 rounded-lg font-bold transition-colors ${
                        category === cat
                          ? "bg-black text-white"
                          : "hover:bg-gray-100 text-black"
                      }`}
                    >
                      <span className="capitalize">
                        {cat === "all" ? "All Products" : cat}
                      </span>
                    </button>
                  </Link>
                ))}
              </div>

              {/* Price Range */}
              {/* <div className="mt-8 pt-6 border-t-2 border-gray-200">
                <h3 className="font-black text-black mb-4">Price Range</h3>
                <div className="space-y-3">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 border-2 border-black rounded"
                    />
                    <span className="ml-3 text-sm">Under $50</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 border-2 border-black rounded"
                    />
                    <span className="ml-3 text-sm">$50 - $100</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 border-2 border-black rounded"
                    />
                    <span className="ml-3 text-sm">$100 - $200</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 border-2 border-black rounded"
                    />
                    <span className="ml-3 text-sm">Above $200</span>
                  </label>
                </div>
              </div> */}

              {/* Condition */}
              {/* <div className="mt-6 pt-6 border-t-2 border-gray-200">
                <h3 className="font-black text-black mb-4">Condition</h3>
                <div className="space-y-3">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 border-2 border-black rounded"
                    />
                    <span className="ml-3 text-sm">Brand New</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 border-2 border-black rounded"
                    />
                    <span className="ml-3 text-sm">Like New</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 border-2 border-black rounded"
                    />
                    <span className="ml-3 text-sm">Good</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 border-2 border-black rounded"
                    />
                    <span className="ml-3 text-sm">Fair</span>
                  </label>
                </div>
              </div> */}
            </div>
          </div>

         
          <div className="flex-1">
          
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
              <div>
                <h2 className="text-xl md:text-2xl font-black text-black capitalize">
                  {category} Products
                </h2>
                <p className="text-gray-600 mt-1">
                  {products.length} products found
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search products..."
                    className="w-full pl-12 pr-4 py-2 border-2 border-black rounded-lg focus:outline-none"
                  />
                </div>
                <select className="px-4 py-2 border-2 border-black rounded-lg font-bold focus:outline-none">
                  <option>Most Recent</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Most Popular</option>
                </select>
              </div>
            </div>
            {products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20">
                <img
                  src="/noProductFound.svg"
                  alt="empty"
                  className="w-36 opacity-90 mb-4"
                />
                <p className="text-gray-500 font-bold">
                  No products found in this category
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
                {products.map((product) => (
                  <Link key={product._id} to={`/product/${product._id}`}>
                    <ProductCard product={product} user={User}/>
                  </Link>
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 mt-12">
              <button className="px-4 py-2 border-2 border-black rounded-lg font-bold hover:bg-gray-100 transition-colors">
                Previous
              </button>
              <button className="px-4 py-2 bg-black text-white rounded-lg font-bold">
                1
              </button>
              <button className="px-4 py-2 border-2 border-black rounded-lg font-bold hover:bg-gray-100 transition-colors">
                2
              </button>
              <button className="px-4 py-2 border-2 border-black rounded-lg font-bold hover:bg-gray-100 transition-colors">
                3
              </button>
              <button className="px-4 py-2 border-2 border-black rounded-lg font-bold hover:bg-gray-100 transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProductFeed;
