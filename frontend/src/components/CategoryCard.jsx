import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Zap, ShoppingBag, Flame, TrendingUp, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function CategoryCard({ category }) {
  const [isHovered, setIsHovered] = useState(false);

  // Get gradient based on category name
  const getCategoryGradient = () => {
    const name = category.name?.toLowerCase() || '';
    
    if (name.includes('electronic') || name.includes('tech')) {
      return {
        bg: "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50",
        text: "text-blue-600",
        border: "border-blue-200",
        iconColor: "text-blue-500",
        hoverBorder: "hover:border-blue-300",
        badgeBg: "bg-gradient-to-r from-blue-500 to-purple-500"
      };
    } else if (name.includes('fashion') || name.includes('clothing')) {
      return {
        bg: "bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-50",
        text: "text-rose-600",
        border: "border-rose-200",
        iconColor: "text-rose-500",
        hoverBorder: "hover:border-rose-300",
        badgeBg: "bg-gradient-to-r from-rose-500 to-pink-500"
      };
    } else if (name.includes('home') || name.includes('living') || name.includes('kitchen')) {
      return {
        bg: "bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50",
        text: "text-amber-600",
        border: "border-amber-200",
        iconColor: "text-amber-500",
        hoverBorder: "hover:border-amber-300",
        badgeBg: "bg-gradient-to-r from-amber-500 to-orange-500"
      };
    } else if (name.includes('beauty') || name.includes('cosmetic')) {
      return {
        bg: "bg-gradient-to-br from-purple-50 via-violet-50 to-pink-50",
        text: "text-purple-600",
        border: "border-purple-200",
        iconColor: "text-purple-500",
        hoverBorder: "hover:border-purple-300",
        badgeBg: "bg-gradient-to-r from-purple-500 to-pink-500"
      };
    } else if (name.includes('sports') || name.includes('fitness')) {
      return {
        bg: "bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50",
        text: "text-emerald-600",
        border: "border-emerald-200",
        iconColor: "text-emerald-500",
        hoverBorder: "hover:border-emerald-300",
        badgeBg: "bg-gradient-to-r from-emerald-500 to-green-500"
      };
    } else if (name.includes('book') || name.includes('stationery')) {
      return {
        bg: "bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50",
        text: "text-cyan-600",
        border: "border-cyan-200",
        iconColor: "text-cyan-500",
        hoverBorder: "hover:border-cyan-300",
        badgeBg: "bg-gradient-to-r from-cyan-500 to-blue-500"
      };
    } else {
      return {
        bg: "bg-gradient-to-br from-gray-50 via-slate-50 to-zinc-50",
        text: "text-gray-600",
        border: "border-gray-200",
        iconColor: "text-gray-500",
        hoverBorder: "hover:border-gray-300",
        badgeBg: "bg-gradient-to-r from-gray-500 to-slate-500"
      };
    }
  };

  const gradient = getCategoryGradient();

  return (
    <Link
    to={`/category/${category.slug}`}
    className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`${gradient.bg} rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border ${gradient.border} ${gradient.hoverBorder} h-full relative`}>
        {/* Glow effect on hover */}
        <div className={`absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transition-all duration-700 rounded-2xl ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>

        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={category.image || "https://via.placeholder.com/400x300?text=Category"}
            alt={category.name}
            className="w-full h-full object-cover transform transition-all duration-700 group-hover:scale-110 group-hover:brightness-105"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-500"></div>
          
          {/* Product Count Badge */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1.5 rounded-full text-sm font-bold shadow-lg flex items-center gap-1 group-hover:scale-110 transition-transform duration-300">
            <ShoppingBag className="w-3 h-3" />
            {category.product_count || "0"} items
          </div>

          {/* Trending Badge */}
          {(category.product_count || 0) > 50 && (
            <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              Popular
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 relative z-10 bg-white/80 backdrop-blur-sm">
          <div className="flex items-start justify-between mb-3">
            <h3 className={`text-xl font-bold ${gradient.text} group-hover:scale-105 group-hover:translate-x-1 transition-all duration-300`}>
              {category.name}
            </h3>
            <div className={`p-2 rounded-lg ${gradient.bg.replace('50', '100')}`}>
              <Sparkles className={`w-5 h-5 ${gradient.iconColor}`} />
            </div>
          </div>
          
          <p className="text-gray-600 text-sm mb-6 line-clamp-2 group-hover:text-gray-700 transition-colors">
            {category.description || "Browse our premium collection"}
          </p>
          
          {/* Shop Now Button */}
          <div className={`flex items-center justify-between pt-4 border-t border-gray-200/50`}>
            <div className={`flex items-center gap-2 font-semibold ${gradient.text} group-hover:gap-3 transition-all duration-300`}>
              <span className="text-sm">Shop Now</span>
              <div className={`p-1 rounded-full ${gradient.bg.replace('50', '100')} transform group-hover:translate-x-1 transition-transform`}>
                <ChevronRight size={16} className={gradient.iconColor} />
              </div>
            </div>
            
            {/* Category specific feature */}
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Zap className="w-3 h-3 text-blue-500" />
                Fast Delivery
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}