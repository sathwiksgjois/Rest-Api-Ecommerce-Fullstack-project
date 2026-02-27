import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useState, useEffect, useRef } from "react";
import api from "../../utils/axios";
import { useTranslation } from "react-i18next";
import { Search, ShoppingCart, User, ChevronDown, Package, Heart, Menu, X, Sparkles, Zap, Home, Shirt, ChefHat, Brush, ShoppingBag, Trophy, BookOpen } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0); 
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  
  // Refs for profile dropdown
  const profileButtonRef = useRef(null);
  const profileDropdownRef = useRef(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [dropdownTimeout, setDropdownTimeout] = useState(null);

  const languages = [
    { code: "en", label: "English" },
    { code: "hi", label: "हिन्दी" },
    { code: "kn", label: "ಕನ್ನಡ" },
  ];

  const toggleDropdown = () => setOpen(!open);
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
    setOpen(false);
  };

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await api.get("/categories/");
        setCategories(res.data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    }
    fetchCategories();
  }, []);
  
  useEffect(() => {
    const updateCount = async () => {
      if (!user) {
        setWishlistCount(0);
        return;
      }
      try {
        const res = await api.get("/wishlist/count/");
        setWishlistCount(res.data.count);
      } catch (e) {
        console.error(e);
      }
    };

    updateCount();
    window.addEventListener("wishlistUpdated", updateCount);
    return () => {
      window.removeEventListener("wishlistUpdated", updateCount);
    };
  }, [user]);

  const [query, setQuery] = useState("");
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const cartCount = Array.isArray(cart) ? cart.reduce((sum, item) => sum + (item.quantity || 0), 0) : 0;

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/products?search=${query}`);
    setMobileMenuOpen(false);
    setShowMobileSearch(false);
  };

  const handleChange = (e) => {
    const category = e.target.value;
    if (category === "all") {
      navigate("/products");
    } else {
      navigate(`/category/${category}`);
    }
    setMobileMenuOpen(false);
  };

  // Category icons mapping
  const categoryIcons = {
    'electronics': <Zap className="w-4 h-4 mr-2" />,
    'fashion': <Shirt className="w-4 h-4 mr-2" />,
    'home-living': <Home className="w-4 h-4 mr-2" />,
    'beauty': <Brush className="w-4 h-4 mr-2" />,
    'grocery': <ShoppingBag className="w-4 h-4 mr-2" />,
    'sports': <Trophy className="w-4 h-4 mr-2" />,
    'books': <BookOpen className="w-4 h-4 mr-2" />,
  };

  const navItems = [
    { to: "/category/electronics", label: t('common.electronics'), icon: categoryIcons.electronics },
    { to: "/category/fashion", label: t('common.fashion'), icon: categoryIcons.fashion },
    { to: "/category/home-living", label: t('common.homeKitchen'), icon: categoryIcons['home-living'] },
    { to: "/category/beauty", label: t('common.beauty'), icon: categoryIcons.beauty },
    { to: "/category/grocery", label: t('common.groceries'), icon: categoryIcons.grocery },
    { to: "/category/sports", label: t('common.sports'), icon: categoryIcons.sports },
    { to: "/category/books", label: t('common.books'), icon: categoryIcons.books },
    { to: "/products", label: t('home.allProducts'), icon: <Sparkles className="w-4 h-4 mr-2" /> },
  ];

  // FIXED: Profile dropdown handlers with better logic
  const handleProfileMouseEnter = () => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    setProfileOpen(true);
  };

  const handleProfileMouseLeave = () => {
    // Add a small delay before closing to allow moving to dropdown
    const timeout = setTimeout(() => {
      setProfileOpen(false);
    }, 300); // 300ms delay
    setDropdownTimeout(timeout);
  };

  const handleDropdownMouseEnter = () => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    setProfileOpen(true);
  };

  const handleDropdownMouseLeave = () => {
    const timeout = setTimeout(() => {
      setProfileOpen(false);
    }, 300);
    setDropdownTimeout(timeout);
  };

  const handleProfileItemClick = () => {
    setProfileOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target) &&
        profileButtonRef.current &&
        !profileButtonRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-gray-900 to-gray-800 shadow-xl border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        {/* Mobile Search Bar (when active) */}
        {showMobileSearch && (
          <div className="md:hidden py-2 animate-slideDown">
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('navbar.searchPlaceholder')}
                className="flex-1 px-3 py-2 text-gray-900 rounded-lg focus:outline-none text-sm"
                autoFocus
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg font-medium"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => setShowMobileSearch(false)}
                className="bg-gray-700 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </form>
          </div>
        )}

        {/* Main Navbar */}
        <div className="h-14 md:h-16 flex items-center justify-between">
          
          {/* Left Section: Logo & Mobile Menu */}
          <div className="flex items-center gap-3">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white p-1 hover:bg-gray-800 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            <div className="flex items-center gap-2">
              {/* ShopEase Logo */}
              <Link
                to="/"
                className="flex items-center group"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShowMobileSearch(false);
                }}
              >
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                  <div className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white px-3 py-1 rounded-lg font-bold text-xl md:text-2xl tracking-tighter flex items-center">
                    <Sparkles className="w-4 h-4 mr-1" />
                    ShopEase
                  </div>
                </div>
              </Link>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 text-xs md:text-sm px-3 py-1.5 rounded-full font-bold animate-pulse">
                  PREMIUM
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xl mx-4 lg:mx-6">
            <form onSubmit={handleSearch} className="w-full">
              <div className="flex rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <select
                  onChange={handleChange}
                  className="px-3 py-2.5 border bg-white text-gray-800 focus:outline-none text-sm min-w-[140px]"
                  defaultValue="all"
                >
                  <option value="all">{t('navbar.shopByCategory')}</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.slug}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t('navbar.searchPlaceholder')}
                  className="w-full px-4 py-2.5 text-gray-900 focus:outline-none text-sm"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 hover:from-orange-600 hover:to-orange-700 transition-all duration-300"
                >
                  <Search className="w-5 h-5 text-white" />
                </button>
              </div>
            </form>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 md:gap-4">
            
            {/* Mobile Search Button */}
            <button
              onClick={() => setShowMobileSearch(true)}
              className="md:hidden text-white p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Language Selector - Desktop Only */}
            <div className="hidden md:relative md:flex items-center text-white cursor-pointer select-none">
              <div
                className="flex items-center hover:text-yellow-300 transition-colors duration-200 px-2 py-1 rounded-lg hover:bg-gray-800"
                onClick={toggleDropdown}
              >
                <span className="text-sm font-medium">
                  {(i18n.language || "en").toUpperCase()}
                </span>
                <ChevronDown className="w-4 h-4 ml-1" />
              </div>

              {open && (
                <div className="absolute top-full mt-2 right-0 w-32 bg-white rounded-lg shadow-lg z-50 border">
                  {languages.map((lang) => (
                    <div
                      key={lang.code}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800"
                      onClick={() => changeLanguage(lang.code)}
                    >
                      {lang.label}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Wishlist */}
            <Link 
              to="/wishlist" 
              className="hidden md:flex items-center text-white hover:text-pink-500 transition-all duration-300 group relative p-2 hover:bg-gray-800 rounded-lg"
              onClick={() => {
                setMobileMenuOpen(false);
                setShowMobileSearch(false);
              }}
            >
              <Heart className="w-5 h-5 md:w-6 md:h-6" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
              <span className="hidden lg:inline ml-2 text-sm">{t('navbar.wishlist')}</span>
            </Link>

            {/* Authentication or Profile - FIXED DROPDOWN */}
            {!user ? (
              <div className="hidden md:flex items-center gap-3">
                <Link
                  to="/login"
                  className="flex flex-col items-center px-3 py-1.5 hover:bg-gray-800 rounded-lg transition-colors duration-200 group"
                >
                  <p className="text-sm text-gray-300">{t('common.hello')}, {t('navbar.login')}</p>
                  <div className="flex items-center">
                    <p className="text-white font-semibold text-sm group-hover:text-yellow-300">
                      {t('navbar.profile')}
                    </p>
                    <ChevronDown className="w-4 h-4 ml-1 text-gray-400" />
                  </div>
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  {t('navbar.register')}
                </Link>
              </div>
            ) : (
              <div className="hidden md:relative md:block">
                {/* Profile Button */}
                <button 
                  ref={profileButtonRef}
                  className="flex items-center px-3 py-1.5 hover:bg-gray-800 rounded-lg transition-colors duration-200 group"
                  onMouseEnter={handleProfileMouseEnter}
                  onMouseLeave={handleProfileMouseLeave}
                  onClick={() => setProfileOpen(!profileOpen)}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                    {user.username?.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-left ml-2">
                    <p className="text-xs text-gray-300">{t('common.hello')},</p>
                    <p className="text-white font-semibold text-sm group-hover:text-yellow-300">
                      {user.username}
                    </p>
                  </div>
                  <ChevronDown className="w-4 h-4 ml-2 text-gray-400" />
                </button>

                {/* Dropdown Menu - FIXED with better event handling */}
                {profileOpen && (
                  <div 
                    ref={profileDropdownRef}
                    className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl z-50 border animate-fadeIn"
                    onMouseEnter={handleDropdownMouseEnter}
                    onMouseLeave={handleDropdownMouseLeave}
                  >
                    <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b rounded-t-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                          {user.username?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{user.username}</p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                      </div>
                    </div>
                    <div className="py-2">
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-3 hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors block"
                        onClick={handleProfileItemClick}
                      >
                        <User className="w-5 h-5 mr-3 text-gray-500" />
                        <span>{t('navbar.profile')}</span>
                      </Link>
                      <Link
                        to="/wishlist"
                        className="flex items-center px-4 py-3 hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors block"
                        onClick={handleProfileItemClick}
                      >
                        <Heart className="w-5 h-5 mr-3 text-gray-500" />
                        <span>{t('navbar.wishlist')}</span>
                        {wishlistCount > 0 && (
                          <span className="ml-auto bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">
                            {wishlistCount}
                          </span>
                        )}
                      </Link>
                      <Link
                        to="/orders"
                        className="flex items-center px-4 py-3 hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors block"
                        onClick={handleProfileItemClick}
                      >
                        <Package className="w-5 h-5 mr-3 text-gray-500" />
                        <span>{t('navbar.orders')}</span>
                      </Link>
                      <div className="border-t my-2"></div>
                      <button
                        onClick={() => {
                          handleProfileItemClick();
                          logout();
                        }}
                        className="flex items-center w-full px-4 py-3 hover:bg-red-50 text-red-600 transition-colors text-left"
                      >
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>{t('navbar.logout')}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Cart */}
            <Link
              to="/cart"
              className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1.5 hover:bg-gray-800 rounded-lg transition-colors duration-200 relative group"
              onClick={() => {
                setMobileMenuOpen(false);
                setShowMobileSearch(false);
              }}
            >
              <div className="relative">
                <ShoppingCart className="w-6 h-6 md:w-7 md:h-7 text-white" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-1 min-w-[16px] h-4 md:h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-white font-semibold text-sm group-hover:text-yellow-300">
                  {t('navbar.cart')}
                </p>
              </div>
            </Link>

            {/* Mobile Login Button */}
            {!user && (
              <Link
                to="/login"
                className="md:hidden bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-1.5 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShowMobileSearch(false);
                }}
              >
                <User className="w-4 h-4 mr-1" />
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden ${mobileMenuOpen ? 'block animate-slideDown' : 'hidden'}`}>
          {/* Mobile User Info */}
          {user ? (
            <div className="p-4 bg-gray-800 rounded-t-lg mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                  {user.username?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-white font-semibold">{user.username}</p>
                  <p className="text-gray-400 text-sm">{user.email}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-gray-800 rounded-t-lg mb-4 text-center">
              <p className="text-gray-300 mb-2">Welcome to ShopEase!</p>
              <div className="flex gap-2">
                <Link
                  to="/login"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 rounded-lg font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="flex-1 border-2 border-blue-600 text-blue-400 py-2 rounded-lg font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          )}

          {/* Mobile Navigation Items */}
          <div className="pb-4 space-y-1">
            <p className="text-gray-400 text-sm px-3 py-2 font-medium">Categories</p>
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-center text-white py-3 px-3 hover:bg-gray-800 rounded-lg transition-colors duration-200 group"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="mr-3 transform group-hover:scale-110 transition-transform">
                  {item.icon}
                </span>
                {item.label}
                {item.to === "/products" && (
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                    <div className="relative bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 text-xs md:text-sm px-3 py-1.5 rounded-full font-bold animate-pulse">
                      PREMIUM
                    </div>
                  </div>
                )}
              </Link>
            ))}

            {/* Mobile User Menu */}
            {user && (
              <>
                <div className="pt-4 border-t border-gray-700">
                  <p className="text-gray-400 text-sm px-3 py-2 font-medium">Account</p>
                  <Link
                    to="/profile"
                    className="flex items-center text-white py-3 px-3 hover:bg-gray-800 rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User className="w-5 h-5 mr-3" />
                    {t('navbar.profile')}
                  </Link>
                  <Link
                    to="/orders"
                    className="flex items-center text-white py-3 px-3 hover:bg-gray-800 rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Package className="w-5 h-5 mr-3" />
                    {t('navbar.orders')}
                  </Link>
                  <Link
                    to="/wishlist"
                    className="flex items-center text-white py-3 px-3 hover:bg-gray-800 rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Heart className="w-5 h-5 mr-3" />
                    {t('navbar.wishlist')}
                    {wishlistCount > 0 && (
                      <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                        {wishlistCount}
                      </span>
                    )}
                  </Link>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logout();
                    }}
                    className="flex items-center w-full text-red-400 hover:text-red-300 py-3 px-3 hover:bg-gray-800 rounded-lg text-left"
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    {t('navbar.logout')}
                  </button>
                </div>
              </>
            )}

            {/* Language Selector - Mobile */}
            <div className="pt-4 border-t border-gray-700">
              <p className="text-gray-400 text-sm px-3 py-2 font-medium">Language</p>
              <div className="grid grid-cols-3 gap-2 px-3">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      i18n.language === lang.code
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Categories Bar with Icons */}
        <div className="hidden md:flex h-10 items-center space-x-6 overflow-x-auto scrollbar-hide px-2">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="flex items-center text-white hover:text-yellow-300 font-medium text-sm whitespace-nowrap transition-all duration-300 group"
            >
              <span className="mr-1.5 transform group-hover:scale-110 transition-transform">
                {item.icon}
              </span>
              {item.label}
              {item.to === "/products" && (
                <div className="relative group ml-2">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                  <div className="relative bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 text-xs px-2 py-1 rounded-full font-bold animate-pulse">
                    PREMIUM
                  </div>
                </div>
              )}
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </nav>
  );
}