import { Link } from "react-router-dom";
import { ShoppingBag, Heart, Loader2, Sparkles, TrendingUp, Zap, Star, Eye, ArrowRight, Flame, Gem, Crown, Bolt } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import api from "../utils/axios";
import { useAuth } from "../context/AuthContext";

export default function ProductCard({ product }) {
  const { user } = useAuth();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [glowColor, setGlowColor] = useState("");
  const cardRef = useRef(null);
  
  // Generate random glow color based on product
  const getGlowColor = () => {
    const colors = [
      "from-blue-500/20 via-purple-500/20 to-pink-500/20",
      "from-emerald-500/20 via-teal-500/20 to-cyan-500/20",
      "from-amber-500/20 via-orange-500/20 to-red-500/20",
      "from-violet-500/20 via-purple-500/20 to-fuchsia-500/20",
      "from-rose-500/20 via-pink-500/20 to-red-500/20",
      "from-indigo-500/20 via-blue-500/20 to-purple-500/20",
    ];
    const index = Math.abs(product.id) % colors.length;
    return colors[index];
  };

  useEffect(() => {
    setGlowColor(getGlowColor());
    if (user) {
      checkWishlistStatus();
    } else {
      setChecking(false);
    }
  }, [user, product.id]);

  const checkWishlistStatus = async () => {
    try {
      const response = await api.get("/wishlist/");
      const wishlistItems = response.data;
      const isInWishlist = wishlistItems.some(item => item.product.id === product.id);
      setIsWishlisted(isInWishlist);
    } catch (error) {
      console.error("Error checking wishlist status:", error);
    } finally {
      setChecking(false);
    }
  };

  const toggleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      const event = new CustomEvent('showToast', { 
        detail: { message: "Please login to add items to wishlist", type: "warning" } 
      });
      window.dispatchEvent(event);
      return;
    }

    try {
      setLoading(true);
      
      if (isWishlisted) {
        await api.delete(`/wishlist/remove/${product.id}/`);
        setIsWishlisted(false);
      } else {
        await api.post("/wishlist/add/", { product_id: product.id });
        setIsWishlisted(true);
      }
      window.dispatchEvent(new Event("wishlistUpdated"));
    } catch (error) {
      console.error("Error updating wishlist:", error);
    } finally {
      setLoading(false);
    }
  };

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercentage = hasDiscount 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const rating = product.rating || 4;
  const stars = Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      className={`w-3 h-3 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
    />
  ));

  // Get card background based on product type - LIGHT COLOR THEME
  const getCardBackground = () => {
    const category = product.category?.name?.toLowerCase() || "";
    
    if (category.includes('electronic') || category.includes('tech')) {
      return "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50";
    } else if (category.includes('fashion') || category.includes('clothing')) {
      return "bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-50";
    } else if (category.includes('home') || category.includes('living')) {
      return "bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50";
    } else if (category.includes('beauty') || category.includes('cosmetic')) {
      return "bg-gradient-to-br from-purple-50 via-violet-50 to-pink-50";
    } else if (category.includes('sports') || category.includes('fitness')) {
      return "bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50";
    } else if (category.includes('book') || category.includes('stationery')) {
      return "bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50";
    } else {
      return "bg-gradient-to-br from-gray-50 via-slate-50 to-zinc-50";
    }
  };

  // Get text color based on background
  const getTextColor = () => {
    const bg = getCardBackground();
    if (bg.includes('gray') || bg.includes('slate') || bg.includes('zinc')) {
      return "text-gray-900";
    }
    return "text-gray-800";
  };

  return (
    <div 
      ref={cardRef}
      className={`group ${getCardBackground()} rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200/60 hover:border-blue-300/80 relative`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* SOFT GLOW EFFECT */}
      <div className={`absolute inset-0 bg-gradient-to-r ${glowColor} transition-all duration-700 rounded-2xl ${isHovered ? 'opacity-40 blur-lg' : 'opacity-0 blur-2xl'}`}></div>
      
      {/* SUBTLE BORDER GLOW */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${glowColor} rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>

      {/* Image Container */}
      <div className="relative overflow-hidden rounded-t-2xl z-10">
        <Link to={`/products/${product.id}`} className="block">
          <div className="relative overflow-hidden">
            <img
              src={product.image || "https://via.placeholder.com/300"}
              alt={product.name}
              className="w-full h-64 object-cover transform transition-all duration-500 group-hover:scale-110 group-hover:brightness-105"
            />
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </Link>

        {/* DISCOUNT BADGE */}
        {hasDiscount && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg animate-bounce z-20">
            <div className="flex items-center gap-1">
              <Flame className="w-3 h-3" />
              <span className="font-semibold">-{discountPercentage}%</span>
            </div>
          </div>
        )}

        {/* TRENDING BADGE */}
        {product.trending && (
          <div className="absolute top-3 right-14 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg z-20">
            <div className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>Trending</span>
            </div>
          </div>
        )}

        {/* PREMIUM BADGE */}
        {product.price > 50000 && (
          <div className="absolute top-14 left-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-2.5 py-1 rounded-full text-xs font-bold shadow-lg z-20">
            <div className="flex items-center gap-1">
              <Crown className="w-3 h-3" />
              <span>Premium</span>
            </div>
          </div>
        )}

        {/* WISHLIST BUTTON */}
        <button
          onClick={toggleWishlist}
          disabled={loading || checking}
          className={`absolute top-3 right-3 p-2 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 z-20 ${
            isWishlisted 
              ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600' 
              : 'bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-red-50 hover:text-red-500'
          } ${loading || checking ? 'opacity-50 cursor-not-allowed' : ''}`}
          title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          {loading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : checking ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Heart 
              size={18} 
              fill={isWishlisted ? "currentColor" : "none"} 
              strokeWidth={2}
              className={`${isWishlisted ? 'animate-pulse' : ''}`}
            />
          )}
        </button>
      </div>

      {/* Product Info - LIGHT THEME */}
      <div className="p-5 relative z-10 bg-white/80 backdrop-blur-sm">
        {/* Category & Name */}
        <div className="mb-3">
          <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
            {product.category?.name || "Uncategorized"}
          </span>
        </div>

        <Link to={`/products/${product.id}`}>
          <h3 className={`font-bold ${getTextColor()} text-lg mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors duration-300`}>
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            {stars}
          </div>
          <span className="text-sm text-gray-500">({product.reviews || "25"})</span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[40px] group-hover:text-gray-700 transition-colors">
          {product.description || "Premium quality product with amazing features"}
        </p>

        {/* Price & CTA */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              ₹{product.price.toLocaleString()}
            </p>
            {hasDiscount && (
              <p className="text-sm text-gray-400 line-through">
                ₹{product.originalPrice.toLocaleString()}
              </p>
            )}
          </div>

          <div className="flex gap-2">
            <Link
              to={`/products/${product.id}`}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2.5 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center gap-2 hover:scale-105 shadow-lg hover:shadow-xl group/btn"
            >
              <Eye size={16} />
              View
              <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-4 pt-4 border-t border-gray-200/50 flex justify-between text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Zap className="w-3 h-3 text-blue-500" />
            Fast Delivery
          </span>
          <span className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-yellow-500" />
            Premium
          </span>
          <span className="flex items-center gap-1">
            <Bolt className="w-3 h-3 text-green-500" />
            In Stock
          </span>
        </div>
      </div>
    </div>
  );
}