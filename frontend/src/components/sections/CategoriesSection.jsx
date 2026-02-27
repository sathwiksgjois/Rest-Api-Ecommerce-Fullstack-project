import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Layers, Zap } from "lucide-react";
import CategoryCard from "../CategoryCard";

export default function CategoriesSection({ 
  title = "Shop by Category", 
  subtitle = "Browse products by category",
  categories = [], 
  loading = false,
  viewAllLink = "/categories"
}) {
  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        {/* Background decorative elements */}
        <div className="absolute -top-20 left-20 w-40 h-40 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute -bottom-20 right-20 w-60 h-60 bg-gradient-to-r from-green-500/10 to-teal-500/10 rounded-full blur-3xl -z-10"></div>
        
        <div className="flex justify-between items-end mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-75 animate-pulse"></div>
                <div className="relative w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Layers className="w-5 h-5 text-white" />
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
                {title}
              </h2>
            </div>
            <p className="text-gray-600 text-lg">{subtitle}</p>
          </div>
          <div className="animate-pulse bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl w-24 h-10"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse rounded-2xl"></div>
          ))}
        </div>
      </section>
    );
  }

  if (categories.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center py-12 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-12 border border-blue-100">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Layers className="w-10 h-10 text-white" />
          </div>
          <p className="text-gray-600 text-lg mb-4">No categories available yet.</p>
          <Link
            to={viewAllLink}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl group"
          >
            Browse Products
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute -top-20 left-20 w-40 h-40 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute -bottom-20 right-20 w-60 h-60 bg-gradient-to-r from-green-500/10 to-teal-500/10 rounded-full blur-3xl -z-10"></div>
      
      {/* Header */}
      <div className="flex justify-between items-end mb-10">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Layers className="w-5 h-5 text-white" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              {title}
            </h2>
          </div>
          <p className="text-gray-600 text-lg">{subtitle}</p>
        </div>
        <Link 
          to={viewAllLink} 
          className="group bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 px-6 py-3 rounded-xl font-semibold hover:from-blue-100 hover:to-purple-100 transition-all duration-300 flex items-center gap-2 border border-blue-200 hover:border-blue-300 hover:shadow-lg"
        >
          View All 
          <ArrowRight size={20} className="transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.slice(0, 4).map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>

      {/* CTA at bottom */}
      {categories.length > 4 && (
        <div className="mt-12 text-center">
          <Link
            to={viewAllLink}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl group/cta"
          >
            <Zap className="w-5 h-5" />
            Explore All Categories
            <ArrowRight className="w-5 h-5 transform group-hover/cta:translate-x-2 transition-transform" />
          </Link>
        </div>
      )}
    </section>
  );
}