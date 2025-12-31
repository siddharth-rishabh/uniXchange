import React, { useState } from "react";
import { Upload, X } from "lucide-react";
import Navbar from "../component/Navbar";
import axios from "../src/api/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../src/contexts/AuthContext";

function Listing() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    condition: "",
    images: [],
    termsAccepted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (formData.images.length + files.length > 5) return;

    const previews = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...previews],
    }));
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async () => {
    if (
      !formData.title ||
      !formData.price ||
      !formData.category ||
      !formData.condition ||
      !formData.termsAccepted
    ) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const data = new FormData();

      data.append("name", formData.title);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("category", formData.category);
      data.append("condition", formData.condition);

      formData.images.forEach((img) => {
        data.append("images", img.file);
      });

      const res = await axios.post("/api/products/list", data);

      if (res.data.success) {
        alert("Product listed successfully");
        navigate("/products/all");
      }
    } catch (error) {
      console.error("FULL ERROR:", error.response?.data || error.message);
      alert(error.response?.data?.message || error.response?.data?.error || "Failed to publish listing");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-4 md:py-8">
        <h1 className="text-xl md:text-4xl font-black text-black mb-2">
          List Your Product
        </h1>
        <p className="text-gray-600">
          Fill in the details to create your listing
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-4 md:py-8 space-y-6 md:space-y-8">
        <div className="border-2 border-black rounded-2xl p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-black mb-4">Product Images</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {formData.images.length < 5 && (
              <label className="border-2 border-dashed border-black rounded-xl h-32 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
                <Upload className="h-8 w-8 text-gray-400 mb-2" />
                <span className="text-xs font-bold text-gray-600">Upload</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            )}

            {formData.images.map((img, index) => (
              <div
                key={index}
                className="border-2 border-gray-200 rounded-xl h-32 bg-gray-100 relative group overflow-hidden"
              >
                <img
                  src={img.preview}
                  alt="preview"
                  className="h-full w-full object-cover"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="border-2 border-black rounded-2xl p-4 md:p-6 space-y-4 md:space-y-6">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Product Name"
            className="w-full px-4 py-3 border-2 border-black rounded-lg"
          />

          <textarea
            rows={4}
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full px-4 py-3 border-2 border-black rounded-lg resize-none"
          />

          <input
            type="number"
            name="price"
            value={formData.price}
            placeholder="Enter your offer amount"
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-black rounded-lg"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="px-4 py-3 border-2 border-black rounded-lg"
            >
              <option value="">Select Category</option>
              <option value="electronics">Electronics</option>
              <option value="books">Books</option>
              <option value="stationery">Stationery</option>
              <option value="clothing">Clothing</option>
              <option value="sports">Sports</option>
              <option value="miscellaneous">Others</option>
            </select>

            <select
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              className="px-4 py-3 border-2 border-black rounded-lg"
            >
              <option value="">Select Condition</option>
              <option value="Brand new">Brand New</option>
              <option value="Like new">Like New</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Old">Old</option>
            </select>
          </div>
        </div>

        <div className="border-2 border-black rounded-2xl p-4 md:p-6">
          <label className="flex items-start cursor-pointer">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              className="w-5 h-5 border-2 border-black rounded mt-0.5"
            />
            <span className="ml-3 text-sm text-gray-700">
              I confirm the details are correct
            </span>
          </label>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full py-3 md:py-4 bg-black text-white rounded-lg font-bold hover:bg-gray-800"
        >
          Publish Listing
        </button>
      </div>
    </div>
  );
}

export default Listing;
