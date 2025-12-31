import React, { useEffect, useState } from "react";
import { getAvatar } from "../src/utils/avatar";
import {
  Mail,
  Phone,
  MapPin,
  Package,
  Star,
  LogOut,
  Edit,
  Trash2,
  Plus,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import Navbar from "../component/Navbar";
import axios from "../src/api/axios";
import { useAuth } from "../src/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const [myListings, setMyListings] = useState([]);
  const [loadingListings, setLoadingListings] = useState(true);

  useEffect(() => {
    const fetchMyListings = async () => {
      try {
        const res = await axios.get("/api/products/user/my-products");
        setMyListings(res.data.data || []);
      } catch (err) {
        console.error("Failed to fetch listings", err);
      } finally {
        setLoadingListings(false);
      }
    };
    fetchMyListings();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this listing?")) return;
    try {
      await axios.delete(`/api/products/${id}`);
      setMyListings((prev) => prev.filter((item) => item._id !== id));
    } catch {
      alert("Failed to delete listing");
    }
  };

  const totalListed = myListings.length;
  const totalSold = myListings.filter((p) => p.status === "sold").length;
  const moneyEarned = myListings
    .filter((p) => p.status === "sold")
    .reduce((sum, p) => sum + p.price, 0);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="px-4 sm:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-80 space-y-6 lg:sticky lg:top-20">
            <div className="border-2 border-black rounded-2xl p-6">
              <div className="text-center mb-6">
                <img
                  src={getAvatar(user?.name || user?.email || "User")}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-black mx-auto mb-4"
                  alt="avatar"
                />
                <h2 className="text-xl font-bold">{user?.name || "User"}</h2>

                <button
                  onClick={logoutUser}
                  className="w-full mt-4 flex justify-center items-center gap-2 bg-black text-white py-3 rounded-lg font-bold"
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </button>
              </div>

              <div className="space-y-3 text-sm">
                <Info icon={<MapPin />} label="College & Hostel">
                  {user?.college || "College"}, {user?.hostel || "Hostel"}
                </Info>
                <Info icon={<Phone />} label="Contact">
                  {user?.contact || "Not provided"}
                </Info>
                <Info icon={<Mail />} label="Email">
                  {user?.email}
                </Info>
              </div>
            </div>

            <div className="border-2 border-black rounded-2xl p-6">
              <h3 className="font-bold mb-4">Statistics</h3>
              <div className="space-y-4">
                <Stat label="Total Listed" value={totalListed} icon={<Package />} />
                <Stat label="Total Sold" value={totalSold} icon={<TrendingUp />} />
                <Stat
                  label="Money Earned"
                  value={`₹${moneyEarned}`}
                  icon={<DollarSign />}
                />
                <Stat
                  label="Rating"
                  value="4.8"
                  icon={<Star className="text-yellow-500 fill-yellow-500" />}
                />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-10">
            {/* My Listings */}
            <div className="border-2 border-black rounded-2xl p-6 bg-gray-50">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                <h2 className="text-xl md:text-2xl font-black">My Listings</h2>
                <button
                  onClick={() => navigate("/listing")}
                  className="flex items-center justify-center gap-2 bg-black text-white px-4 py-2 rounded-lg w-full sm:w-auto"
                >
                  <Plus className="h-5 w-5" />
                  Add New
                </button>
              </div>

              {loadingListings ? (
                <p>Loading listings...</p>
              ) : myListings.length === 0 ? (
                <p>No listings yet</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {myListings.map((product) => (
                    <div
                      key={product._id}
                      className="border-2 border-black rounded-xl p-4 bg-white"
                    >
                      <div className="h-40 bg-gray-200 rounded-lg mb-4 overflow-hidden">
                        {product.images?.[0] && (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>

                      <h3 className="font-bold">{product.name}</h3>
                      <p className="text-gray-600">₹{product.price}</p>

                      <div className="flex justify-between mt-4">
                        <button className="flex items-center gap-1 text-yellow-600 font-semibold">
                          <Edit className="h-4 w-4" /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="flex items-center gap-1 text-red-600 font-semibold"
                        >
                          <Trash2 className="h-4 w-4" /> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            
            <div className="border-2 border-black rounded-2xl p-6 bg-white">
              <h2 className="text-2xl font-black mb-6">Bought Items</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <h2>No Bought Products Found</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



const Info = ({ icon, label, children }) => (
  <div className="flex items-start gap-3">
    <span className="h-5 w-5 text-gray-600">{icon}</span>
    <div>
      <p className="text-gray-600">{label}</p>
      <p className="font-bold">{children}</p>
    </div>
  </div>
);

const Stat = ({ label, value, icon }) => (
  <div>
    <div className="flex justify-between items-center mb-1">
      <span className="text-sm text-gray-600">{label}</span>
      <span className="h-4 w-4">{icon}</span>
    </div>
    <p className="text-xl sm:text-2xl font-black">{value}</p>
  </div>
);

export default Dashboard;
