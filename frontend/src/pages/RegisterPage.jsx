import { useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, CheckCircle, ArrowRight } from "lucide-react";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // 🔒 basic frontend validation
    if (!form.username || !form.password) {
      setError("Username and password are required");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    try {
      await axios.post("/users/register/", form);
      setSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error(err.response?.data);

      // Show Django validation message
      if (err.response?.data) {
        const firstError = Object.values(err.response.data)[0];
        setError(Array.isArray(firstError) ? firstError[0] : firstError);
      } else {
        setError("Registration failed");
      }
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-blue-500 p-8 text-center text-white">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold mb-2">Join ShopEase</h2>
            <p className="text-green-100">Create your account in seconds</p>
          </div>

          {/* Form */}
          <div className="p-8">
            {success ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Registration Successful!</h3>
                <p className="text-gray-600 mb-6">Your account has been created successfully.</p>
                <div className="animate-pulse text-sm text-gray-500">
                  Redirecting to login...
                </div>
              </div>
            ) : (
              <>
                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-red-600 text-sm text-center font-medium">{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Username
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        value={form.username}
                        placeholder="Choose a username"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                        onChange={(e) =>
                          setForm({ ...form, username: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        value={form.email}
                        placeholder="Enter your email (optional)"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        type="email"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">We'll never share your email with anyone else.</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="password"
                        value={form.password}
                        placeholder="Create a strong password"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                        onChange={(e) =>
                          setForm({ ...form, password: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="mt-2">
                      <div className="flex items-center mb-1">
                        <div className={`w-1/3 h-1 rounded-full ${form.password.length >= 8 ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                        <div className={`w-1/3 h-1 mx-1 rounded-full ${/[A-Z]/.test(form.password) && /[a-z]/.test(form.password) ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                        <div className={`w-1/3 h-1 rounded-full ${/\d/.test(form.password) ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                      </div>
                      <p className="text-xs text-gray-500">
                        Use at least 8 characters with uppercase, lowercase and numbers
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="terms"
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      required
                    />
                    <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                      I agree to the{" "}
                      <a href="#" className="text-green-600 hover:text-green-800 font-medium">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-green-600 hover:text-green-800 font-medium">
                        Privacy Policy
                      </a>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center group"
                  >
                    Create Account
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <p className="text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <a
                      href="/login"
                      className="text-green-600 hover:text-green-800 font-semibold"
                    >
                      Sign in here
                    </a>
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}