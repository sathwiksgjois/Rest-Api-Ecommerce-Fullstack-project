import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../utils/axios";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import { Filter, Search, X, SlidersHorizontal } from "lucide-react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const search = searchParams.get("search") || "";
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [search, selectedCategory, minPrice, maxPrice]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (selectedCategory) params.append("category", selectedCategory);
      if (minPrice) params.append("min_price", minPrice);
      if (maxPrice) params.append("max_price", maxPrice);

      const res = await api.get(`/products/?${params.toString()}`);
      setProducts(res.data.results ?? res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories/");
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleApplyFilters = () => {
    setShowFilters(false);
  };

  const handleClearFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setSelectedCategory("");
  };

  const activeFiltersCount = [
    minPrice ? 1 : 0,
    maxPrice ? 1 : 0,
    selectedCategory ? 1 : 0
  ].reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/30 to-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            {search ? `Search Results for "${search}"` : "All Products"}
          </h1>
          <p className="text-gray-600 text-lg">
            Discover amazing products tailored for you
          </p>
        </div>

        {/* Active Filters Bar */}
        {activeFiltersCount > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">
            <div className="text-sm text-gray-600 font-medium mr-2">
              Active filters:
            </div>
            {selectedCategory && categories.find(c => c.slug === selectedCategory) && (
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                {categories.find(c => c.slug === selectedCategory)?.name}
              </span>
            )}
            {minPrice && (
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                Min: ₹{minPrice}
              </span>
            )}
            {maxPrice && (
              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                Max: ₹{maxPrice}
              </span>
            )}
            <button
              onClick={handleClearFilters}
              className="text-red-500 hover:text-red-700 text-sm font-medium ml-auto"
            >
              Clear all
            </button>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block w-72">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-28">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-bold text-gray-900">Filters</h3>
                </div>
                {activeFiltersCount > 0 && (
                  <span className="bg-blue-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </div>

              {/* Price Range */}
              <div className="mb-8">
                <h4 className="font-semibold text-gray-800 mb-4">Price Range</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1.5">Minimum Price</label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-gray-500">₹</span>
                      <input
                        type="number"
                        placeholder="0"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1.5">Maximum Price</label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-gray-500">₹</span>
                      <input
                        type="number"
                        placeholder="10000"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Categories */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-4">Categories</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory("")}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${!selectedCategory ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'hover:bg-gray-50 text-gray-700'}`}
                  >
                    All Categories
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.slug)}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${selectedCategory === category.slug ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'hover:bg-gray-50 text-gray-700'}`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={handleClearFilters}
                  className="w-full py-3.5 text-gray-700 font-medium rounded-xl border border-gray-300 hover:bg-gray-50 transition-colors mb-3"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-6">
              <button
                onClick={() => setShowFilters(true)}
                className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-xl px-5 py-3.5 hover:bg-gray-50 transition-colors shadow-sm"
              >
                <SlidersHorizontal className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-gray-800">Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="bg-blue-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-blue-600 mb-4"></div>
                <p className="text-gray-600">Loading products...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">No products found</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  {search ? `No results for "${search}". Try different keywords or remove filters.` : "Try adjusting your filters to find what you're looking for."}
                </p>
                <button
                  onClick={handleClearFilters}
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Clear all filters
                </button>
              </div>
            ) : (
              <>
                <div className="mb-6 flex items-center justify-between">
                  <p className="text-gray-600">
                    Showing <span className="font-semibold text-gray-900">{products.length}</span> products
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {showFilters && (
        <div className="fixed inset-0 z-50 overflow-y-auto lg:hidden">
          <div className="min-h-screen bg-black/50 flex items-end sm:items-center justify-center p-4">
            <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Filters</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Price Range */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-4">Price Range</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1.5">Min Price</label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-gray-500">₹</span>
                        <input
                          type="number"
                          placeholder="0"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl"
                          value={minPrice}
                          onChange={(e) => setMinPrice(e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1.5">Max Price</label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-gray-500">₹</span>
                        <input
                          type="number"
                          placeholder="10000"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl"
                          value={maxPrice}
                          onChange={(e) => setMaxPrice(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-4">Categories</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setSelectedCategory("")}
                      className={`px-4 py-3 rounded-xl border ${!selectedCategory ? 'bg-blue-50 text-blue-700 border-blue-200' : 'border-gray-300'}`}
                    >
                      All
                    </button>
                    {categories.slice(0, 6).map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.slug)}
                        className={`px-4 py-3 rounded-xl border text-left ${selectedCategory === category.slug ? 'bg-blue-50 text-blue-700 border-blue-200' : 'border-gray-300'}`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6">
                <div className="flex gap-3">
                  <button
                    onClick={handleClearFilters}
                    className="flex-1 py-3.5 text-gray-700 font-medium rounded-xl border border-gray-300 hover:bg-gray-50 transition-colors"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="flex-1 bg-blue-600 text-white py-3.5 rounded-xl font-medium hover:bg-blue-700 transition-colors"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;