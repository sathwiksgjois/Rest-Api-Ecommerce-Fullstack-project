import { useState } from "react";
import { useCart } from "../context/CartContext";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, MapPin, Phone, CreditCard, ArrowRight, Shield, Truck, Lock, CheckCircle } from "lucide-react";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState(null);
  
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = totalPrice > 999 ? 0 : 99;
  const tax = totalPrice * 0.18;
  const grandTotal = totalPrice + shipping + tax;

  const handlePlaceOrder = async () => {
    if (!address.trim() || !phone.trim()) {
      // Use a more subtle notification instead of alert
      const errorDiv = document.createElement("div");
      errorDiv.className = "fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg z-50";
      errorDiv.innerHTML = `
        <div class="flex items-center">
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
          </svg>
          <span>Please enter shipping address and phone number</span>
        </div>
      `;
      document.body.appendChild(errorDiv);
      setTimeout(() => errorDiv.remove(), 3000);
      return;
    }

    if (phone.trim().length !== 10 || !/^\d+$/.test(phone.trim())) {
      const errorDiv = document.createElement("div");
      errorDiv.className = "fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg z-50";
      errorDiv.innerHTML = `
        <div class="flex items-center">
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
          </svg>
          <span>Please enter a valid 10-digit phone number</span>
        </div>
      `;
      document.body.appendChild(errorDiv);
      setTimeout(() => errorDiv.remove(), 3000);
      return;
    }

    try {
      setLoading(true);

      const payload = {
        shipping_address: address,
        phone: phone.trim(),
        items_write: cart.map(item => ({
          product_id: item.product.id,
          quantity: item.quantity,
        })),
      };

      const res = await axios.post("/orders/", payload);
      console.log("Order response:", res);

      if (res.status === 201) {
        setOrderId(res.data.id);
        setOrderSuccess(true);
        
        // Show success animation for 1.5 seconds before navigating
        setTimeout(() => {
          clearCart();
          navigate(`/order-confirmation/${res.data.id}`);
        }, 1500);
      }
    } catch (err) {
      console.error(err);
      const errorDiv = document.createElement("div");
      errorDiv.className = "fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg z-50";
      errorDiv.innerHTML = `
        <div class="flex items-center">
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
          </svg>
          <span>Order failed: ${err.response?.data?.detail || "Please try again"}</span>
        </div>
      `;
      document.body.appendChild(errorDiv);
      setTimeout(() => errorDiv.remove(), 3000);
    } finally {
      setLoading(false);
    }
  };

  // Success overlay
  if (orderSuccess) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-3xl p-8 max-w-md mx-4 text-center animate-fade-in">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600 animate-scale" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Successful!</h2>
          <p className="text-gray-600 mb-6">
            Your order #{orderId} has been placed successfully.
          </p>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          </div>
          <p className="text-sm text-gray-500 mt-4">Redirecting to order details...</p>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="pt-48 min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
        <div className="text-center p-8 bg-white rounded-3xl shadow-2xl max-w-md">
          <ShoppingBag className="w-20 h-20 text-gray-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add items to your cart to checkout.</p>
          <button
            onClick={() => navigate("/products")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 w-full"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 min-h-screen bg-gradient-to-b from-gray-50 to-white p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Checkout</h1>
          <p className="text-gray-600">Complete your purchase in just a few steps</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center max-w-2xl mx-auto">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                1
              </div>
              <div className="ml-3">
                <p className="font-semibold text-gray-800">Cart</p>
                <p className="text-sm text-gray-600">Review items</p>
              </div>
            </div>
            
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-4"></div>
            
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                2
              </div>
              <div className="ml-3">
                <p className="font-semibold text-gray-800">Details</p>
                <p className="text-sm text-gray-600">Shipping & Payment</p>
              </div>
            </div>
            
            <div className="w-24 h-1 bg-gray-300 mx-4"></div>
            
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold">
                3
              </div>
              <div className="ml-3">
                <p className="font-semibold text-gray-600">Confirmation</p>
                <p className="text-sm text-gray-500">Review & pay</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Order Summary & Shipping */}
          <div className="lg:col-span-2 space-y-8">
            {/* Cart Summary */}
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
                <h3 className="text-xl font-bold text-gray-800 flex items-center">
                  <ShoppingBag className="w-6 h-6 mr-3 text-blue-600" />
                  Order Summary
                </h3>
              </div>
              <div className="divide-y divide-gray-100">
                {cart.map(item => (
                  <div
                    key={item.product.id}
                    className="p-6 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800 text-lg">
                          {item.product.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity} × ₹{item.product.price}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg text-gray-800">
                          ₹ {(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Details */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="flex items-center mb-8">
                <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-3 rounded-2xl mr-4">
                  <MapPin className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">Shipping Details</h3>
                  <p className="text-gray-600">Where should we deliver your order?</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block font-semibold text-gray-700 mb-3 text-lg">
                    Shipping Address
                  </label>
                  <textarea
                    rows="4"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    className="w-full border-2 border-gray-300 rounded-2xl p-5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-lg"
                    placeholder="Enter your complete shipping address including house number, street, city, and pincode"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-3 text-lg flex items-center">
                    <Phone className="w-5 h-5 mr-2" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full border-2 border-gray-300 rounded-2xl p-5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-lg"
                    placeholder="Enter your 10-digit mobile number"
                    maxLength="10"
                  />
                </div>

                {/* Payment Method */}
                <div>
                  <label className="block font-semibold text-gray-700 mb-3 text-lg flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Payment Method
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      onClick={() => setPaymentMethod("cod")}
                      className={`p-6 border-2 rounded-2xl text-left transition-all ${paymentMethod === "cod" ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"}`}
                    >
                      <div className="flex items-center">
                        <div className={`w-5 h-5 rounded-full border-2 mr-3 ${paymentMethod === "cod" ? "border-blue-500 bg-blue-500" : "border-gray-400"}`}>
                          {paymentMethod === "cod" && <div className="w-2 h-2 bg-white rounded-full m-auto"></div>}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">Cash on Delivery</p>
                          <p className="text-sm text-gray-600">Pay when you receive</p>
                        </div>
                      </div>
                    </button>
                    
                    <button
                      onClick={() => setPaymentMethod("online")}
                      className={`p-6 border-2 rounded-2xl text-left transition-all ${paymentMethod === "online" ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"}`}
                    >
                      <div className="flex items-center">
                        <div className={`w-5 h-5 rounded-full border-2 mr-3 ${paymentMethod === "online" ? "border-blue-500 bg-blue-500" : "border-gray-400"}`}>
                          {paymentMethod === "online" && <div className="w-2 h-2 bg-white rounded-full m-auto"></div>}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">Online Payment</p>
                          <p className="text-sm text-gray-600">Card, UPI, Net Banking</p>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary & Actions */}
          <div className="space-y-8">
            {/* Order Total */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-8">Order Total</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">₹ {totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Shipping</span>
                  <span className={`font-semibold ${shipping === 0 ? 'text-green-600' : ''}`}>
                    {shipping === 0 ? 'FREE' : `₹ ${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Tax (18%)</span>
                  <span className="font-semibold">₹ {tax.toFixed(2)}</span>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-2xl font-bold text-gray-800">
                    <span>Total Amount</span>
                    <span>₹ {grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Security Badge */}
              <div className="mb-8 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                <div className="flex items-center">
                  <Shield className="w-6 h-6 text-green-600 mr-3" />
                  <div>
                    <p className="font-semibold text-gray-800">Secure Payment</p>
                    <p className="text-sm text-gray-600">Your information is protected</p>
                  </div>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                onClick={handlePlaceOrder}
                disabled={loading || !address.trim() || !phone.trim() || phone.trim().length !== 10}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-5 rounded-2xl font-bold text-lg hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center group"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-3"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    Place Order
                    <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform" />
                  </>
                )}
              </button>
              
              <p className="text-center text-sm text-gray-500 mt-4">
                By placing your order, you agree to our Terms of Service & Privacy Policy
              </p>
            </div>

            {/* Trust Section */}
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-blue-600" />
                  <span className="text-sm">Free shipping on orders above ₹999</span>
                </div>
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-green-600" />
                  <span className="text-sm">Secure SSL encrypted checkout</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-purple-600" />
                  <span className="text-sm">30-day return policy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add these styles for animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes scale {
          from { transform: scale(0); }
          to { transform: scale(1); }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scale {
          animation: scale 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}