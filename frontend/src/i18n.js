import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        // Navbar Translations
        navbar: {
          home: "Home",
          shopByCategory: "Shop by Category",
          trending: "Trending",
          wishlist: "Wishlist",
          cart: "Cart",
          orders: "My Orders",
          profile: "My Profile",
          login: "Login",
          logout: "Logout",
          register: "Register",
          searchPlaceholder: "Search for products",
          allCategories: "All Categories",
          accountLists: "Account & Lists",
          signIn: "Sign In",
          signUp: "Sign Up",
          returnsOrders: "Returns & Orders",
          myWishlist: "My Wishlist",
          myProfile: "My Profile",
          myOrders: "My Orders",
          signOut: "Sign Out",
          language: "Language",
        },

        // Home Page Translations
        home: {
          // Hero Slides
          upTo70Off: "Up to 70% Off",
          summerCollection: "Summer Collection",
          discoverDeals: "Discover amazing deals on premium products",
          newArrivals: "New Arrivals",
          fashionCollection: "Fashion Collection",
          trendyOutfits: "Trendy outfits for every occasion",
          techRevolution: "Tech Revolution",
          premiumElectronics: "Premium Electronics",
          latestGadgets: "Latest gadgets at unbeatable prices",
          
          // Button Texts
          shopNow: "Shop Now",
          explore: "Explore",
          discover: "Discover",
          
          // Trust Badges
          securePayment: "Secure Payment",
          secureTransactions: "100% secure transactions",
          freeShipping: "Free Shipping",
          freeShippingDesc: "On orders above ₹999",
          fastDelivery: "Fast Delivery",
          fastDeliveryDesc: "Across India",
          
          // Section Titles & Subtitles
          trendingProducts: "Trending Products",
          featuredProducts: "Featured Products",
          viewAll: "View All",
          noProducts: "No products found",
          browseByCategory: "Browse products by category",
          handpickedItems: "Handpicked items just for you",
          mostPopular: "Most popular items",
          
          // Promotional Banner
          limitedTimeOffer: "Limited Time Offer",
          fiftyPercentOff: "Get 50% Off On Your First Order",
          useCode: "Use code",
          atCheckout: "at checkout",
          
          // Other
          allProducts: "All Products",
          limitedTime: "Limited Time",
          welcomeOffer: "Welcome Offer",
        },

        // Auth Translations
        auth: {
          loginTitle: "Login to your account",
          registerTitle: "Create an account",
          email: "Email",
          password: "Password",
          confirmPassword: "Confirm Password",
          forgotPassword: "Forgot Password?",
          loginButton: "Login",
          registerButton: "Register",
          helloSignIn: "Hello, sign in",
          createAccount: "Create Account",
        },

        // Profile Translations
        profile: {
          title: "My Profile",
          editProfile: "Edit Profile",
          saveChanges: "Save Changes",
          address: "Address",
          phone: "Phone Number",
          welcomeBack: "Welcome back!",
        },

        // Orders Translations
        orders: {
          title: "My Orders",
          orderId: "Order ID",
          status: "Status",
          totalAmount: "Total Amount",
          placedOn: "Placed On",
          noOrders: "You have no orders yet",
          returns: "Returns",
        },

        // Wishlist Translations
        wishlist: {
          title: "My Wishlist",
          empty: "Your wishlist is empty",
          moveToCart: "Move to Cart",
          remove: "Remove",
          myWishlist: "My Wishlist",
        },

        // Cart Translations
        cart: {
          title: "My Cart",
          empty: "Your cart is empty",
          checkout: "Proceed to Checkout",
          total: "Total",
          quantity: "Quantity",
          cart: "Cart",
        },

        // Common Translations
        common: {
          loading: "Loading...",
          error: "Something went wrong",
          retry: "Retry",
          yes: "Yes",
          no: "No",
          submit: "Submit",
          cancel: "Cancel",
          hello: "Hello",
          welcomeBack: "Welcome back!",
          
          // Category Names
          electronics: "Electronics",
          fashion: "Fashion",
          homeKitchen: "Home & Kitchen",
          beauty: "Beauty",
          groceries: "Groceries",
          sports: "Sports",
          books: "Books",
          
          // Other Common Terms
          search: "Search",
          categories: "Categories",
          products: "Products",
          price: "Price",
          description: "Description",
          addToCart: "Add to Cart",
          buyNow: "Buy Now",
          outOfStock: "Out of Stock",
          inStock: "In Stock",
          rating: "Rating",
          reviews: "Reviews",
          viewDetails: "View Details",
          continueShopping: "Continue Shopping",
          proceedToCheckout: "Proceed to Checkout",
          apply: "Apply",
          clear: "Clear",
          filter: "Filter",
          sortBy: "Sort By",
          popular: "Popular",
          new: "New",
          discount: "Discount",
          bestSeller: "Best Seller",
          featured: "Featured",
          trending: "Trending",
        }
      }
    },

    hi: {
      translation: {
        // Navbar Translations
        navbar: {
          home: "होम",
          shopByCategory: "श्रेणी के अनुसार खरीदें",
          trending: "ट्रेंडिंग",
          wishlist: "इच्छा-सूची",
          cart: "कार्ट",
          orders: "मेरे ऑर्डर",
          profile: "मेरी प्रोफ़ाइल",
          login: "लॉगिन",
          logout: "लॉगआउट",
          register: "रजिस्टर",
          searchPlaceholder: "उत्पाद खोजें",
          allCategories: "सभी श्रेणियाँ",
          accountLists: "खाता और सूचियाँ",
          signIn: "साइन इन",
          signUp: "साइन अप",
          returnsOrders: "वापसी और ऑर्डर",
          myWishlist: "मेरी इच्छा-सूची",
          myProfile: "मेरी प्रोफ़ाइल",
          myOrders: "मेरे ऑर्डर",
          signOut: "साइन आउट",
          language: "भाषा",
        },

        // Home Page Translations
        home: {
          // Hero Slides
          upTo70Off: "70% तक की छूट",
          summerCollection: "समर कलेक्शन",
          discoverDeals: "प्रीमियम उत्पादों पर अद्भुत डील्स खोजें",
          newArrivals: "नए आगमन",
          fashionCollection: "फैशन कलेक्शन",
          trendyOutfits: "हर अवसर के लिए ट्रेंडी आउटफिट",
          techRevolution: "टेक रिवोल्यूशन",
          premiumElectronics: "प्रीमियम इलेक्ट्रॉनिक्स",
          latestGadgets: "अनबीटेबल कीमतों पर नवीनतम गैजेट्स",
          
          // Button Texts
          shopNow: "अभी खरीदें",
          explore: "एक्सप्लोर करें",
          discover: "खोजें",
          
          // Trust Badges
          securePayment: "सुरक्षित भुगतान",
          secureTransactions: "100% सुरक्षित लेनदेन",
          freeShipping: "मुफ्त शिपिंग",
          freeShippingDesc: "₹999 से अधिक के ऑर्डर पर",
          fastDelivery: "तेज़ डिलीवरी",
          fastDeliveryDesc: "पूरे भारत में",
          
          // Section Titles & Subtitles
          trendingProducts: "ट्रेंडिंग उत्पाद",
          featuredProducts: "विशेष उत्पाद",
          viewAll: "सभी देखें",
          noProducts: "कोई उत्पाद नहीं मिला",
          browseByCategory: "श्रेणी के अनुसार उत्पाद ब्राउज़ करें",
          handpickedItems: "आपके लिए विशेष रूप से चुने गए आइटम",
          mostPopular: "सबसे लोकप्रिय आइटम",
          
          // Promotional Banner
          limitedTimeOffer: "सीमित समय ऑफर",
          fiftyPercentOff: "अपने पहले ऑर्डर पर 50% छूट पाएं",
          useCode: "कोड का उपयोग करें",
          atCheckout: "चेकआउट पर",
          
          // Other
          allProducts: "सभी उत्पाद",
          limitedTime: "सीमित समय",
          welcomeOffer: "वेलकम ऑफर",
        },

        // Auth Translations
        auth: {
          loginTitle: "अपने खाते में लॉगिन करें",
          registerTitle: "नया खाता बनाएँ",
          email: "ईमेल",
          password: "पासवर्ड",
          confirmPassword: "पासवर्ड की पुष्टि करें",
          forgotPassword: "पासवर्ड भूल गए?",
          loginButton: "लॉगिन",
          registerButton: "रजिस्टर",
          helloSignIn: "नमस्ते, साइन इन करें",
          createAccount: "खाता बनाएँ",
        },

        // Profile Translations
        profile: {
          title: "मेरी प्रोफ़ाइल",
          editProfile: "प्रोफ़ाइल संपादित करें",
          saveChanges: "परिवर्तन सहेजें",
          address: "पता",
          phone: "फ़ोन नंबर",
          welcomeBack: "वापसी पर स्वागत है!",
        },

        // Orders Translations
        orders: {
          title: "मेरे ऑर्डर",
          orderId: "ऑर्डर आईडी",
          status: "स्थिति",
          totalAmount: "कुल राशि",
          placedOn: "ऑर्डर की तिथि",
          noOrders: "आपके पास कोई ऑर्डर नहीं है",
          returns: "वापसी",
        },

        // Wishlist Translations
        wishlist: {
          title: "मेरी इच्छा-सूची",
          empty: "आपकी इच्छा-सूची खाली है",
          moveToCart: "कार्ट में डालें",
          remove: "हटाएँ",
          myWishlist: "मेरी इच्छा-सूची",
        },

        // Cart Translations
        cart: {
          title: "मेरा कार्ट",
          empty: "आपका कार्ट खाली है",
          checkout: "चेकआउट करें",
          total: "कुल",
          quantity: "मात्रा",
          cart: "कार्ट",
        },

        // Common Translations
        common: {
          loading: "लोड हो रहा है...",
          error: "कुछ गलत हो गया",
          retry: "पुनः प्रयास करें",
          yes: "हाँ",
          no: "नहीं",
          submit: "जमा करें",
          cancel: "रद्द करें",
          hello: "नमस्ते",
          welcomeBack: "वापसी पर स्वागत है!",
          
          // Category Names
          electronics: "इलेक्ट्रॉनिक्स",
          fashion: "फैशन",
          homeKitchen: "घर और रसोई",
          beauty: "ब्यूटी",
          groceries: "किराना सामग्री",
          sports: "स्पोर्ट्स",
          books: "बुक्स",
          
          // Other Common Terms
          search: "खोज",
          categories: "श्रेणियाँ",
          products: "उत्पाद",
          price: "कीमत",
          description: "विवरण",
          addToCart: "कार्ट में जोड़ें",
          buyNow: "अभी खरीदें",
          outOfStock: "स्टॉक खत्म",
          inStock: "स्टॉक में उपलब्ध",
          rating: "रेटिंग",
          reviews: "समीक्षाएँ",
          viewDetails: "विवरण देखें",
          continueShopping: "खरीदारी जारी रखें",
          proceedToCheckout: "चेकआउट करें",
          apply: "लागू करें",
          clear: "साफ करें",
          filter: "फ़िल्टर",
          sortBy: "क्रमबद्ध करें",
          popular: "लोकप्रिय",
          new: "नया",
          discount: "छूट",
          bestSeller: "बेस्ट सेलर",
          featured: "फीचर्ड",
          trending: "ट्रेंडिंग",
        }
      }
    },

    kn: {
      translation: {
        // Navbar Translations
        navbar: {
          home: "ಮುಖಪುಟ",
          shopByCategory: "ವರ್ಗದಂತೆ ಖರೀದಿಸಿ",
          trending: "ಟ್ರೆಂಡಿಂಗ್",
          wishlist: "ಇಚ್ಛಾಪಟ್ಟಿ",
          cart: "ಕಾರ್ಟ್",
          orders: "ನನ್ನ ಆರ್ಡರ್‌ಗಳು",
          profile: "ನನ್ನ ಪ್ರೊಫೈಲ್",
          login: "ಲಾಗಿನ್",
          logout: "ಲಾಗ್‌ಔಟ್",
          register: "ನೋಂದಣಿ",
          searchPlaceholder: "ಉತ್ಪನ್ನಗಳನ್ನು ಹುಡುಕಿ",
          allCategories: "ಎಲ್ಲಾ ವರ್ಗಗಳು",
          accountLists: "ಖಾತೆ ಮತ್ತು ಪಟ್ಟಿಗಳು",
          signIn: "ಸೈನ್ ಇನ್",
          signUp: "ಸೈನ್ ಅಪ್",
          returnsOrders: "ರಿಟರ್ನ್‌ಗಳು ಮತ್ತು ಆರ್ಡರ್‌ಗಳು",
          myWishlist: "ನನ್ನ ಇಚ್ಛಾಪಟ್ಟಿ",
          myProfile: "ನನ್ನ ಪ್ರೊಫೈಲ್",
          myOrders: "ನನ್ನ ಆರ್ಡರ್‌ಗಳು",
          signOut: "ಸೈನ್ ಔಟ್",
          language: "ಭಾಷೆ",
        },

        // Home Page Translations
        home: {
          // Hero Slides
          upTo70Off: "70% ರಿಯಾಯಿತಿ",
          summerCollection: "ಬೇಸಿಗೆ ಸಂಗ್ರಹ",
          discoverDeals: "ಪ್ರೀಮಿಯಂ ಉತ್ಪನ್ನಗಳಲ್ಲಿ ಅದ್ಭುತ ಡೀಲ್‌ಗಳನ್ನು کشف करें",
          newArrivals: "ಹೊಸ ಆಗಮನಗಳು",
          fashionCollection: "ಫ್ಯಾಷನ್ ಸಂಗ್ರಹ",
          trendyOutfits: "ಪ್ರತಿ ಸಂದರ್ಭಕ್ಕೂ ಟ್ರೆಂಡಿ ಉಡುಗೆಗಳು",
          techRevolution: "ಟೆಕ್ ರಿವೊಲ್ಯೂಷನ್",
          premiumElectronics: "ಪ್ರೀಮಿಯಂ ಎಲೆಕ್ಟ್ರಾನಿಕ್ಸ್",
          latestGadgets: "ಸೋಲಿಸಲಾಗದ ಬೆಲೆಗಳಲ್ಲಿ ಇತ್ತೀಚಿನ ಗ್ಯಾಜೆಟ್‌ಗಳು",
          
          // Button Texts
          shopNow: "ಈಗ ಖರೀದಿಸಿ",
          explore: "ಅನ್ವೇಷಿಸಿ",
          discover: "ಡಿಸ್ಕವರ್",
          
          // Trust Badges
          securePayment: "ಸುರಕ್ಷಿತ ಪಾವತಿ",
          secureTransactions: "100% ಸುರಕ್ಷಿತ ವ್ಯವಹಾರಗಳು",
          freeShipping: "ಉಚಿತ ಶಿಪ್ಪಿಂಗ್",
          freeShippingDesc: "₹999 ಕ್ಕಿಂತ ಹೆಚ್ಚಿನ ಆರ್ಡರ್‌ಗಳ ಮೇಲೆ",
          fastDelivery: "ತ್ವರಿತ ಡೆಲಿವರಿ",
          fastDeliveryDesc: "ಭಾರತದಾದ್ಯಂತ",
          
          // Section Titles & Subtitles
          trendingProducts: "ಟ್ರೆಂಡಿಂಗ್ ಉತ್ಪನ್ನಗಳು",
          featuredProducts: "ವಿಶೇಷ ಉತ್ಪನ್ನಗಳು",
          viewAll: "ಎಲ್ಲವನ್ನೂ ನೋಡಿ",
          noProducts: "ಯಾವುದೇ ಉತ್ಪನ್ನಗಳು ಲಭ್ಯವಿಲ್ಲ",
          browseByCategory: "ವರ್ಗದಂತೆ ಉತ್ಪನ್ನಗಳನ್ನು ಬ್ರೌಸ್ ಮಾಡಿ",
          handpickedItems: "ನಿಮಗಾಗಿ ವಿಶೇಷವಾಗಿ ಆಯ್ಕೆ ಮಾಡಲಾದ ಐಟಂಗಳು",
          mostPopular: "ಅತ್ಯಂತ ಜನಪ್ರಿಯ ಐಟಂಗಳು",
          
          // Promotional Banner
          limitedTimeOffer: "ಸೀಮಿತ ಸಮಯದ offer",
          fiftyPercentOff: "ನಿಮ್ಮ ಮೊದಲ ಆರ್ಡರ್‌ನಲ್ಲಿ 50% ರಿಯಾಯಿತಿ ಪಡೆಯಿರಿ",
          useCode: "ಕೋಡ್ ಬಳಸಿ",
          atCheckout: "ಚೆಕ್ಔಟ್‌ನಲ್ಲಿ",
          
          // Other
          allProducts: "ಎಲ್ಲಾ ಉತ್ಪನ್ನಗಳು",
          limitedTime: "ಸೀಮಿತ ಸಮಯ",
          welcomeOffer: "ಸ್ವಾಗತ offer",
        },

        // Auth Translations
        auth: {
          loginTitle: "ನಿಮ್ಮ ಖಾತೆಗೆ ಲಾಗಿನ್ ಮಾಡಿ",
          registerTitle: "ಹೊಸ ಖಾತೆ ರಚಿಸಿ",
          email: "ಇಮೇಲ್",
          password: "ಪಾಸ್ವರ್ಡ್",
          confirmPassword: "ಪಾಸ್ವರ್ಡ್ ದೃಢೀಕರಿಸಿ",
          forgotPassword: "ಪಾಸ್ವರ್ಡ್ ಮರೆತಿರಾ?",
          loginButton: "ಲಾಗಿನ್",
          registerButton: "ನೋಂದಣಿ",
          helloSignIn: "ನಮಸ್ಕಾರ, ಸೈನ್ ಇನ್ ಮಾಡಿ",
          createAccount: "ಖಾತೆ ರಚಿಸಿ",
        },

        // Profile Translations
        profile: {
          title: "ನನ್ನ ಪ್ರೊಫೈಲ್",
          editProfile: "ಪ್ರೊಫೈಲ್ ಸಂಪಾದಿಸಿ",
          saveChanges: "ಬದಲಾವಣೆಗಳನ್ನು ಉಳಿಸಿ",
          address: "ವಿಳಾಸ",
          phone: "ದೂರವಾಣಿ ಸಂಖ್ಯೆ",
          welcomeBack: "ಮರಳಿ ಸ್ವಾಗತ!",
        },

        // Orders Translations
        orders: {
          title: "ನನ್ನ ಆರ್ಡರ್‌ಗಳು",
          orderId: "ಆರ್ಡರ್ ಐಡಿ",
          status: "ಸ್ಥಿತಿ",
          totalAmount: "ಒಟ್ಟು ಮೊತ್ತ",
          placedOn: "ಆರ್ಡರ್ ಮಾಡಿದ ದಿನ",
          noOrders: "ನೀವು ಯಾವುದೇ ಆರ್ಡರ್ ಮಾಡಿಲ್ಲ",
          returns: "ರಿಟರ್ನ್‌ಗಳು",
        },

        // Wishlist Translations
        wishlist: {
          title: "ನನ್ನ ಇಚ್ಛಾಪಟ್ಟಿ",
          empty: "ನಿಮ್ಮ ಇಚ್ಛಾಪಟ್ಟಿ ಖಾಲಿಯಾಗಿದೆ",
          moveToCart: "ಕಾರ್ಟ್‌ಗೆ ಸೇರಿಸಿ",
          remove: "ತೆಗೆದುಹಾಕಿ",
          myWishlist: "ನನ್ನ ಇಚ್ಛಾಪಟ್ಟಿ",
        },

        // Cart Translations
        cart: {
          title: "ನನ್ನ ಕಾರ್ಟ್",
          empty: "ನಿಮ್ಮ ಕಾರ್ಟ್ ಖಾಲಿಯಾಗಿದೆ",
          checkout: "ಚೆಕ್‌ಔಟ್",
          total: "ಒಟ್ಟು",
          quantity: "ಪ್ರಮಾಣ",
          cart: "ಕಾರ್ಟ್",
        },

        // Common Translations
        common: {
          loading: "ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
          error: "ಏನೋ ತಪ್ಪಾಗಿದೆ",
          retry: "ಮರುಪ್ರಯತ್ನಿಸಿ",
          yes: "ಹೌದು",
          no: "ಇಲ್ಲ",
          submit: "ಸಲ್ಲಿಸು",
          cancel: "ರದ್ದುಮಾಡಿ",
          hello: "ನಮಸ್ಕಾರ",
          welcomeBack: "ಮರಳಿ ಸ್ವಾಗತ!",
          
          // Category Names
          electronics: "ಎಲೆಕ್ಟ್ರಾನಿಕ್ಸ್",
          fashion: "ಫ್ಯಾಷನ್",
          homeKitchen: "ಮನೆ ಮತ್ತು ಅಡಿಗೆ",
          beauty: "ಬ್ಯೂಟಿ",
          groceries: "ಕಿರಾಣಿ ಸಾಮಗ್ರಿಗಳು",
          sports: "ಕ್ರೀಡೆಗಳು",
          books: "ಪುಸ್ತಕಗಳು",
          
          // Other Common Terms
          search: "ಹುಡುಕು",
          categories: "ವರ್ಗಗಳು",
          products: "ಉತ್ಪನ್ನಗಳು",
          price: "ಬೆಲೆ",
          description: "ವಿವರಣೆ",
          addToCart: "ಕಾರ್ಟ್‌ಗೆ ಸೇರಿಸಿ",
          buyNow: "ಈಗ ಖರೀದಿಸಿ",
          outOfStock: "ಸ್ಟಾಕ್ ಮುಗಿದಿದೆ",
          inStock: "ಸ್ಟಾಕ್‌ನಲ್ಲಿ ಲಭ್ಯವಿದೆ",
          rating: "ರೇಟಿಂಗ್",
          reviews: "ವಿಮರ್ಶೆಗಳು",
          viewDetails: "ವಿವರಗಳನ್ನು ನೋಡಿ",
          continueShopping: "ಶಾಪಿಂಗ್ ಮುಂದುವರಿಸಿ",
          proceedToCheckout: "ಚೆಕ್ಔಟ್‌ಗೆ ಮುಂದುವರಿಸಿ",
          apply: "ಅನ್ವಯಿಸಿ",
          clear: "ತೆರವುಗೊಳಿಸಿ",
          filter: "ಫಿಲ್ಟರ್",
          sortBy: "ವಿಂಗಡಿಸಿ",
          popular: "ಜನಪ್ರಿಯ",
          new: "ಹೊಸ",
          discount: "ರಿಯಾಯಿತಿ",
          bestSeller: "ಅತ್ಯುತ್ತಮ ವಿಕ್ರೇತ",
          featured: "ವಿಶೇಷ",
          trending: "ಟ್ರೆಂಡಿಂಗ್",
        }
      }
    }
  },

  lng: typeof window !== 'undefined' ? localStorage.getItem("lang") || "en" : "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;