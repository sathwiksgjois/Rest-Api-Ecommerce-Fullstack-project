import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import OrderTimeline from "../components/orders/OrderTimeline";
import downloadInvoice from "../components/Invoice";
import { Package, MapPin, Phone, Download, XCircle, Calendar, Truck, Home, ChevronLeft, Printer, Share2, CheckCircle } from "lucide-react";

export default function OrderDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`/orders/${id}/`);
        setOrder(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load order");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const handleCancelOrder = async () => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?\nThis action cannot be undone."
    );
    if (!confirmCancel) return;

    setCancelling(true);
    try {
      // Call the cancel API endpoint
      await axios.post(`/orders/${order.id}/cancel/`);
      
      // Update local state
      setOrder(prev => ({ ...prev, status: "CANCELLED" }));
      
      // Show success message
      setShowSuccess(true);
      
      // Hide success message after 3 seconds and redirect
      setTimeout(() => {
        setShowSuccess(false);
        navigate("/orders");
      }, 3000);
      
    } catch (err) {
      console.error("Cancel error:", err);
      if (err.response?.status === 400) {
        alert(err.response.data.detail || "Order cannot be cancelled at this stage");
      } else if (err.response?.status === 404) {
        alert("Order not found");
      } else {
        alert("Failed to cancel order. Please try again.");
      }
    } finally {
      setCancelling(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Order #${order.id}`,
        text: `Check out my order #${order.id} from ShopEase`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="pt-40 min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="pt-40 min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
        <div className="text-center p-8 bg-white rounded-3xl shadow-2xl max-w-md">
          <XCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Not Found</h2>
          <p className="text-gray-600 mb-8">The order you're looking for doesn't exist or has been removed.</p>
          <Link
            to="/orders"
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300"
          >
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  const statusColors = {
    PLACED: { bg: "bg-blue-100", text: "text-blue-800", icon: "🕒" },
    PROCESSING: { bg: "bg-yellow-100", text: "text-yellow-800", icon: "⚙️" },
    SHIPPED: { bg: "bg-purple-100", text: "text-purple-800", icon: "🚚" },
    DELIVERED: { bg: "bg-green-100", text: "text-green-800", icon: "✅" },
    CANCELLED: { bg: "bg-red-100", text: "text-red-800", icon: "❌" }
  };

  const statusInfo = statusColors[order.status] || { bg: "bg-gray-100", text: "text-gray-800", icon: "📦" };

  return (
    <div className="pt-32 min-h-screen bg-gradient-to-b from-gray-50 to-white p-4">
      {/* Success Message Popup */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md animate-in zoom-in duration-300">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Order Cancelled Successfully!</h3>
              <p className="text-gray-600 mb-6">
                Order #{order.id} has been cancelled. You will be redirected to your orders page.
              </p>
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-600"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            to="/orders"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Orders
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white shadow-2xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
                  <Package className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold">
                    Order #{order.id}
                  </h2>
                  <div className="flex items-center text-blue-100 mt-2">
                    <Calendar className="w-4 h-4 mr-2" />
                    <p className="text-sm">
                      Placed on {new Date(order.created_at).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className={`px-6 py-3 rounded-full font-bold text-lg ${statusInfo.bg} ${statusInfo.text}`}>
                <span className="mr-2">{statusInfo.icon}</span>
                {order.status}
              </div>
              <button
                onClick={handleShare}
                className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl hover:bg-white/30 transition-colors"
                title="Share order"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Timeline & Items */}
          <div className="lg:col-span-2 space-y-8">
            {/* Timeline */}
            {order.status !== "CANCELLED" && order.status !== "DELIVERED" && (
              <div className="bg-white rounded-3xl shadow-xl p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-8 flex items-center">
                  <div className="w-3 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mr-4"></div>
                  Order Progress
                </h3>
                <OrderTimeline status={order.status} />
              </div>
            )}

            {/* Items */}
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="p-8 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100">
                <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                  <Package className="w-6 h-6 mr-4 text-blue-600" />
                  Order Items
                </h3>
              </div>
              <div className="divide-y divide-gray-100">
                {order.items.map(item => (
                  <div
                    key={item.id}
                    className="p-8 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-start gap-4">
                          <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center">
                            <Package className="w-8 h-8 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800 text-xl mb-2">
                              {item.product.name}
                            </p>
                            <div className="flex items-center gap-4">
                              <p className="text-sm text-gray-500">
                                Quantity: <span className="font-bold text-gray-800">{item.quantity}</span>
                              </p>
                              <p className="text-sm text-gray-500">
                                Price: <span className="font-bold text-gray-800">₹{item.price}</span> each
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-2xl text-gray-800">
                          ₹ {(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-8 bg-gradient-to-r from-gray-50 to-gray-100 border-t">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600">Total Amount</p>
                    <p className="text-3xl font-bold text-gray-800">₹ {order.total_amount}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Items: {order.items.length}</p>
                    <p className="text-sm text-green-600 font-semibold">Payment: Completed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Shipping & Actions */}
          <div className="space-y-8">
            {/* Shipping Info */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="flex items-center mb-8">
                <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-3 rounded-2xl mr-4">
                  <Home className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">Shipping Details</h3>
                  <p className="text-gray-600">Delivery information</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="p-6 bg-gray-50 rounded-2xl">
                  <div className="flex items-start mb-4">
                    <MapPin className="w-5 h-5 text-blue-600 mr-3 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-800 mb-2">Delivery Address</p>
                      <p className="text-gray-800 whitespace-pre-line leading-relaxed">
                        {order.shipping_address}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-gray-50 rounded-2xl">
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-blue-600 mr-3" />
                    <div>
                      <p className="font-semibold text-gray-800 mb-1">Contact Number</p>
                      <p className="text-gray-800 text-2xl font-bold">
                        {order.phone}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200">
                  <div className="flex items-center">
                    <Truck className="w-5 h-5 text-blue-600 mr-3" />
                    <div>
                      <p className="font-semibold text-gray-800 mb-1">Delivery Status</p>
                      <p className="text-gray-600">Expected delivery within 5-7 business days</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-8">Order Actions</h3>
              <div className="space-y-4">
                {/* Cancel Order Button - Show only for PLACED or PROCESSING orders */}
                {(order.status === "PLACED" || order.status === "PROCESSING") && (
                  <button
                    onClick={handleCancelOrder}
                    disabled={cancelling}
                    className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-4 rounded-2xl font-bold hover:from-red-600 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {cancelling ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-3"></div>
                        Cancelling...
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 mr-2" />
                        Cancel Order
                      </>
                    )}
                  </button>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => downloadInvoice(order.id)}
                    className="bg-gradient-to-r from-gray-800 to-black text-white px-6 py-4 rounded-2xl font-bold hover:from-black hover:to-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Invoice
                  </button>

                  <button
                    onClick={handlePrint}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-2xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
                  >
                    <Printer className="w-5 h-5 mr-2" />
                    Print
                  </button>
                </div>

                <Link
                  to="/products"
                  className="block w-full border-2 border-blue-600 text-blue-600 px-6 py-4 rounded-2xl font-bold hover:bg-blue-50 transition-all duration-300 text-center"
                >
                  Continue Shopping
                </Link>

                <Link
                  to="/orders"
                  className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-2xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl text-center"
                >
                  View All Orders
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}