import { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/axios";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (user) fetchCart();
    else setCart([]);
  }, [user]);

  const fetchCart = async () => {
    const res = await api.get("cart/");
    setCart(res.data);
  };

  const addToCart = async (product, quantity = 1) => {
    if (!user) {
      navigate("/login");
      return;
    }

    try{
      await api.post("cart/add/", {
        product_id: product.id,
        quantity:quantity,
      });

      fetchCart(); // keep state in sync
      return { success: true };
    }
    catch (error) {
      console.error("Error adding to cart:", error);
      return { success: false, error: error.response?.data || "Failed to add to cart" };
    }
  };

  const removeFromCart = async (itemId) => {
    await api.delete(`cart/remove/${itemId}/`);
    fetchCart();
  };
  
  const clearCart = async () => {
    await api.post("cart/clear/");
    setCart([]);
  }

  const updateQuantity = async (itemId, quantity) => {
    await api.put(`cart/update/${itemId}/`, { quantity });
    fetchCart();
  }
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
