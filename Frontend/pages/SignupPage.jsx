import React from "react";
import { Mail, User, Phone, MapPin, Upload } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../src/Firebase/firebase";
import axios from "../src/api/axios";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [name, setname] = useState("");
  const [contact, setContact] = useState("");
  const [college, setCollege] = useState("");
  const [hostel, setHostel] = useState("");
  const [password, setPassword] = useState("");
  const [cnfrnPass, setCnfrnPass] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password !== cnfrnPass) {
      alert("Passwords do not match");
      setLoading(false);
      return;
    }
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const firebaseUser = userCred.user;

      const token = await firebaseUser.getIdToken();
      localStorage.setItem("token", token);

      await axios.post("/api/users/signup", {
        firebaseUid: firebaseUser.uid,
        name,
        email,
        contact,
        college,
        hostel,
        profileImage: "",
      });

      alert("Sign-up Successful");
      navigate("/");
    } catch (e) {
      console.log(e);
      alert("SignUp Failed " + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-8">
      <div className="w-full max-w-xl">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8 ">
          <div className="w-12 h-12 mr-2 bg-black rounded-lg flex items-center justify-center">
            <img src="../logo-1.png" />
          </div>
          <span className="text-2xl font-bold text-black">uniXchange</span>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-black mb-3">Create account</h1>
          <p className="text-gray-600">
            a marketplace made for students by students
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-black mb-8"></div>

        {/* Form Fields */}
        <div className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Image Upload */}
            <div>
              <label className="block text-sm font-bold text-black mb-2">
                Profile Image (Optional)
              </label>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-gray-200 rounded-full border-2 border-black flex items-center justify-center">
                  <User className="h-8 w-8 text-gray-400" />
                </div>
                <button className="px-4 py-2 border-2 border-black rounded-lg font-bold hover:bg-gray-100 transition-colors flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Upload Photo
                </button>
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-sm font-bold text-black mb-2">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-4 border-2 border-black rounded-lg focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-black mb-2">
                Email *
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="your@college.edu.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-4 border-2 border-black rounded-lg focus:outline-none transition-all"
                />
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-teal-500" />
              </div>
            </div>

            {/* Contact Number */}
            <div>
              <label className="block text-sm font-bold text-black mb-2">
                Contact Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="tel"
                  placeholder="9876543210"
                  maxLength="10"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-4 border-2 border-black rounded-lg focus:outline-none transition-all"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                10-digit mobile number
              </p>
            </div>

            {/* College */}
            <div>
              <label className="block text-sm font-bold text-black mb-2">
                College *
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="e.g., IIT Landran"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-4 border-2 border-black rounded-lg focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Hostel */}
            <div>
              <label className="block text-sm font-bold text-black mb-2">
                Hostel (Optional)
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="e.g., Kalpana Hostel"
                  value={hostel}
                  onChange={(e) => setHostel(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-4 border-2 border-black rounded-lg focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-bold text-black mb-2">
                Password *
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-4 border-2 border-black rounded-lg focus:outline-none transition-all"
              />
              <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-bold text-black mb-2">
                Confirm Password *
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={cnfrnPass}
                onChange={(e) => setCnfrnPass(e.target.value)}
                required
                className="w-full px-4 py-4 border-2 border-black rounded-lg focus:outline-none transition-all"
              />
            </div>

            {/* Terms Checkbox */}
            <label className="flex items-start cursor-pointer">
              <input
                type="checkbox"
                required
                className="w-5 h-5 border-2 border-gray-300 rounded mt-0.5"
              />
              <span className="ml-3 text-sm text-gray-600">
                I agree to the{" "}
                <span className="font-bold text-black">Terms & Conditions</span>{" "}
                and <span className="font-bold text-black">Privacy Policy</span>
              </span>
            </label>

            {/* Sign Up Button */}
            <button className="w-full py-4 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition-colors text-lg">
              Sign Up
            </button>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button className="py-4 border-2 border-black rounded-lg font-bold hover:bg-gray-50 transition-colors">
                Google
              </button>
              <button className="py-4 border-2 border-black rounded-lg font-bold hover:bg-gray-50 transition-colors">
                GitHub
              </button>
            </div>

            {/* Login Link */}
            <p className="text-center text-gray-600 mt-6">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold text-black hover:underline"
              >
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
