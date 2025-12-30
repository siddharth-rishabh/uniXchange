import React from 'react'
import { Route, Routes } from "react-router-dom";
import Homepage from '../pages/Homepage';
import Dashboard from '../pages/Dashboard';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import Product from '../pages/Product';
import ProductFeed from '../pages/ProductFeed';
import Listing from '../pages/Listing';
import Chats from '../pages/Chats';
import Wishlist from '../pages/Wishlist';
import Loader from '../component/Loader';
import { useAuth } from "./contexts/AuthContext";
import ComingSoon from '../pages/ComingSoon';



function App() {
  const { loading } = useAuth();
  if (loading) return <Loader/>;
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path='/product/:id' element={<Product />}/>
        <Route path='/products' element={<ProductFeed />}/>
        <Route path='/products/:category' element={<ProductFeed />}/>
        <Route path='/listing' element={<Listing />}/>
        <Route path='/chats' element={<ComingSoon />}/>
        <Route path='/wishlist' element={<ComingSoon />}/>
        <Route path='/comingsoon' element={<ComingSoon />}/>
      </Routes>
    </div>
  )
}

export default App