import React, { useState } from "react";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../src/contexts/AuthContext";
import { getAvatar } from "../src/utils/avatar";

function Navbar() {
  const { user, logoutUser } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="border-b-2 border-black bg-white sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <Link to="/">
            <div className="flex items-center cursor-pointer">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center">
                <img src="/logo-1.png" alt="logo" />
              </div>
              <span className="ml-2 sm:ml-3 text-xl sm:text-2xl font-bold text-black">
                uniXchange
              </span>
            </div>
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden flex items-center text-black"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Menu for Desktop and Mobile */}
          <div
            className={`flex items-center gap-2 sm:gap-4 ${
              menuOpen ? "flex-col sm:flex-row absolute sm:relative bg-white top-16 left-0 w-full sm:w-auto sm:top-0 sm:bg-transparent sm:flex"
              : "hidden sm:flex"
            }`}
          >
            {user && (
              <>
                <Link to="/wishlist">
                  <button className="px-3 py-3 text-black font-bold hover:bg-gray-100 rounded-lg">
                    <Heart />
                  </button>
                </Link>

                <Link to="/chats">
                  <button className="px-3 py-3 text-black font-bold hover:bg-gray-100 rounded-lg">
                    CHATS
                  </button>
                </Link>

                <Link to="/listing">
                  <button className="px-3 py-3 text-black font-bold hover:bg-gray-100 rounded-lg">
                    SELL
                  </button>
                </Link>
              </>
            )}

            {/* If User is not logged in */}
            {!user ? (
              <Link to="/login">
                <button className="px-3 py-3 bg-pink-600 text-white font-bold rounded-lg hover:bg-pink-700">
                  LOG IN
                </button>
              </Link>
            ) : (
              <>
                <Link to="/dashboard">
                  <img
                    src={getAvatar(user?.name || user?.email || "User")}
                    alt="avatar"
                    className="w-10 h-10 rounded-full border-2 border-black object-cover cursor-pointer"
                  />
                </Link>

                {/* Optional Logout Button */}
                {/* <button
                  onClick={logoutUser}
                  className="px-3 py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-800"
                >
                  LOG OUT
                </button> */}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
