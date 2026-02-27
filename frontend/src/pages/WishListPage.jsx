import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, X, ShoppingCart, Star, Eye, Loader2, CheckCircle, XCircle } from "lucide-react";
import api from "../utils/axios";
import { useCart } from "../context/CartContext"; 

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState(null);
  const [addingToCart, setAddingToCart] = useState(null);
  const [toast, setToast] = useState(null);
  const { addToCart } = useCart(); // Use CartContext

  // Fetch wishlist from API
  useEffect(() => {
    fetchWishlist();
  }, []);

  // Show toast notification
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const response = await api.get("products/wishlist/");
      setWishlistItems(response.data);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      showToast("Failed to load wishlist", "error");
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId, productName) => {
    try {
      setRemoving(productId);
      await api.delete(`products/wishlist/remove/${productId}/`);
      // Remove from local state
      setWishlistItems(prev => prev.filter(item => item.product.id !== productId));
      showToast(`${productName} removed from wishlist`, "success");
      window.dispatchEvent(new Event("wishlistUpdated"));
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      showToast("Failed to remove item from wishlist", "error");
    } finally {
      setRemoving(null);
    }
  };

  const moveToCart = async (product) => {
    try {
      setAddingToCart(product.id);
      // Use CartContext's addToCart function
      const success = await addToCart(product);
      
      if (success) {
        showToast(`${product.name} added to cart!`, "success");
      } else {
        showToast("Failed to add item to cart", "error");
      }
      setAddingToCart(null);
    } catch (error) {
      console.error("Error adding to cart:", error);
      showToast("Failed to add item to cart", "error");
      setAddingToCart(null);
    }
  };

  const addAllToCart = async () => {
    try {
      let successCount = 0;
      let failCount = 0;
      
      for (const item of wishlistItems) {
        if (item.product.stock > 0) {
          const success = await addToCart(item.product);
          if (success) {
            successCount++;
          } else {
            failCount++;
          }
        }
      }
      
      if (failCount === 0) {
        showToast("All items added to cart successfully!", "success");
      } else {
        showToast(`Added ${successCount} items, ${failCount} failed`, "warning");
      }
    } catch (error) {
      console.error("Error adding all to cart:", error);
      showToast("Failed to add some items to cart", "error");
    }
  };

  const clearWishlist = async () => {
    try {
      // Remove all items one by one
      for (const item of wishlistItems) {
        await api.delete(`/wishlist/remove/${item.product.id}/`);
      }
      setWishlistItems([]);
      showToast("Wishlist cleared successfully!", "success");
      window.dispatchEvent(new Event("wishlistUpdated"));
    } catch (error) {
      console.error("Error clearing wishlist:", error);
      showToast("Failed to clear wishlist", "error");
    }
  };

  const totalValue = wishlistItems.reduce((sum, item) => sum + item.product.price, 0);

  if (loading) {
    return (
      <div className="pt-32 min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <Loader2 className="w-12 h-12 text-pink-600 animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Loading your wishlist...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-24 right-4 z-50 animate-fade-in">
          <div className={`flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl ${
            toast.type === "success" 
              ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white" 
              : toast.type === "warning"
              ? "bg-gradient-to-r from-yellow-500 to-orange-600 text-white"
              : "bg-gradient-to-r from-red-500 to-rose-600 text-white"
          }`}>
            {toast.type === "success" ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <XCircle className="w-5 h-5" />
            )}
            <span className="font-medium">{toast.message}</span>
            <button 
              onClick={() => setToast(null)}
              className="ml-4 hover:opacity-80"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">My Wishlist</h1>
              <p className="text-gray-600">
                {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved for later
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-4">
              <p className="text-sm text-gray-600">Total Value</p>
              <p className="text-2xl font-bold text-gray-800">₹ {totalValue.toLocaleString()}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-xl shadow p-4 text-center">
              <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Heart className="w-5 h-5 text-pink-600" />
              </div>
              <p className="text-2xl font-bold text-gray-800">{wishlistItems.length}</p>
              <p className="text-sm text-gray-600">Items Saved</p>
            </div>
            
            <div className="bg-white rounded-xl shadow p-4 text-center">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <ShoppingBag className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-800">
                {wishlistItems.filter(item => item.product.stock > 0).length}
              </p>
              <p className="text-sm text-gray-600">In Stock</p>
            </div>
            
            <div className="bg-white rounded-xl shadow p-4 text-center">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Star className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-800">
                {wishlistItems.length > 0 
                  ? (wishlistItems.reduce((sum, item) => sum + (item.product.rating || 4), 0) / wishlistItems.length).toFixed(1)
                  : '0.0'
                }
              </p>
              <p className="text-sm text-gray-600">Avg Rating</p>
            </div>
          </div>
        </div>

        {/* Wishlist Items */}
        {wishlistItems.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-pink-100 to-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-pink-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Your wishlist is empty</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Save items you love by clicking the heart icon on any product. They'll appear here for easy access.
            </p>
            <Link
              to="/products"
              className="inline-block bg-gradient-to-r from-pink-600 to-rose-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistItems.map((item) => (
                <div key={item.id || item.product.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden group">
                  {/* Image Section */}
                  <div className="relative">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                        {item.product.category?.name || 'Uncategorized'}
                      </span>
                      {item.product.stock < 10 && item.product.stock > 0 && (
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                          Only {item.product.stock} left
                        </span>
                      )}
                      {item.product.stock === 0 && (
                        <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                          Out of Stock
                        </span>
                      )}
                    </div>
                    
                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromWishlist(item.product.id, item.product.name)}
                      disabled={removing === item.product.id}
                      className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-50"
                      title="Remove from wishlist"
                    >
                      {removing === item.product.id ? (
                        <Loader2 className="w-4 h-4 animate-spin text-red-600" />
                      ) : (
                        <X className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Content Section */}
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-800 text-lg mb-1 line-clamp-1">
                          {item.product.name}
                        </h3>
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(item.product.rating || 4)
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                          <span className="text-sm text-gray-600 ml-1">
                            {item.product.rating?.toFixed(1) || '4.0'}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-800">
                          ₹ {item.product.price.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => moveToCart(item.product)}
                        disabled={addingToCart === item.product.id || item.product.stock === 0}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {addingToCart === item.product.id ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Adding...
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-4 h-4" />
                            Add to Cart
                          </>
                        )}
                      </button>
                      <Link
                        to={`/products/${item.product.id}`}
                        className="px-4 border border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-12 bg-white rounded-2xl shadow-lg p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={addAllToCart}
                  disabled={wishlistItems.length === 0}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-bold hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add All to Cart
                </button>
                <button
                  onClick={clearWishlist}
                  disabled={wishlistItems.length === 0}
                  className="flex-1 border-2 border-red-600 text-red-600 py-4 rounded-xl font-bold hover:bg-red-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Clear Wishlist
                </button>
                <Link
                  to="/products"
                  className="flex-1 border-2 border-blue-600 text-blue-600 py-4 rounded-xl font-bold hover:bg-blue-50 transition-all duration-300 text-center"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Add CSS for fade-in animation */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}