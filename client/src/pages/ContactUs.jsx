import { useState } from "react";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import TopStrip from "../components/TopStrip.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { sendContactMessage } from "../api/contact.js";

export default function ContactUs() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await sendContactMessage(form);
      setStatus("sent");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error("Failed to send message:", err);
      setStatus("error");
    }
  };

  return (
    <div>
      <TopStrip />
      <Header />

      <div className="max-w-3xl mx-auto px-6 mt-10 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Need Help/Write Suggestion</h1>
        <p className="text-gray-600 mt-3 text-sm">
          If you have any questions, please feel free to drop us a line. We will respond as soon as
          we can. Please leave a daytime number to speed up the process, or simply call our customer
          service.
        </p>

        <div className="flex flex-wrap justify-center gap-12 mt-10">
          <div className="flex flex-col items-center gap-2">
            <FiMail className="text-brand-primary text-2xl" />
            <a href="mailto:sales@chashmey.pk" className="font-semibold text-gray-800 text-sm">
              sales@chashmey.pk
            </a>
          </div>
          <div className="flex flex-col items-center gap-2 max-w-xs">
            <FiMapPin className="text-brand-primary text-2xl" />
            <p className="font-semibold text-gray-800 text-sm">
              Shop #1, Chashmey Plaza, Gulberg, Lahore, Pakistan
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <FiPhone className="text-brand-primary text-2xl" />
            <a href="tel:+923001234567" className="font-semibold text-gray-800 text-sm">
              +92 300 1234567
            </a>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto px-6 mt-12 mb-16 space-y-4">
        <h2 className="font-semibold text-gray-800 text-center mb-2">Send us a message</h2>
        <input
          required
          placeholder="Your name"
          value={form.name}
          onChange={handleChange("name")}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
        />
        <input
          required
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange("email")}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
        />
        <input
          placeholder="Phone (optional)"
          value={form.phone}
          onChange={handleChange("phone")}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
        />
        <textarea
          required
          rows={4}
          placeholder="How can we help?"
          value={form.message}
          onChange={handleChange("message")}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full bg-brand-primary text-white font-semibold rounded-md py-3 disabled:opacity-60"
        >
          {status === "sending" ? "Sending..." : "Send Message"}
        </button>
        {status === "sent" && (
          <p className="text-sm text-brand-green text-center">
            Thanks — your message has been sent. We'll get back to you soon.
          </p>
        )}
        {status === "error" && (
          <p className="text-sm text-red-600 text-center">
            Something went wrong sending your message. Please try again.
          </p>
        )}
      </form>

      <Footer />
    </div>
  );
}
