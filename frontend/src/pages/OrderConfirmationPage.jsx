import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle, Home } from "lucide-react";
import axios from "../utils/axios";

export default function OrderConfirmationPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      const res = await axios.get(`/orders/${orderId}/`);
      setOrder(res.data);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to safely format amounts
  const formatAmount = (amount) => {
    if (amount === null || amount === undefined) return "0.00";
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    return isNaN(num) ? "0.00" : num.toFixed(2);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Order not found</h2>
          <p className="text-gray-600 mb-6">We couldn't find your order details.</p>
          <Link
            to="/account/orders"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            View All Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600">
            Your order <span className="font-semibold">#{order.id || order.order_id}</span> has been placed successfully.
          </p>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Order Details</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Order Number</span>
              <span className="font-semibold">#{order.id || order.order_id}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Date</span>
              <span>{order.created_at ? new Date(order.created_at).toLocaleDateString() : "Today"}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Status</span>
              <span className="font-semibold capitalize">{order.status || "processing"}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Payment</span>
              <span className="capitalize">{order.payment_method === "cod" ? "Cash on Delivery" : "Online Payment"}</span>
            </div>
            
            <div className="flex justify-between text-lg font-bold pt-4 border-t">
              <span>Total</span>
              <span>₹{formatAmount(order.total_amount)}</span>
            </div>
          </div>
        </div>

        {/* Shipping Info */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Shipping Address</h2>
          <p className="text-gray-600 whitespace-pre-line">{order.shipping_address || "Address not provided"}</p>
          {order.phone && (
            <p className="text-gray-600 mt-2">Phone: {order.phone}</p>
          )}
        </div>

        {/* Order Items */}
        {order.items && order.items.length > 0 && (
          <div className="bg-white rounded-xl shadow p-6 mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Items ({order.items.length})</h2>
            <div className="space-y-3">
              {order.items.map(item => (
                <div key={item.id || item.product_id} className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium">{item.product?.name || "Product"}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity || 1} × ₹{formatAmount(item.product?.price)}
                    </p>
                  </div>
                  <p className="font-semibold">
                    ₹{formatAmount((item.product?.price || 0) * (item.quantity || 1))}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/products"
            className="flex-1 bg-gray-900 text-white text-center py-3 px-6 rounded-lg font-semibold hover:bg-gray-800"
          >
            Continue Shopping
          </Link>
          <Link
            to="/orders"
            className="flex-1 border border-gray-300 text-gray-700 text-center py-3 px-6 rounded-lg font-semibold hover:bg-gray-50"
          >
            View Orders
          </Link>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          A confirmation email has been sent. Need help?{" "}
          <Link to="/support" className="text-blue-600 hover:text-blue-700">
            Contact Support
          </Link>
        </p>
      </div>
    </div>
  );
}