import api from "../utils/axios";
import { useAuth } from "../context/AuthContext";
const downloadInvoice = async (orderId) => {
  try {
    const res = await api.get(`/orders/${orderId}/invoice/`, {
      responseType: "blob", // important for files
    });

    // Create a link element to trigger download
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `invoice_${orderId}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url); // free memory
  } catch (err) {
    console.error("Failed to download invoice", err);
    alert("Failed to download invoice. Are you logged in?");
  }
};
export default downloadInvoice;