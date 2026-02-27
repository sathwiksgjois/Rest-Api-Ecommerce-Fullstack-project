import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CartSummary() {
  const { cart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="p-6 border rounded-lg bg-white shadow-sm h-fit">
      <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

      <div className="flex justify-between mb-2">
        <span>Total Items</span>
        <span>{cart.length}</span>
      </div>

      <div className="flex justify-between mb-4 font-semibold">
        <span>Total Price</span>
        <span>₹ {total}</span>
      </div>

      <button
        onClick={() => navigate("/checkout")}
        className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
      >
        Proceed to Checkout
      </button>
    </div>
  );
}
