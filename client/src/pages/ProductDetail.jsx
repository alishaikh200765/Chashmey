import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FiTruck, FiRotateCw } from "react-icons/fi";
import TopStrip from "../components/TopStrip.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { fetchProductById } from "../api/products.js";
import { useCart } from "../context/CartContext.jsx";
import ContactLensDetail from "../components/ContactLensDetail.jsx";

const badgeStyles = {
  New: "bg-brand-green text-white",
  Premium: "bg-brand-gold text-white",
  "Hot selling": "bg-brand-blue text-white",
  Polarized: "bg-brand-blue text-white",
};

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("details");
  const [selectedColor, setSelectedColor] = useState(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setLoading(true);
    setAdded(false);
    fetchProductById(id)
      .then((data) => {
        setProduct(data);
        setSelectedColor(data.colorSwatches?.[0] || null);
      })
      .catch((err) => console.error("Failed to load product:", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div>
        <TopStrip text="Pay with bank transfer and get upto 15% off" />
        <Header />
        <div className="max-w-7xl mx-auto px-6 py-20 text-center text-gray-500">Loading...</div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div>
        <TopStrip text="Pay with bank transfer and get upto 15% off" />
        <Header />
        <div className="max-w-7xl mx-auto px-6 py-20 text-center text-gray-500">
          Product not found. <Link to="/" className="text-brand-primary underline">Go home</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleBuyNow = () => {
    addToCart(product, { color: selectedColor, size: product.size });
    setAdded(true);
  };

  if (product.category === "contact-lenses") {
    return (
      <div>
        <TopStrip text="Same day or next day delivery in Lahore" />
        <Header />
        <ContactLensDetail product={product} />
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <TopStrip text="Pay with bank transfer and get upto 15% off" />
      <Header />

      <div className="max-w-7xl mx-auto px-6 mt-8 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10">
        {/* Left: gallery + info tabs */}
        <div>
          <div className="bg-gray-50 rounded-lg aspect-[4/3] flex items-center justify-center">
            <img src={product.image} alt={product.name} className="max-h-full object-contain p-8" />
          </div>

          <p className="text-sm font-medium text-gray-700 mt-6 flex items-center gap-2">
            How this product look with transition glasses?
            <span className="bg-brand-blue text-white text-xs font-semibold px-3 py-1 rounded">
              Transition
            </span>
          </p>
          <div className="flex gap-3 mt-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <button
                key={i}
                className="w-16 h-14 border border-gray-200 rounded-md bg-gray-50 flex items-center justify-center hover:border-brand-primary"
              >
                <img src={product.image} alt="" className="max-h-8 object-contain opacity-80" />
              </button>
            ))}
          </div>

          <div className="bg-brand-primary rounded-lg px-6 py-4 mt-8 text-center">
            <p className="text-white font-medium">
              Pay with bank transfer and get{" "}
              <span className="text-brand-gold font-bold">15%</span> discount at checkout.
            </p>
          </div>

          <div className="mt-6 border-b border-gray-200 flex gap-8">
            {["description", "details"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`pb-3 text-sm font-semibold uppercase tracking-wide border-b-2 ${
                  tab === t ? "border-brand-primary text-brand-primary" : "border-transparent text-gray-400"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="py-6 text-sm text-gray-700 space-y-2">
            {tab === "details" ? (
              <>
                <p>
                  <span className="font-semibold">Size:</span> {product.size}
                </p>
                <p>
                  <span className="font-semibold">Color:</span> {product.color}
                </p>
                <p>
                  <span className="font-semibold">Material:</span> {product.material}
                </p>
                <p>
                  <span className="font-semibold text-brand-primary">Shape:</span>{" "}
                  <span className="text-brand-primary">{product.shape}</span>
                </p>
                <p>
                  <span className="font-semibold">Rim:</span> {product.rim}
                </p>
              </>
            ) : (
              <p>
                {product.name} by {product.brand} — a {product.material?.toLowerCase()} frame with a{" "}
                {product.shape?.toLowerCase()} silhouette, finished as premium quality eyewear built for
                everyday wear.
              </p>
            )}
          </div>

          <div className="bg-gray-100 rounded-full flex flex-wrap items-center gap-6 px-6 py-4 text-sm text-gray-700 font-medium">
            <span className="flex items-center gap-2">
              <FiTruck className="text-brand-primary" />
              Free Delivery In Pakistan
            </span>
            <span className="flex items-center gap-2">
              <FiRotateCw className="text-brand-primary" />
              7 Days Exchange or Return
            </span>
          </div>
        </div>

        {/* Right: buy panel */}
        <div>
          {product.badges?.[0] && (
            <span
              className={`inline-block text-xs font-semibold px-3 py-1 rounded mb-3 ${
                badgeStyles[product.badges[0]] || "bg-gray-200"
              }`}
            >
              {product.badges[0]}
            </span>
          )}
          <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>

          <div className="bg-gray-50 rounded-lg p-4 mt-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Price includes</span>
              <span className="text-xl font-bold text-gray-900">Rs {product.price.toLocaleString()}</span>
            </div>
            <ul className="text-xs text-gray-500 mt-2 space-y-1">
              <li>· Frame</li>
              <li>· Cleaning cloth &amp; Box</li>
            </ul>
          </div>

          {product.colorSwatches?.length > 0 && (
            <div className="mt-5">
              <p className="text-sm font-semibold text-gray-800 mb-2">
                Color: <span className="font-normal text-gray-600">{product.color}</span>
              </p>
              <div className="flex gap-2">
                {product.colorSwatches.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={`w-12 h-10 rounded border-2 flex items-center justify-center ${
                      selectedColor === c ? "border-brand-primary" : "border-gray-200"
                    }`}
                    style={{ background: "#f5f5f5" }}
                  >
                    <span className="w-6 h-4 rounded-sm" style={{ background: c }} />
                  </button>
                ))}
              </div>
            </div>
          )}

          <p className="text-sm font-semibold text-gray-800 mt-5">
            Size: <span className="font-normal text-gray-600">{product.size}</span>
          </p>

          <button
            onClick={handleBuyNow}
            className="w-full bg-brand-primary text-white font-semibold rounded-md py-3 mt-5"
          >
            {added ? "Added to cart ✓" : "BUY NOW"}
            <span className="block text-xs font-normal opacity-80">frame with box &amp; cloth</span>
          </button>

          {added && (
            <Link
              to="/cart"
              className="block text-center text-sm text-brand-primary underline mt-2"
            >
              View cart
            </Link>
          )}

          <button
            onClick={() => navigate(`/lens-selection/${product._id}`)}
            className="w-full border border-brand-primary text-brand-primary font-semibold rounded-md py-3 mt-3"
          >
            SELECT LENSES
            <span className="block text-xs font-normal">with or without eyesight glasses</span>
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
