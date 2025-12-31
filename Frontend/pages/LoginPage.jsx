import React, { useState } from "react";
import { Mail, Lock, Eye } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../src/Firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCred.user.getIdToken();
      localStorage.setItem("token", token);


      alert("Login Successful");
      navigate('/');
    } catch (e) {
      alert("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black">
      <div className="min-h-screen bg-white w-full flex items-center justify-center p-12">
        <div className="w-full max-w-md">
       
          <div className="flex items-center justify-center mb-6 md:mb-8">
            <div className="w-10 h-10 md:w-12 md:h-12  rounded-lg flex items-center justify-center">
              <img src="../logo-1.png" />
            </div>
            <span className="ml-3 text-xl md:text-2xl font-bold text-black">
              uniXchange
            </span>
          </div>

          {/* Header */}
          <div className="mb-8 ">
            <h1 className="text-4xl flex justify-center font-black text-black mb-2">
              Welcome back
            </h1>
            <p className="text-gray-600 flex justify-center">
              a marketplace made for students by students
            </p>
            <br />
            <hr />
          </div>

          {/* Form Fields */}

          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-bold text-black mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="your@college.edu.in"
                    value={email}
                    autoComplete="username"
                    onChange={(e)=>setEmail(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3 md:py-4 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 transition-all"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-bold text-black mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    placeholder="********"
                    value={password}
                    autoComplete="current-password"
                    required
                    onChange={(e)=>setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 transition-all"
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                </div>
              </div>
              {/* Remember & Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 border-2 border-black rounded"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Remember me
                  </span>
                </label>
                <a
                  href="#"
                  className="text-sm font-bold text-black hover:text-pink-600 transition-colors"
                >
                  Forgot password?
                </a>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full py-3 md:py-4 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition-colors"
              >
                Log In
              </button>
            </form>
            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4">
              <button className="py-3 border-2 border-black rounded-lg font-bold hover:bg-gray-100 transition-colors">
                Google
              </button>
              <button className="py-3 border-2 border-black rounded-lg font-bold hover:bg-gray-100 transition-colors">
                GitHub
              </button>
            </div>

            {/* Sign Up Link */}
            <p className="text-center text-gray-600">
              Don't have an account?{" "}
             <Link to="/signup">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
