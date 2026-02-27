import { useEffect, useState } from "react";
import api from "../utils/axios";
import { Link } from "react-router-dom";
import { ShoppingBag, Grid, Tag, ArrowRight, Loader2 } from "lucide-react";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true);
        const res = await api.get("/categories/");
        setCategories(res.data);
        
        // Take first 4 categories as featured
        setFeaturedCategories(res.data.slice(0, 4));
      } catch (err) {
        console.error("Failed to fetch categories", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="pt-32 min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-96">
            <div className="text-center">
              <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Loading categories...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="pt-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full mb-4">
            <Grid className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-blue-700">Explore Collections</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Shop by Category
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover amazing products across various categories. Find exactly what you're looking for.
          </p>
        </div>

        {/* Featured Categories */}
        {featuredCategories.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Tag className="w-6 h-6 text-blue-600" />
                  Featured Categories
                </h2>
                <p className="text-gray-600">Popular picks for you</p>
              </div>
              <Link 
                to="/products" 
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
              >
                View All Products
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredCategories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/category/${cat.slug}`}
                  className="group relative overflow-hidden bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={cat.image || "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop"}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{cat.name}</h3>
                    <p className="text-blue-100 text-sm">Explore Collection</p>
                  </div>
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Featured
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* All Categories */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">All Categories</h2>
            <p className="text-gray-600">Browse through all our product categories</p>
          </div>

          {categories.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl shadow-lg">
              <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No Categories Found</h3>
              <p className="text-gray-600">Categories will appear here once available.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/category/${cat.slug}`}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={cat.image || "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop"}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                        {cat.name}
                      </h3>
                      <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-2 rounded-lg">
                        <ShoppingBag className="w-5 h-5 text-blue-600" />
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {cat.description || `Explore our ${cat.name.toLowerCase()} collection`}
                    </p>
                    <div className="flex items-center text-blue-600 font-medium">
                      <span>Browse Products</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Can't find what you're looking for?
            </h3>
            <p className="text-blue-100 mb-8">
              Browse our complete product catalog with thousands of items across all categories.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="bg-white text-gray-900 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 hover:scale-105"
              >
                View All Products
              </Link>
              <Link
                to="/"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-xl font-bold hover:bg-white/10 transition-all duration-300"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}