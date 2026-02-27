import { useCart } from "../context/CartContext";
import CartItem from "../components/cart/CartItem";
import { ShoppingBag, ArrowRight, Truck, Shield, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";

export default function CartPage() {
  const { cart, clearCart } = useCart();

  const totalPrice = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = totalPrice > 999 ? 0 : 99;
  const tax = totalPrice * 0.18;
  const grandTotal = totalPrice + shipping + tax;

  if (!cart || cart.length === 0) {
    return (
      <div className="pt-28 min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center p-12 bg-white rounded-3xl shadow-2xl max-w-lg">
          <div className="w-32 h-32 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <ShoppingBag size={64} className="text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Your cart is empty 🛒</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link
            to="/products"
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">{cart.length} items in your cart</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}

            {/* Cart Actions */}
            <div className="bg-white rounded-3xl shadow-lg p-6">
              <div className="flex gap-4">
                <button
                  onClick={clearCart}
                  className="flex-1 border-2 border-gray-300 text-gray-700 py-4 rounded-xl font-bold hover:bg-gray-50 transition-colors"
                >
                  Clear Cart
                </button>
                <Link
                  to="/products"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl text-center"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-xl p-8 sticky top-32">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h3>
              
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
                    <span>Total</span>
                    <span>₹ {grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
                  <Truck size={20} className="text-green-600" />
                  <span className="text-sm">Free shipping on orders above ₹999</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                  <Shield size={20} className="text-blue-600" />
                  <span className="text-sm">Secure SSL encryption</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl">
                  <CreditCard size={20} className="text-purple-600" />
                  <span className="text-sm">Multiple payment options</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="block w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-5 rounded-2xl font-bold text-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-xl hover:shadow-2xl text-center"
              >
                <span className="flex items-center justify-center gap-3">
                  Proceed to Checkout
                  <ArrowRight size={20} />
                </span>
              </Link>

              <p className="text-center text-sm text-gray-500 mt-4">
                By placing your order, you agree to our Terms of Service
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}