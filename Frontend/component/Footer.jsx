import React from 'react'

function Footer() {
  return (
     <footer className="border-t-2 border-black py-12 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-4 gap-8">
            <div>
              <h3 className="font-black text-black mb-4">About</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-black font-medium">About us</a></li>
                <li><a href="#" className="hover:text-black font-medium">How it works</a></li>
                <li><a href="#" className="hover:text-black font-medium">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-black text-black mb-4">Support</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-black font-medium">Help center</a></li>
                <li><a href="#" className="hover:text-black font-medium">Safety</a></li>
                <li><a href="#" className="hover:text-black font-medium">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-black text-black mb-4">Community</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-black font-medium">Blog</a></li>
                <li><a href="#" className="hover:text-black font-medium">Stories</a></li>
                <li><a href="#" className="hover:text-black font-medium">Forum</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-black text-black mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-black font-medium">Terms</a></li>
                <li><a href="#" className="hover:text-black font-medium">Privacy</a></li>
                <li><a href="#" className="hover:text-black font-medium">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t-2 border-black mt-8 pt-8 text-center">
            <p className="text-black font-bold">❤️ made for students by student</p>
          </div>
        </div>
      </footer>
  )
}

export default Footer