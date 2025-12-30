import { Heart, MapPin, Clock } from "lucide-react";
import { format } from "timeago.js";

export default function ProductCard({ product}) {
  const {
    name,
    price,
    category,
    condition,
    description,
    createdAt,
    status = "AVAILABLE",
    images,
  } = product;

    const hostel = product?.seller?.hostel || "Campus";

    const timeAgo = product.createdAt ? format(product.createdAt) : "Just now";



  return (
    <div className="border-2 border-gray-200 w-64 rounded-2xl overflow-hidden hover:border-black hover:shadow-lg transition-all cursor-pointer group">
      <div className="relative bg-gray-200 h-56 ">
        {images?.[0] && (
          <img
            src={images[0]}
            alt={name}
            className="h-full w-full object-cover"
          />
        )}

        <button className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
          <Heart className="h-5 w-5 text-black" />
        </button>

        <div className="absolute bottom-3 left-3 px-3 py-1 bg-black text-white text-xs font-bold rounded-lg">
          {status}
        </div>
      </div>

      <div className="p-4">
        <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded mb-2 capitalize">
          {category}
        </span>

        <h3 className="font-bold text-black text-base md:text-lg mb-2">
          {name}
        </h3>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-black text-black">
            ₹ {price}
          </span>
          <span className="text-xs text-gray-500 font-medium">
            {condition}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            <span>{hostel}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{timeAgo || "Just now"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
