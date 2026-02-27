import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { ChevronLeft, ChevronRight, Zap, Shield, Truck, Tag, Sparkles, ArrowRight, Star, Award, Clock, Users, CheckCircle, ShoppingBag, CreditCard, Headphones } from "lucide-react";
import { useTranslation } from "react-i18next";
import axios from "../utils/axios";

import ProductsSection from "../components/sections/ProductsSection";
import CategoriesSection from "../components/sections/CategoriesSection";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// Trust badges (static)
const trustBadges = [
  { 
    icon: Shield, 
    title: "securePayment", 
    description: "secureTransactions",
    gradient: "from-blue-400 to-blue-600",
    iconColor: "text-blue-500",
    bgColor: "bg-gradient-to-br from-blue-100 to-blue-200"
  },
  { 
    icon: Truck, 
    title: "freeShipping", 
    description: "freeShippingDesc",
    gradient: "from-green-400 to-emerald-600",
    iconColor: "text-green-500",
    bgColor: "bg-gradient-to-br from-green-100 to-emerald-200"
  },
  { 
    icon: Zap, 
    title: "fastDelivery", 
    description: "fastDeliveryDesc",
    gradient: "from-orange-400 to-orange-600",
    iconColor: "text-orange-500",
    bgColor: "bg-gradient-to-br from-orange-100 to-orange-200"
  }
];

// Hero images
const heroImages = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?q=80&w=2070&auto=format&fit=crop",
    title: "upTo70Off",
    subtitle: "summerCollection",
    description: "discoverDeals",
    buttonText: "shopNow",
    color: "from-sky-500/80 via-sky-400/60 to-sky-300/40",
    buttonColor: "from-blue-300 to-sky-400",
    accent: "bg-sky-400/30",
    overlay: "bg-gradient-to-r from-sky-500/30 to-sky-400/20"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop",
    title: "newArrivals",
    subtitle: "fashionCollection",
    description: "trendyOutfits",
    buttonText: "explore",
    color: "from-rose-500/80 via-rose-400/60 to-rose-300/40",
    buttonColor: "from-pink-400 to-rose-400",
    accent: "bg-rose-400/30",
    overlay: "bg-gradient-to-r from-rose-500/30 to-rose-400/20"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=2070&auto=format&fit=crop",
    title: "techRevolution",
    subtitle: "premiumElectronics",
    description: "latestGadgets",
    buttonText: "discover",
    color: "from-fuchsia-500/80 via-fuchsia-400/60 to-fuchsia-300/40",
    buttonColor: "from-pink-500 to-fuchsia-400",
    accent: "bg-fuchsia-400/30",
    overlay: "bg-gradient-to-r from-fuchsia-500/30 to-fuchsia-400/20"
  }
];

// Why Choose Us features
const features = [
  {
    icon: Star,
    title: "Premium Quality",
    description: "Curated selection of top-rated products",
    color: "from-yellow-400 to-orange-500",
    bgColor: "bg-gradient-to-br from-yellow-100 to-orange-100"
  },
  {
    icon: Award,
    title: "Best Prices",
    description: "Price match guarantee on all items",
    color: "from-green-400 to-emerald-600",
    bgColor: "bg-gradient-to-br from-green-100 to-emerald-100"
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round the clock customer assistance",
    color: "from-blue-400 to-cyan-600",
    bgColor: "bg-gradient-to-br from-blue-100 to-cyan-100"
  },
  {
    icon: Users,
    title: "5M+ Customers",
    description: "Trusted by millions worldwide",
    color: "from-purple-400 to-pink-600",
    bgColor: "bg-gradient-to-br from-purple-100 to-pink-100"
  }
];

// Footer features
const footerFeatures = [
  {
    icon: ShoppingBag,
    title: "Wide Selection",
    description: "Over 10,000+ products across 50+ categories",
    color: "from-pink-400 to-rose-500",
    bgColor: "bg-gradient-to-br from-pink-100 to-rose-100"
  },
  {
    icon: CreditCard,
    title: "Secure Checkout",
    description: "SSL encrypted payment processing",
    color: "from-blue-400 to-indigo-500",
    bgColor: "bg-gradient-to-br from-blue-100 to-indigo-100"
  },
  {
    icon: Headphones,
    title: "Customer Support",
    description: "Dedicated support team available 24/7",
    color: "from-green-400 to-teal-500",
    bgColor: "bg-gradient-to-br from-green-100 to-teal-100"
  },
  {
    icon: CheckCircle,
    title: "Easy Returns",
    description: "30-day return policy on all items",
    color: "from-purple-400 to-violet-500",
    bgColor: "bg-gradient-to-br from-purple-100 to-violet-100"
  }
];

