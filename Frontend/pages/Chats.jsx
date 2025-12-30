import React from 'react';
import { Search, Send, MoreVertical, Image, Paperclip, Smile } from 'lucide-react';
import Navbar from '../component/Navbar';

function Chats() {
  return (
    <div className="min-h-screen bg-white">
        <Navbar/>

      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid grid-cols-3 gap-8 h-[calc(100vh-200px)]">
          {/* Left Sidebar - Conversations List */}
          <div className="col-span-1 border-2 border-black rounded-2xl overflow-hidden flex flex-col">
            {/* Search */}
            <div className="p-4 border-b-2 border-black">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  className="w-full pl-10 pr-4 py-2 border-2 border-black rounded-lg focus:outline-none"
                />
              </div>
            </div>

            {/* Conversations List */}
            <div className="flex-1 overflow-y-auto">
              {[
                { name: 'Sarah Johnson', message: 'Is the MacBook still available?', time: '2m', unread: 2, online: true },
                { name: 'Mike Chen', message: 'Thanks for the quick delivery!', time: '1h', unread: 0, online: false },
                { name: 'Emma Wilson', message: 'Can we meet tomorrow at 3pm?', time: '3h', unread: 1, online: true },
                { name: 'Alex Brown', message: 'What is the lowest price?', time: '5h', unread: 0, online: false },
                { name: 'Lisa Davis', message: 'I am interested in the desk', time: '1d', unread: 0, online: false }
              ].map((chat, idx) => (
                <div
                  key={idx}
                  className={`p-4 border-b-2 border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors ${
                    idx === 0 ? 'bg-gray-100' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                      {chat.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-bold text-black truncate">{chat.name}</h3>
                        <span className="text-xs text-gray-500">{chat.time}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600 truncate">{chat.message}</p>
                        {chat.unread > 0 && (
                          <span className="w-5 h-5 bg-black text-white text-xs rounded-full flex items-center justify-center shrink-0 ml-2">
                            {chat.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Chat Window */}
          <div className="col-span-2 border-2 border-black rounded-2xl overflow-hidden flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b-2 border-black flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h2 className="font-bold text-black">Sarah Johnson</h2>
                  <p className="text-xs text-green-600">Online</p>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <MoreVertical className="h-5 w-5" />
              </button>
            </div>

            {/* Product Context */}
            <div className="p-4 border-b-2 border-gray-200 bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-gray-300 rounded-lg"></div>
                <div className="flex-1">
                  <h3 className="font-bold text-black mb-1">MacBook Pro 13 inch 2020</h3>
                  <p className="text-sm text-gray-600">$850 • Electronics</p>
                </div>
                <button className="px-4 py-2 bg-black text-white text-sm font-bold rounded-lg hover:bg-gray-800 transition-colors">
                  View
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Received Message */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gray-300 rounded-full shrink-0"></div>
                <div>
                  <div className="bg-gray-100 rounded-2xl rounded-tl-none px-4 py-3 max-w-md">
                    <p className="text-black">Hi! Is the MacBook still available?</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 ml-2">10:30 AM</p>
                </div>
              </div>

              {/* Sent Message */}
              <div className="flex items-start gap-3 justify-end">
                <div>
                  <div className="bg-black text-white rounded-2xl rounded-tr-none px-4 py-3 max-w-md">
                    <p>Yes, it is! Are you interested?</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 mr-2 text-right">10:32 AM</p>
                </div>
                <div className="w-8 h-8 bg-gray-300 rounded-full shrink-0"></div>
              </div>

              {/* Received Message */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gray-300 rounded-full shrink-0"></div>
                <div>
                  <div className="bg-gray-100 rounded-2xl rounded-tl-none px-4 py-3 max-w-md">
                    <p className="text-black">Great! Can I come see it today?</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 ml-2">10:33 AM</p>
                </div>
              </div>

              {/* Sent Message */}
              <div className="flex items-start gap-3 justify-end">
                <div>
                  <div className="bg-black text-white rounded-2xl rounded-tr-none px-4 py-3 max-w-md">
                    <p>Sure! I am free after 4 PM. We can meet at the campus library?</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 mr-2 text-right">10:35 AM</p>
                </div>
                <div className="w-8 h-8 bg-gray-300 rounded-full shrink-0"></div>
              </div>

              {/* Received Message */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gray-300 rounded-full shrink-0"></div>
                <div>
                  <div className="bg-gray-100 rounded-2xl rounded-tl-none px-4 py-3 max-w-md">
                    <p className="text-black">Perfect! See you at 4:30 PM then 👍</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 ml-2">10:36 AM</p>
                </div>
              </div>

              {/* Date Separator */}
              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 border-t border-gray-300"></div>
                <span className="text-xs text-gray-500 font-bold">Today</span>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>

              {/* Typing Indicator */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gray-300 rounded-full shrink-0"></div>
                <div className="bg-gray-100 rounded-2xl rounded-tl-none px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 border-t-2 border-black">
              <div className="flex items-center gap-3">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Image className="h-5 w-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Paperclip className="h-5 w-5 text-gray-600" />
                </button>
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-3 border-2 border-black rounded-lg focus:outline-none"
                />
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Smile className="h-5 w-5 text-gray-600" />
                </button>
                <button className="px-6 py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2">
                  <Send className="h-5 w-5" />
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chats