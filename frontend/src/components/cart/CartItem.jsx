import { useCart } from "../../context/CartContext";
import { Minus, Plus, Trash2 } from "lucide-react";

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleIncrease = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  // Get full image URL
  const getImageUrl = () => {
    const imagePath = item?.product?.image;
    if (!imagePath) return null;
    
    if (imagePath.startsWith('/media/')) {
      return `http://localhost:8000${imagePath}`; // Change to your backend URL
    }
    return imagePath;
  };

  const imageUrl = getImageUrl();

  return (
    <div className="flex gap-4 p-4 border rounded-lg bg-white">
      <img
        src={imageUrl || "/placeholder.jpg"}
        alt={item.product?.name}
        className="w-24 h-24 object-cover rounded"
      />

      <div className="flex-1">
        <h3 className="font-semibold">{item.product?.name}</h3>
        <p className="text-gray-600">₹ {item.product?.price}</p>

        <div className="flex items-center gap-3 mt-3">
          <button
            onClick={handleDecrease}
            disabled={item.quantity <= 1}
            className="w-8 h-8 flex items-center justify-center border rounded"
          >
            <Minus className="w-4 h-4" />
          </button>

          <span>{item.quantity}</span>

          <button
            onClick={handleIncrease}
            className="w-8 h-8 flex items-center justify-center border rounded"
          >
            <Plus className="w-4 h-4" />
          </button>

          <button
            onClick={handleRemove}
            className="ml-4 flex items-center gap-2 text-red-500"
          >
            <Trash2 className="w-4 h-4" />
            Remove
          </button>
        </div>
      </div>

      <div className="font-semibold">
        ₹ {item.product?.price * item.quantity}
      </div>
    </div>
  );
}