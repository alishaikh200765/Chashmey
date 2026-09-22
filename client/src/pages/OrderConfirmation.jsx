import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";
import TopStrip from "../components/TopStrip.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { fetchOrderById } from "../api/orders.js";

export default function OrderConfirmation() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrderById(id)
      .then(setOrder)
      .catch((err) => console.error("Failed to load order:", err))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div>
      <TopStrip />
      <Header />

      <div className="max-w-2xl mx-auto px-6 py-16 text-center">
        {loading ? (
          <p className="text-gray-500">Loading order...</p>
        ) : !order ? (
          <p className="text-gray-500">
            Order not found. <Link to="/" className="text-brand-primary underline">Go home</Link>
          </p>
        ) : (
          <>
            <FiCheckCircle className="text-brand-green text-5xl mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900">Order placed successfully</h1>
            <p className="text-gray-600 mt-2">
              Order ID: <span className="font-mono">{order._id}</span>
            </p>
            <p className="text-gray-600 mt-1">
              {order.paymentMethod === "cod"
                ? "Pay Rs " + order.total.toLocaleString() + " on delivery."
                : "We'll share bank transfer details to confirm your payment."}
            </p>

            <div className="bg-gray-50 rounded-lg p-6 mt-8 text-left">
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between text-sm py-1.5">
                  <span>
                    {item.name} × {item.qty}
                  </span>
                  <span>Rs {(item.price * item.qty).toLocaleString()}</span>
                </div>
              ))}
              <div className="border-t border-gray-200 mt-3 pt-3 flex justify-between font-bold">
                <span>Total</span>
                <span>Rs {order.total.toLocaleString()}</span>
              </div>
            </div>

            <Link
              to="/"
              className="inline-block bg-brand-primary text-white font-semibold px-6 py-3 rounded-md mt-8"
            >
              Continue Shopping
            </Link>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
