import { Link } from "react-router-dom";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Mail, 
  Heart,
  CreditCard,
  Shield,
  Truck
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Categories", path: "/categories" },
    { name: "New Arrivals", path: "/products?ordering=-created_at" },
  ];

  const supportLinks = [
    { name: "Help Center", path: "/help" },
    { name: "Track Order", path: "/orders" },
    { name: "Returns", path: "/returns" },
    { name: "Shipping", path: "/shipping" },
  ];

  const companyLinks = [
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Blog", path: "/blog" },
    { name: "Careers", path: "/careers" },
  ];

  const socialLinks = [
    { icon: <Facebook size={18} />, name: "Facebook", url: "#" },
    { icon: <Twitter size={18} />, name: "Twitter", url: "#" },
    { icon: <Instagram size={18} />, name: "Instagram", url: "#" },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white mt-20">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white px-3 py-1.5 rounded-lg font-bold text-2xl tracking-tighter">
                ShopEase
              </div>
            </Link>
            <p className="text-gray-300 text-sm mb-6">
              Premium shopping experience. Quality products at affordable prices.
            </p>
            <div className="flex items-center text-gray-300 mb-4">
              <Mail className="w-4 h-4 mr-2 text-blue-400" />
              <span className="text-sm">support@shopease.com</span>
            </div>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 hover:text-blue-400 transition-all duration-200"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-white text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-white text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-white text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Trust Badges - Compact */}
        <div className="mt-10 pt-8 border-t border-gray-700">
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-400" />
              <span className="text-sm text-gray-300">Secure Payment</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-green-400" />
              <span className="text-sm text-gray-300">Free Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-purple-400" />
              <span className="text-sm text-gray-300">Easy Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <p className="text-gray-400 text-sm">
                © {currentYear} ShopEase. All rights reserved.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms
              </Link>
              <Link to="/cookies" className="text-gray-400 hover:text-white transition-colors">
                Cookies
              </Link>
            </div>
            
            <div>
              <p className="text-gray-400 text-sm flex items-center gap-1">
                Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}