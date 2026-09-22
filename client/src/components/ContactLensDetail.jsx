import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiTruck, FiRotateCw } from "react-icons/fi";
import { fetchProducts } from "../api/products.js";
import { useCart } from "../context/CartContext.jsx";
import LensCard from "../components/LensCard.jsx";

const powerOptions = (() => {
  const opts = ["Plano"];
  for (let v = 0.25; v <= 12; v += 0.25) opts.push(`-${v.toFixed(2)}`);
  return opts;
})();

export default function ContactLensDetail({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [selectedColor, setSelectedColor] = useState(product.colorSwatches?.[0] || "");
  const [odPower, setOdPower] = useState("-0.50");
  const [osPower, setOsPower] = useState("-0.50");
  const [file, setFile] = useState(null);
  const [note, setNote] = useState("");
  const [added, setAdded] = useState(false);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    fetchProducts({ category: "contact-lenses", limit: 5 })
      .then((data) => setRelated((data.items || []).filter((p) => p._id !== product._id).slice(0, 4)))
      .catch((err) => console.error("Failed to load related products:", err));
  }, [product._id]);

  const handleBuyNow = () => {
    const parts = [];
    if (selectedColor) parts.push(`Color selected`);
    parts.push(`OD ${odPower}`, `OS ${osPower}`);
    if (note.trim()) parts.push(`Note: "${note.trim()}"`);
    if (file) parts.push(`File: ${file.name}`);

    addToCart(product, {
      color: selectedColor || undefined,
      size: product.size,
      lens: { method: "contact-lens-power", summary: parts.join(" · ") },
    });
    setAdded(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10">
        {/* Left: gallery */}
        <div>
          <div className="bg-gray-50 rounded-lg aspect-[4/3] flex items-center justify-center">
            <img src={product.image} alt={product.name} className="max-h-full object-contain p-8" />
          </div>
          <div className="flex gap-3 mt-3">
            <button className="w-16 h-14 border-2 border-brand-primary rounded-md bg-gray-50 flex items-center justify-center">
              <img src={product.image} alt="" className="max-h-8 object-contain" />
            </button>
            <button className="w-16 h-14 border border-gray-200 rounded-md bg-gray-50 flex items-center justify-center">
              <img src={product.image} alt="" className="max-h-6 object-contain opacity-60" />
            </button>
          </div>
        </div>

        {/* Right: buy panel */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>

          <div className="bg-gray-50 rounded-lg p-4 mt-4 flex items-center justify-between">
            <span className="text-sm text-gray-600">Price includes</span>
            <span className="text-xl font-bold text-gray-900">Rs {product.price.toLocaleString()}</span>
          </div>

          {product.colorSwatches?.length > 0 ? (
            <div className="mt-5">
              <label className="text-sm font-semibold text-gray-800 block mb-2">Select Color</label>
              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              >
                <option value="">--</option>
                {product.colorSwatches?.map((c, i) => (
                  <option key={c} value={c}>
                    Shade {i + 1}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="mt-5">
              <label className="text-sm font-semibold text-gray-800 block mb-2">Select Color</label>
              <select disabled className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-400">
                <option>--</option>
              </select>
            </div>
          )}

          <table className="w-full text-sm mt-5">
            <thead>
              <tr className="text-gray-500 text-xs">
                <th className="text-left font-medium"></th>
                <th className="text-left font-medium">POWER</th>
                <th className="text-left font-medium">BC</th>
                <th className="text-left font-medium">DIA</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 font-semibold text-gray-800">Right Eye (OD)</td>
                <td className="py-2 pr-2">
                  <select
                    value={odPower}
                    onChange={(e) => setOdPower(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1.5 text-sm w-24"
                  >
                    {powerOptions.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="py-2 text-gray-600">{product.baseCurve || "-"}</td>
                <td className="py-2 text-gray-600">{product.diameter || "-"}</td>
              </tr>
              <tr>
                <td className="py-2 font-semibold text-gray-800">Left Eye (OS)</td>
                <td className="py-2 pr-2">
                  <select
                    value={osPower}
                    onChange={(e) => setOsPower(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1.5 text-sm w-24"
                  >
                    {powerOptions.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="py-2 text-gray-600">{product.baseCurve || "-"}</td>
                <td className="py-2 text-gray-600">{product.diameter || "-"}</td>
              </tr>
            </tbody>
          </table>

          <div className="mt-4">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="text-sm"
            />
            {file && <p className="text-xs text-gray-500 mt-1">Selected: {file.name}</p>}
          </div>

          <label className="text-sm font-semibold text-red-600 block mt-4 mb-1">Lenses Note</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            placeholder="Have multiple eyesight numbers? Write here. Or place your order and send prescription card on our WhatsApp."
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          />

          <button
            onClick={handleBuyNow}
            className="w-full bg-brand-primary text-white font-semibold rounded-md py-3 mt-5"
          >
            {added ? "Added to cart ✓" : "BUY NOW"}
          </button>
          {added && (
            <Link to="/cart" className="block text-center text-sm text-brand-primary underline mt-2">
              View cart
            </Link>
          )}
        </div>
      </div>

      {/* Description tab */}
      <div className="mt-10">
        <div className="border-b border-gray-200">
          <span className="inline-block pb-3 text-sm font-semibold uppercase tracking-wide border-b-2 border-brand-primary text-brand-primary">
            Description
          </span>
        </div>
        <div className="py-6 text-sm text-gray-700 max-w-3xl space-y-2">
          <p>{product.description}</p>
          {product.waterContent && (
            <p>
              <span className="font-semibold">Content</span> &nbsp; {product.waterContent}
            </p>
          )}
          {product.diameter && (
            <p>
              <span className="font-semibold">Diameter</span> &nbsp; {product.diameter}
            </p>
          )}
          {product.baseCurve && (
            <p>
              <span className="font-semibold">Base Curve</span> &nbsp; {product.baseCurve}
            </p>
          )}
          {product.powerRange && (
            <p>
              <span className="font-semibold">Power Range</span> &nbsp; {product.powerRange}
            </p>
          )}
        </div>

        <div className="bg-gray-100 rounded-full flex flex-wrap items-center gap-6 px-6 py-4 text-sm text-gray-700 font-medium max-w-2xl">
          <span className="flex items-center gap-2">
            <FiTruck className="text-brand-primary" />
            Free Delivery In Pakistan
          </span>
          <span className="flex items-center gap-2">
            <FiRotateCw className="text-brand-primary" />
            7 Days Exchange or Return
          </span>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={() => navigate("/reviews")}
            className="bg-brand-primary text-white font-semibold px-6 py-2.5 rounded-md text-sm"
          >
            Rate this lense
          </button>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div className="mt-14 mb-16">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {related.map((p) => (
              <LensCard key={p._id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
