import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/axios";
import ProductCard from "../components/ProductCard";
import { ArrowLeft, Filter, Grid, List, ShoppingBag, Loader2 } from "lucide-react";

export default function CategoryProductsPage() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("default");
  const [categoryName, setCategoryName] = useState("");

  // Format slug to readable category name
  const formatCategoryName = (slug) => {
    return slug
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const res = await api.get(`/products/category/${slug}/`);
        console.log("API DATA:", res.data);
        
        const productsData = res.data.results ?? res.data;
        setProducts(productsData);
        
        // Set category name
        setCategoryName(formatCategoryName(slug));
        
        // Try to get category info
        if (productsData.length > 0 && productsData[0].category) {
          setCategoryName(productsData[0].category.name);
        }
      } catch (err) {
        console.error("Failed to fetch category products", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [slug]);

  // Sort products
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  if (loading) {
    return (
      <div style={{ paddingTop: '12rem', minHeight: '100vh' }} className="bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-96">
            <div className="text-center">
              <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Loading {formatCategoryName(slug)} products...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '12rem', minHeight: '100vh' }} className="bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Back Button */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <Link
              to="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            <div className="text-sm text-gray-500">
              <Link to="/" className="hover:text-blue-600">Home</Link>
              <span className="mx-2">/</span>
              <Link to="/products" className="hover:text-blue-600">Products</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-800 font-medium">{categoryName}</span>
            </div>
          </div>

          {/* Category Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white mb-8 shadow-2xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <div>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
                      {categoryName}
                    </h1>
                    <p className="text-blue-100 text-lg">
                      Explore our premium collection of {categoryName.toLowerCase()} products
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4">
                <div className="text-center">
                  <p className="text-3xl font-bold">{products.length}</p>
                  <p className="text-blue-100">Products</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters & Controls */}
        <div className="mb-8 bg-white rounded-2xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-700">Filters</span>
              </div>
              
              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-xl pl-4 pr-10 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                >
                  <option value="default">Sort by: Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-white shadow" : "hover:bg-gray-200"}`}
                title="Grid View"
              >
                <Grid className={`w-5 h-5 ${viewMode === "grid" ? "text-blue-600" : "text-gray-600"}`} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-white shadow" : "hover:bg-gray-200"}`}
                title="List View"
              >
                <List className={`w-5 h-5 ${viewMode === "list" ? "text-blue-600" : "text-gray-600"}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Products Display */}
        {products.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">No Products Found</h3>
            <p className="text-gray-600 mb-8">
              We couldn't find any products in the {categoryName.toLowerCase()} category.
            </p>
            <Link
              to="/products"
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300"
            >
              Browse All Products
            </Link>
          </div>
        ) : (
          <>
            {/* Grid View */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              /* List View */
              <div className="space-y-4">
                {sortedProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-48 md:h-full object-cover"
                        />
                      </div>
                      <div className="md:w-3/4 p-6">
                        <div className="flex flex-col md:flex-row md:items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
                            <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                            <div className="flex items-center gap-4">
                              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                {product.category?.name || categoryName}
                              </span>
                              {product.featured && (
                                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                                  ⭐ Featured
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="mt-4 md:mt-0 md:text-right">
                            <p className="text-2xl font-bold text-gray-800 mb-2">₹ {product.price}</p>
                            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Results Count */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-center text-gray-600">
                Showing <span className="font-semibold text-gray-800">{sortedProducts.length}</span> products in {categoryName}
              </p>
            </div>
          </>
        )}

        {/* Related Categories */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Explore More Categories</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['electronics', 'fashion', 'home-kitchen', 'beauty'].map((cat) => (
              cat !== slug && (
                <Link
                  key={cat}
                  to={`/category/${cat}`}
                  className="bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-2xl p-6 text-center hover:shadow-lg hover:border-blue-300 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <ShoppingBag className="w-6 h-6 text-blue-600" />
                  </div>
                  <p className="font-semibold text-gray-800">
                    {formatCategoryName(cat)}
                  </p>
                </Link>
              )
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}