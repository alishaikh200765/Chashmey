import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import TopStrip from "../components/TopStrip.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { useCart } from "../context/CartContext.jsx";
import { createOrder } from "../api/orders.js";

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", city: "" });
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const discount = paymentMethod === "bank-transfer" ? Math.round(subtotal * 0.15) : 0;
  const total = subtotal - discount;

  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const order = await createOrder({
        items: items.map((i) => ({
          productId: i.productId,
          name: i.name,
          price: i.price,
          qty: i.qty,
          color: i.color,
          size: i.size,
          lensSummary: i.lens?.summary || null,
        })),
        customer: form,
        paymentMethod,
        subtotal,
        discount,
        total,
      });
      clearCart();
      navigate(`/order-confirmation/${order._id}`);
    } catch (err) {
      console.error("Order failed:", err);
      setError(err.response?.data?.message || "Something went wrong placing your order.");
    } finally {
      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div>
        <TopStrip />
        <Header />
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <p className="text-gray-600">Your cart is empty — nothing to check out.</p>
          <Link to="/" className="text-brand-primary underline mt-2 inline-block">
            Return to shop
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <TopStrip />
      <Header />

      <div className="max-w-6xl mx-auto px-6 mt-10 mb-16 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10">
        <form onSubmit={handleSubmit}>
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h1>

          <h2 className="font-semibold text-gray-800 mb-3">Delivery Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              required
              placeholder="Full name"
              value={form.name}
              onChange={handleChange("name")}
              className="border border-gray-300 rounded px-3 py-2 text-sm"
            />
            <input
              required
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange("phone")}
              className="border border-gray-300 rounded px-3 py-2 text-sm"
            />
            <input
              type="email"
              placeholder="Email (optional)"
              value={form.email}
              onChange={handleChange("email")}
              className="border border-gray-300 rounded px-3 py-2 text-sm sm:col-span-2"
            />
            <input
              required
              placeholder="Address"
              value={form.address}
              onChange={handleChange("address")}
              className="border border-gray-300 rounded px-3 py-2 text-sm sm:col-span-2"
            />
            <input
              required
              placeholder="City"
              value={form.city}
              onChange={handleChange("city")}
              className="border border-gray-300 rounded px-3 py-2 text-sm"
            />
          </div>

          <h2 className="font-semibold text-gray-800 mt-8 mb-3">Payment Method</h2>
          <div className="space-y-3">
            <label className="flex items-center gap-3 border border-gray-200 rounded-md px-4 py-3 cursor-pointer">
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
              />
              <span className="text-sm font-medium">Cash on Delivery</span>
            </label>
            <label className="flex items-center gap-3 border border-gray-200 rounded-md px-4 py-3 cursor-pointer">
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === "bank-transfer"}
                onChange={() => setPaymentMethod("bank-transfer")}
              />
              <span className="text-sm font-medium">
                Bank Transfer <span className="text-brand-gold">— get 15% off</span>
              </span>
            </label>
          </div>

          {error && <p className="text-sm text-red-600 mt-4">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-brand-primary text-white font-semibold rounded-md py-3 mt-8 disabled:opacity-60"
          >
            {submitting ? "Placing order..." : "Place Order"}
          </button>
        </form>

        {/* Order summary */}
        <div className="bg-gray-50 rounded-lg p-6 h-fit">
          <h2 className="font-semibold text-gray-800 mb-4">Order Summary</h2>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.lineId} className="flex gap-3">
                <img src={item.image} alt={item.name} className="w-14 h-14 object-contain bg-white rounded" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{item.name}</p>
                  <p className="text-xs text-gray-500">
                    Qty {item.qty} · Size {item.size}
                  </p>
                  {item.lens && <p className="text-xs text-brand-primary">Lens: {item.lens.summary}</p>}
                </div>
                <p className="text-sm font-semibold text-gray-900">
                  Rs {(item.price * item.qty).toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 mt-4 pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>Rs {subtotal.toLocaleString()}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-brand-gold">
                <span>Bank transfer discount (15%)</span>
                <span>− Rs {discount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-gray-900 text-base pt-2 border-t border-gray-200">
              <span>Total</span>
              <span>Rs {total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
