import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../utils/axios";
import { Package, Truck, CheckCircle, XCircle, Clock, Search } from "lucide-react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("/orders/");
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'DELIVERED': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'SHIPPED': return <Truck className="w-5 h-5 text-blue-500" />;
      case 'CANCELLED': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <Clock className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'DELIVERED': return 'bg-green-100 text-green-800';
      case 'SHIPPED': return 'bg-blue-100 text-blue-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status === filter);

  return (
    <div className="pt-28 min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">My Orders</h1>
          <p className="text-gray-600">Track and manage all your orders in one place</p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${filter === 'all' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            >
              All Orders ({orders.length})
            </button>
            <button
              onClick={() => setFilter("PLACED")}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${filter === 'PLACED' ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            >
              Processing
            </button>
            <button
              onClick={() => setFilter("SHIPPED")}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${filter === 'SHIPPED' ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            >
              Shipped
            </button>
            <button
              onClick={() => setFilter("DELIVERED")}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${filter === 'DELIVERED' ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            >
              Delivered
            </button>
            <button
              onClick={() => setFilter("CANCELLED")}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${filter === 'CANCELLED' ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            >
              Cancelled
            </button>
          </div>
        </div>

        {/* Orders List */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search size={48} className="text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">No orders found</h3>
            <p className="text-gray-600 mb-8">
              {filter === 'all' 
                ? "You haven't placed any orders yet"
                : `You don't have any ${filter.toLowerCase()} orders`
              }
            </p>
            <Link
              to="/products"
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <Link
                key={order.id}
                to={`/orders/${order.id}`}
                className="block bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="p-8">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-3 rounded-2xl">
                        <Package size={24} className="text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">Order #{order.id}</h3>
                        <p className="text-gray-600">
                          Placed on {new Date(order.created_at).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusIcon(order.status)}
                      <span className={`px-4 py-2 rounded-full font-semibold ${getStatusColor(order.status)}`}>
                        {order.status || 'Processing'}
                      </span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Items</p>
                      <p className="font-semibold">{order.items?.length || 0} items</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                      <p className="text-2xl font-bold text-gray-800">₹ {order.total_amount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Payment</p>
                      <p className="font-semibold text-green-600">Paid</p>
                    </div>
                  </div>

                  {/* Items Preview */}
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <p className="text-sm text-gray-600 mb-3">Items in this order:</p>
                    <div className="flex gap-2">
                      {order.items?.slice(0, 3).map((item, index) => (
                        <div key={index} className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-200 to-purple-200 rounded"></div>
                          <span className="text-sm font-medium">{item.product?.name}</span>
                          <span className="text-sm text-gray-500">×{item.quantity}</span>
                        </div>
                      ))}
                      {order.items?.length > 3 && (
                        <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-xl">
                          <span className="text-sm font-bold text-gray-600">+{order.items.length - 3}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-100 flex justify-end">
                    <span className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2">
                      View Details
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}