export default function HomePage() {
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [loading, setLoading] = useState({
    categories: true,
    featured: true,
    trending: true
  });
  
  const { t } = useTranslation();

  // Fetch all data
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const categoriesRes = await axios.get("/categories/");
      setCategories(categoriesRes.data.slice(0, 4));
      setLoading(prev => ({ ...prev, categories: false }));
    } catch (err) {
      console.log("Error fetching categories:", err);
      setLoading(prev => ({ ...prev, categories: false }));
    }

    try {
      const featuredRes = await axios.get("/products/?featured=true");
      setFeaturedProducts(featuredRes.data);
      setLoading(prev => ({ ...prev, featured: false }));
    } catch (err) {
      console.log("Error fetching featured products:", err);
      setLoading(prev => ({ ...prev, featured: false }));
    }

    try {
      const trendingRes = await axios.get("/products/?trending=true");
      setTrendingProducts(trendingRes.data);
      setLoading(prev => ({ ...prev, trending: false }));
    } catch (err) {
      console.log("Error fetching trending products:", err);
      setLoading(prev => ({ ...prev, trending: false }));
    }
  };

  return (
    <div className="pt-16 bg-gradient-to-b from-rose-100 via-yellow-100 to-cyan-100">
      {/* Colorful background decorative elements with increased density */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-pink-300/40 to-rose-300/40 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -left-20 w-80 h-80 bg-gradient-to-r from-yellow-300/40 to-orange-300/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-300/40 to-blue-300/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/4 w-72 h-72 bg-gradient-to-r from-green-300/40 to-emerald-300/40 rounded-full blur-3xl"></div>
        <div className="absolute top-2/3 left-2/4 w-64 h-64 bg-gradient-to-r from-purple-300/40 to-violet-300/40 rounded-full blur-3xl"></div>
        <div className="absolute top-10 left-1/3 w-60 h-60 bg-gradient-to-r from-red-300/30 to-pink-300/30 rounded-full blur-3xl"></div>
      </div>

      {/* Hero Swiper - Classic Style */}
      <div className="relative">
          <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          pagination={{ 
            clickable: true, 
            dynamicBullets: true
          }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          effect="fade"
          speed={1000}
          loop={true}
          className="w-full h-[85vh] md:h-[80vh] lg:h-[85vh]"
        >
          {heroImages.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative w-full h-full group">
                <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent z-10"></div>
                <img 
                  src={slide.url} 
                  alt={t(`home.${slide.title}`)} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className={`absolute inset-0 bg-gradient-to-r ${slide.color} flex items-center z-20`}>
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="max-w-2xl transform transition-all duration-500 group-hover:translate-x-2">
                      <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full mb-6 hover:bg-white/30 transition-all duration-300 border border-white/30">
                        <Tag size={20} />
                        <span className="font-medium">{t(`home.${slide.subtitle}`)}</span>
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight drop-shadow-2xl">
                        {t(`home.${slide.title}`)}
                      </h1>
                      <p className="text-white/90 text-lg md:text-xl mb-8 max-w-lg leading-relaxed">
                        {t(`home.${slide.description}`)}
                      </p>
                      <Link
                        to="/products"
                        className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl group/btn"
                      >
                        {t(`home.${slide.buttonText}`)}
                        <ArrowRight className="w-5 h-5 transform group-hover/btn:translate-x-2 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}

          {/* Navigation Buttons */}
          <div className="swiper-button-prev absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 backdrop-blur-sm hover:bg-white/40 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-white/30">
            <ChevronLeft size={24} className="text-white" />
          </div>
          <div className="swiper-button-next absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 backdrop-blur-sm hover:bg-white/40 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-white/30">
            <ChevronRight size={24} className="text-white" />
          </div>
        </Swiper>

        {/* Trust Badges */}
        <div className="relative z-20 -mt-10 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
              {trustBadges.map((badge, index) => (
                <div 
                  key={index} 
                  className={`${badge.bgColor} rounded-xl shadow-lg p-3 md:p-4 flex items-center hover:shadow-xl transition-all duration-300 border border-white/80`}
                >
                  <div className={`bg-gradient-to-br ${badge.gradient}/30 p-2.5 md:p-3 rounded-lg mr-3 md:mr-4`}>
                    <badge.icon size={22} className={badge.iconColor} />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-gray-900 text-sm md:text-base mb-0.5">
                      {t(`home.${badge.title}`)}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-700">{t(`home.${badge.description}`)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <section className="py-10 md:py-12 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-100/60 via-yellow-100/40 to-pink-100/60 -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CategoriesSection
            title={t('navbar.shopByCategory')}
            subtitle={t('home.browseByCategory')}
            categories={categories}
            loading={loading.categories}
          />
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-10 md:py-12 bg-gradient-to-b from-blue-100/60 to-cyan-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProductsSection
            title={t('home.featuredProducts')}
            subtitle={t('home.handpickedItems')}
            products={featuredProducts}
            loading={loading.featured}
          />
        </div>
      </section>

      {/* Trending Products Section */}
      <section className="py-10 md:py-12 bg-gradient-to-b from-purple-100/60 to-pink-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProductsSection
            title={t('home.trendingProducts')}
            subtitle={t('home.mostPopular')}
            products={trendingProducts}
            loading={loading.trending}
          />
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-10 md:py-12 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-100/40 to-teal-100/40 -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white px-4 py-2 rounded-lg mb-4 shadow-md">
              <Star size={18} />
              <span className="font-medium text-sm md:text-base">Why Choose ShopEase</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Experience Premium Shopping</h2>
            <p className="text-gray-700 max-w-2xl mx-auto text-sm md:text-base">Benefits designed just for you</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`${feature.bgColor} rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/80 group`}
              >
                <div className={`bg-gradient-to-br ${feature.color} p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-3 shadow-md`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1.5">{feature.title}</h3>
                <p className="text-gray-700 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 md:pb-12">
        <div className="bg-gradient-to-r from-rose-400 via-pink-500 to-purple-500 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 p-5 md:p-6 lg:p-8">
              <div className="inline-flex items-center gap-2 bg-white/40 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg mb-4 border border-white/60 shadow">
                <Zap size={16} />
                <span className="font-medium text-sm">{t('home.limitedTimeOffer')}</span>
                <Sparkles className="w-3 h-3" />
              </div>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 leading-tight">
                {t('home.fiftyPercentOff')}
              </h2>
              <p className="text-white/95 text-sm md:text-base mb-5">
                {t('home.useCode')} <span className="font-bold text-yellow-300 animate-pulse">WELCOME50</span> {t('home.atCheckout')}
              </p>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-white text-gray-800 px-5 py-2.5 rounded-lg font-bold text-sm md:text-base hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl group/btn"
              >
                {t('home.shopNow')}
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transform group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="lg:w-1/2 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop"
                alt="Promotional"
                className="w-full h-40 md:h-48 lg:h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer Features Section */}
      <section className="bg-gradient-to-b from-cyan-100/60 to-blue-100/60 border-t border-white/50 py-10 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {footerFeatures.map((feature, index) => (
              <div key={index} className="text-center">
                <div className={`${feature.bgColor} w-14 h-14 mx-auto mb-3 rounded-full flex items-center justify-center shadow-md`}>
                  <div className={`bg-gradient-to-br ${feature.color} w-12 h-12 rounded-full flex items-center justify-center`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-1.5">{feature.title}</h3>
                <p className="text-gray-700 text-xs md:text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
          
          {/* Call to Action */}
          <div className="mt-10 text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-400 to-purple-400 text-white px-4 py-2 rounded-lg mb-3 shadow-md">
              <Sparkles size={16} />
              <span className="font-medium text-sm md:text-base">Ready to Start Shopping?</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Join Millions of Happy Customers</h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto text-sm md:text-base">Discover amazing products at unbeatable prices with our premium shopping experience.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/products"
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-5 py-2.5 rounded-lg font-bold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-md hover:shadow-lg text-sm md:text-base"
              >
                Browse All Products
              </Link>
              <Link
                to="/register"
                className="border-2 border-blue-400 text-blue-600 px-5 py-2.5 rounded-lg font-bold hover:bg-blue-50 transition-all duration-300 text-sm md:text-base"
              >
                Create Free Account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}