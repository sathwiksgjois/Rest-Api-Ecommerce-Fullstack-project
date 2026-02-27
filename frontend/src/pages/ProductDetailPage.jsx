import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../utils/axios";
import { useCart } from "../context/CartContext";
import { ShoppingCart, Truck, Shield, RefreshCw, Star, ChevronRight, Heart, CheckCircle } from "lucide-react";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    axios
      .get(`/products/${id}/`)
      .then(res => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await addToCart(product, quantity); 
      setSuccessMessage("Product added to cart!");
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (err) {
      console.error(err);
      setSuccessMessage("Failed to add product to cart");
      
      // Clear error message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } 
  };

  const productFeatures = [
    { icon: Truck, text: "Free Shipping", color: "text-green-600" },
    { icon: Shield, text: "1 Year Warranty", color: "text-blue-600" },
    { icon: RefreshCw, text: "30-Day Returns", color: "text-purple-600" }
  ];

  if (loading) {
    return (
      <div className="pt-32 min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-32 min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md">
          <div className="text-4xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
          <Link to="/products" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{marginTop: "20px"}}>
        {/* Success Message */}
        {successMessage && (
          <div className={`fixed top-20 right-4 z-50 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in-out ${
            successMessage.includes("Failed") 
              ? "bg-red-100 border border-red-400 text-red-700" 
              : "bg-green-100 border border-green-400 text-green-700"
          }`}>
            {successMessage.includes("Failed") ? (
              <>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                </svg>
                <span>{successMessage}</span>
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                <span>{successMessage}</span>
              </>
            )}
          </div>
        )}

        {product.featured && (
          <div className="absolute top-20 left-30 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg" 
          style={{ marginTop: "28px", marginLeft: "-6px"}}>
            ⭐ Featured
          </div>
        )}
        
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <ChevronRight size={16} className="mx-2" />
          <Link to="/products" className="hover:text-blue-600">Products</Link>
          <ChevronRight size={16} className="mx-2" />
          <Link to={`/products?category=${product.category?.id}`} className="hover:text-blue-600">
            {product.category?.name}
          </Link>
          <ChevronRight size={16} className="mx-2" />
          <span className="text-gray-800 font-medium">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[500px] object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <button className="absolute top-6 right-6 bg-white/80 backdrop-blur-sm p-3 rounded-full hover:bg-white">
                <Heart size={20} className="text-red-500" />
              </button>
            </div>

            {/* Product Features */}
            <div className="grid grid-cols-3 gap-4">
              {productFeatures.map((feature, index) => (
                <div key={index} className="bg-white p-4 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow">
                  <feature.icon size={24} className={`mx-auto mb-2 ${feature.color}`} />
                  <p className="text-sm font-medium">{feature.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                {product.trending && (
                  <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    🔥 Trending
                  </span>
                )}
                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-medium">
                  {product.category?.name}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">{product.name}</h1>
              <div className="flex items-center gap-2 mb-6">
                <div className="flex text-yellow-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={20} fill="currentColor" />
                  ))}
                </div>
                <span className="text-gray-600">(4.5 • 128 reviews)</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-5xl font-bold text-gray-800">₹ {product.price}</span>
                <span className="text-gray-500 line-through">₹ {Math.round(product.price * 1.5)}</span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-bold">
                  Save 33%
                </span>
              </div>
              <p className="text-gray-600">Inclusive of all taxes</p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Description</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Quantity Selector */}
            <div>
              <h4 className="font-semibold text-gray-700 mb-3">Quantity</h4>
              <div className="flex items-center gap-6">
                <div className="flex items-center border-2 border-gray-300 rounded-2xl overflow-hidden w-40">
                  <button
                    className="px-5 py-3 bg-gray-100 hover:bg-gray-200 transition-colors text-2xl font-bold"
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  >
                    -
                  </button>
                  <span className="flex-1 text-center text-2xl font-bold">{quantity}</span>
                  <button
                    className="px-5 py-3 bg-gray-100 hover:bg-gray-200 transition-colors text-2xl font-bold"
                    onClick={() => setQuantity(q => q + 1)}
                  >
                    +
                  </button>
                </div>
                <div className={`px-4 py-2 rounded-xl ${product.stock > 10 ? 'bg-green-100 text-green-800' : product.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                  {product.stock > 10 ? `${product.stock} in stock` : product.stock > 0 ? `Only ${product.stock} left!` : "Out of stock"}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                <ShoppingCart size={24} />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add animation styles */}
      <style>{`
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translateY(-10px); }
          15% { opacity: 1; transform: translateY(0); }
          85% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-10px); }
        }
        .animate-fade-in-out {
          animation: fadeInOut 3s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}