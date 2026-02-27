import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Zap, Target, Flame, Rocket } from "lucide-react";
import { useEffect, useState } from "react";
import ProductCard from "../ProductCard";

export default function ProductsSection({ 
  title = "Featured Products", 
  subtitle = "Handpicked items just for you",
  products = [], 
  loading = false,
  viewAllLink = "/products"
}) {
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [animateTitle, setAnimateTitle] = useState(false);

  useEffect(() => {
    setAnimateTitle(true);
    
    if (products.length > 0) {
      // Get products with animation delay
      setDisplayedProducts(products.slice(0, 4));
    }
  }, [products]);

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 -z-10"></div>
        
        <div className="flex justify-between items-end mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg blur opacity-75 animate-pulse"></div>
                <div className="relative w-12 h-12 bg-gradient-to-r from-cyan-600 to-purple-700 rounded-lg flex items-center justify-center">
                  <Flame className="w-6 h-6 text-white" />
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
                {title}
              </h2>
            </div>
            <p className="text-gray-400 text-lg">{subtitle}</p>
          </div>
          <div className="animate-pulse bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl w-28 h-12"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-96 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse rounded-2xl border border-gray-800"></div>
          ))}
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center py-12 bg-gradient-to-br from-gray-900 to-black rounded-3xl p-12 border border-gray-800">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-cyan-600 to-purple-700 rounded-full flex items-center justify-center animate-pulse">
            <Rocket className="w-12 h-12 text-white animate-bounce" />
          </div>
          <p className="text-gray-400 text-lg mb-4">No products available yet.</p>
          <Link
            to={viewAllLink}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-purple-700 text-white px-8 py-3 rounded-xl font-bold hover:from-cyan-500 hover:to-purple-600 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl group"
          >
            🔥 Explore Products
            <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 -z-10"></div>
      
      {/* Animated particles */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
      
      {/* Header */}
      <div className="flex justify-between items-end mb-10">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse"></div>
              <div className="relative w-12 h-12 bg-gradient-to-r from-cyan-600 to-purple-700 rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
            </div>
            <h2 className={`text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent transition-all duration-1000 ${animateTitle ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              {title}
            </h2>
          </div>
          <p className="text-gray-400 text-lg">{subtitle}</p>
        </div>
        <Link 
          to={viewAllLink} 
          className="group bg-gradient-to-r from-gray-800 to-gray-900 text-gray-300 px-6 py-3 rounded-xl font-bold hover:from-gray-700 hover:to-gray-800 transition-all duration-300 flex items-center gap-2 border border-gray-800 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/20"
        >
          View All 
          <ArrowRight size={20} className="transform group-hover:translate-x-2 transition-transform" />
        </Link>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
        {displayedProducts.map((product, index) => (
          <div 
            key={product.id} 
            className={`transition-all duration-700 delay-${index * 100} transform hover:-translate-y-2 ${
              animateTitle ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* CTA at bottom */}
      {displayedProducts.length > 0 && (
        <div className="mt-12 text-center">
          <Link
            to={viewAllLink}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-600 to-purple-700 text-white px-8 py-4 rounded-xl font-bold hover:from-cyan-500 hover:to-purple-600 transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-3xl group/cta animate-pulse"
          >
            <Zap className="w-5 h-5" />
            🔥 EXPLORE MORE PRODUCTS
            <ArrowRight className="w-5 h-5 transform group-hover/cta:translate-x-2 transition-transform" />
          </Link>
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </section>
  );
}