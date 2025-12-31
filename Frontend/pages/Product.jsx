import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../component/Navbar";
import axios from "../src/api/axios";
import Footer from "../component/Footer";
import { format } from "timeago.js";
import {
  Heart,
  Share2,
  MapPin,
  Clock,
  Shield,
  MessageCircle,
} from "lucide-react";
import Loader from "../component/Loader";

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);



  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/products/${id}`);
        setProduct(res.data.data);
      } catch (err) {
        console.error("Failed to fetch product", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="p-6 md:p-12 text-center font-bold">
        <Loader />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-6 md:p-12 text-center font-bold">
        Product not found
      </div>
    );
  }

  const {
    name,
    description,
    price,
    images = [],
    category,
    condition,
    status,
    createdAt,
    seller,
  } = product;

  const timeAgo = createdAt ? format(createdAt) : "Just now";
  const location = seller?.hostel || seller?.college || "Campus";

  const handleContactSeller = () => {
  if (!product?.seller?.contact) {
    alert("Seller contact not available");
    return;
  }
 
  let phone = String(product.seller.contact).replace(/\D/g, "");

  if (phone.length === 10) {
    phone = `91${phone}`;
  }

  const message = `Hi ${product.seller.name}, I am interested in your product "${product.name}" listed on uniXchange.`;

  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
    message
  )}`;

  window.open(whatsappUrl, "_blank");
};


  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
          <div>
            <div className="bg-gray-200 rounded-2xl h-96 mb-4 border-2 border-black overflow-hidden">
              {images.length > 0 ? (
                <img
                  src={images[activeImage]}
                  alt={name}
                  className="h-full w-full object-contain"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-gray-500 font-bold">
                  No Image
                </div>
              )}
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="thumb"
                  onClick={() => setActiveImage(index)}
                  className={`h-24 rounded-xl border-2 cursor-pointer object-cover ${
                    activeImage === index
                      ? "border-pink-600"
                      : "border-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-4 py-2 bg-pink-100 text-pink-600 rounded-lg font-bold text-sm capitalize">
                {category}
              </span>
              <span className="px-4 py-2 bg-green-100 text-green-600 rounded-lg font-bold text-sm">
                {status.toUpperCase()}
              </span>
            </div>

            <h1 className="text-4xl font-black text-black mb-4">
              {name}
            </h1>

            <div className="mb-6">
              <span className="text-5xl font-black text-black">
                ₹ {price}
              </span>
            </div>

            <div className="flex items-center gap-4 md:gap-6 mb-6 text-gray-600">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>Posted {timeAgo}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>{location}</span>
              </div>
            </div>

            <div className="flex gap-2 md:gap-4 mb-8">
              <button  onClick={handleContactSeller}
              className="flex-1 px-4 md:px-8 py-3 md:py-4 bg-black text-white text-lg font-bold rounded-lg flex items-center justify-center gap-2">
                <MessageCircle className="h-6 w-6" />
                Contact Seller
              </button>
              <button className="px-4 md:px-6 py-3 md:py-4 border-2 border-black rounded-lg">
                <Heart className="h-6 w-6" />
              </button>
              <button className="px-4 md:px-6 py-3 md:py-4 border-2 border-black rounded-lg">
                <Share2 className="h-6 w-6" />
              </button>
            </div>

            <div className="border-t-2 border-black pt-6 mb-6">
            <h2 className="text-xl md:text-2xl font-black mb-4">
                Description
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {description}
              </p>
            </div>

            <div className="border-t-2 border-black pt-6 mb-6">
            <h2 className="text-xl md:text-2xl font-black mb-4">
                Condition
              </h2>
              <p className="font-bold text-black">{condition}</p>
            </div>

            <div className="mt-6 bg-gray-50 border-2 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="h-6 w-6 text-pink-600" />
                <h3 className="font-black">Safety Tips</h3>
              </div>
              <ul className="space-y-2 text-sm">
                <li>• Meet in public places</li>
                <li>• Inspect item before purchase</li>
                <li>• Avoid advance payments</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Product;
