import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "../utils/axios";
import { User, Mail, Calendar, MapPin, Edit, Save, X } from "lucide-react";

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    phone: "",
    address: ""
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        phone: user.phone || "",
        address: user.address || ""
      });
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("/orders/");
      setOrders(res.data.slice(0, 5));
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const res = await axios.put("/users/profile/", formData);
      updateUser(res.data);
      setEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="pt-28 min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Profile Card */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center">
                <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                  <User size={64} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">{user?.username}</h2>
                <p className="text-blue-100">{user?.email}</p>
              </div>

              {/* Profile Info */}
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-800">Profile Information</h3>
                  <button
                    onClick={() => editing ? setEditing(false) : setEditing(true)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    {editing ? <X size={20} /> : <Edit size={20} />}
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Username</label>
                    {editing ? (
                      <input
                        type="text"
                        value={formData.username}
                        onChange={(e) => setFormData({...formData, username: e.target.value})}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3"
                      />
                    ) : (
                      <p className="font-medium">{user?.username}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Email</label>
                    <div className="flex items-center gap-2">
                      <Mail size={16} className="text-gray-400" />
                      <p className="font-medium">{user?.email}</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Member Since</label>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-gray-400" />
                      <p className="font-medium">January 2024</p>
                    </div>
                  </div>

                  {editing && (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">First Name</label>
                          <input
                            type="text"
                            value={formData.first_name}
                            onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                            className="w-full border border-gray-300 rounded-xl px-4 py-3"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">Last Name</label>
                          <input
                            type="text"
                            value={formData.last_name}
                            onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                            className="w-full border border-gray-300 rounded-xl px-4 py-3"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Phone</label>
                        <input
                          type="text"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="w-full border border-gray-300 rounded-xl px-4 py-3"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Address</label>
                        <textarea
                          value={formData.address}
                          onChange={(e) => setFormData({...formData, address: e.target.value})}
                          className="w-full border border-gray-300 rounded-xl px-4 py-3"
                          rows="3"
                        />
                      </div>
                    </>
                  )}
                </div>

                {editing && (
                  <button
                    onClick={handleSave}
                    className="w-full mt-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-bold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    <Save size={20} />
                    Save Changes
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold text-gray-800">Recent Orders</h3>
                <button className="text-blue-600 hover:text-blue-800 font-medium">
                  View All
                </button>
              </div>

              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
                </div>
              ) : orders.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">🛒</div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">No orders yet</h4>
                  <p className="text-gray-600">Start shopping to see your orders here</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-bold text-gray-800 text-lg">Order #{order.id}</h4>
                          <p className="text-sm text-gray-600">{new Date(order.created_at).toLocaleDateString()}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          order.status === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                          order.status === 'PROCESSING' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status || 'Processing'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-gray-700">{order.items?.length || 0} items</p>
                          <div className="flex items-center gap-2 mt-2">
                            <MapPin size={16} className="text-gray-400" />
                            <p className="text-sm text-gray-600">{order.shipping_address?.substring(0, 40)}...</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-800">₹ {order.total_amount}</p>
                          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-2">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}