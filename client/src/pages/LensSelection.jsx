import { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate, Link } from "react-router-dom";
import { FiChevronLeft, FiChevronDown, FiCamera, FiEdit3, FiFileText } from "react-icons/fi";
import TopStrip from "../components/TopStrip.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { fetchProductById } from "../api/products.js";
import { useCart } from "../context/CartContext.jsx";

const sphereCylOptions = (() => {
  const opts = ["0.00"];
  for (let v = 0.25; v <= 10; v += 0.25) {
    opts.push(`+${v.toFixed(2)}`);
    opts.unshift(`-${v.toFixed(2)}`);
  }
  return opts;
})();

const addOptions = (() => {
  const opts = ["n/a"];
  for (let v = 0.75; v <= 3.5; v += 0.25) opts.push(`+${v.toFixed(2)}`);
  return opts;
})();

const pdOptions = (() => {
  const opts = [];
  for (let v = 50; v <= 74; v += 0.5) opts.push(v.toFixed(1));
  return opts;
})();

const emptyEye = { sph: "0.00", cyl: "0.00", axis: "", add: "n/a" };

export default function LensSelection() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const lineId = searchParams.get("lineId");
  const navigate = useNavigate();
  const { addToCart, attachLens } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [method, setMethod] = useState("prescription"); 
  const [od, setOd] = useState(emptyEye);
  const [os, setOs] = useState(emptyEye);
  const [twoPd, setTwoPd] = useState(false);
  const [pd, setPd] = useState("62.0");
  const [pdRight, setPdRight] = useState("31.0");
  const [pdLeft, setPdLeft] = useState("31.0");
  const [imageFile, setImageFile] = useState(null);
  const [eyesightText, setEyesightText] = useState("");

  useEffect(() => {
    fetchProductById(id)
      .then(setProduct)
      .catch((err) => console.error("Failed to load product:", err))
      .finally(() => setLoading(false));
  }, [id]);

  const buildSummary = () => {
    if (method === "image") {
      return imageFile ? `Prescription image uploaded (${imageFile.name})` : "Prescription image uploaded";
    }
    if (method === "written") {
      return eyesightText.trim() ? `Written eyesight: "${eyesightText.trim()}"` : "Written eyesight number";
    }
    const pdText = twoPd ? `PD ${pdRight}/${pdLeft}` : `PD ${pd}`;
    return `OD ${od.sph}/${od.cyl} Axis ${od.axis || "-"} ADD ${od.add} · OS ${os.sph}/${os.cyl} Axis ${os.axis || "-"} ADD ${os.add} · ${pdText}`;
  };

  const handleConfirm = () => {
    const lens = {
      method,
      summary: buildSummary(),
      ...(method === "prescription" ? { od, os, pd: twoPd ? { right: pdRight, left: pdLeft } : pd } : {}),
      ...(method === "written" ? { eyesightText } : {}),
      ...(method === "image" ? { fileName: imageFile?.name || null } : {}),
    };

    if (lineId) {
      attachLens(lineId, lens);
    } else {
      addToCart(product, { size: product.size, lens });
    }
    navigate("/cart");
  };

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

  return (
    <div>
      <TopStrip text="Pay with bank transfer and get upto 15% off" />
      <Header />

      <div className="max-w-7xl mx-auto px-6 mt-8 grid grid-cols-1 lg:grid-cols-2 gap-10 pb-28">
        {/* Left: product summary */}
        <div>
          <div className="bg-gray-50 rounded-lg aspect-[4/3] flex items-center justify-center">
            <img src={product.image} alt={product.name} className="max-h-full object-contain p-8" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mt-6">{product.name}</h1>
          <p className="text-xl font-semibold text-gray-700 mt-1">
            Rs {product.price.toLocaleString()}
          </p>
        </div>

        {/* Right: usage / prescription form */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Usage</h2>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-brand-primary text-sm mt-2 mb-6"
          >
            <FiChevronLeft /> Back
          </button>

        
          <div className="border border-gray-200 rounded-md mb-3">
            <button
              onClick={() => setMethod("prescription")}
              className={`w-full flex items-center justify-between px-4 py-3 font-medium ${
                method === "prescription" ? "text-brand-primary" : "text-gray-700"
              }`}
            >
              <span className="flex items-center gap-2">
                <FiFileText /> Prescription
              </span>
              <FiChevronDown className={method === "prescription" ? "rotate-180 transition-transform" : "transition-transform"} />
            </button>
            {method === "prescription" && (
              <div className="px-4 pb-5">
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-sm font-medium text-gray-600 mb-1">
                  <span></span>
                  <span>Sphere (SPH)</span>
                  <span>Cylinder (CYL)</span>
                  <span>Axis</span>
                  <span>ADD</span>
                </div>
                {[
                  ["OD (Right eye)", od, setOd],
                  ["OS (Left eye)", os, setOs],
                ].map(([label, eye, setEye]) => (
                  <div key={label} className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-center mb-3">
                    <span className="text-sm font-medium text-gray-700">{label}</span>
                    <select
                      value={eye.sph}
                      onChange={(e) => setEye({ ...eye, sph: e.target.value })}
                      className="border border-gray-300 rounded px-2 py-1.5 text-sm"
                    >
                      {sphereCylOptions.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                    <select
                      value={eye.cyl}
                      onChange={(e) => setEye({ ...eye, cyl: e.target.value })}
                      className="border border-gray-300 rounded px-2 py-1.5 text-sm"
                    >
                      {sphereCylOptions.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                    <input
                      value={eye.axis}
                      onChange={(e) => setEye({ ...eye, axis: e.target.value.replace(/[^0-9]/g, "") })}
                      placeholder="1-180"
                      maxLength={3}
                      className="border border-gray-300 rounded px-2 py-1.5 text-sm"
                    />
                    <select
                      value={eye.add}
                      onChange={(e) => setEye({ ...eye, add: e.target.value })}
                      className="border border-gray-300 rounded px-2 py-1.5 text-sm"
                    >
                      {addOptions.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}

                <div className="flex items-center gap-3 mt-2">
                  <span className="text-sm font-medium text-gray-700 w-32">
                    PD (Pupillary Distance)
                  </span>
                  {!twoPd ? (
                    <select
                      value={pd}
                      onChange={(e) => setPd(e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1.5 text-sm"
                    >
                      {pdOptions.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="flex gap-2">
                      <select
                        value={pdRight}
                        onChange={(e) => setPdRight(e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1.5 text-sm"
                      >
                        {pdOptions.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                      <select
                        value={pdLeft}
                        onChange={(e) => setPdLeft(e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1.5 text-sm"
                      >
                        {pdOptions.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  <label className="flex items-center gap-1.5 text-sm text-gray-600 ml-2">
                    <input type="checkbox" checked={twoPd} onChange={(e) => setTwoPd(e.target.checked)} />
                    Two PD numbers
                  </label>
                </div>
              </div>
            )}
          </div>

          <div className="border border-gray-200 rounded-md mb-3">
            <button
              onClick={() => setMethod("image")}
              className={`w-full flex items-center justify-between px-4 py-3 font-medium ${
                method === "image" ? "text-brand-primary" : "text-gray-700"
              }`}
            >
              <span className="flex items-center gap-2">
                <FiCamera /> Upload Prescription Image
              </span>
              <FiChevronDown className={method === "image" ? "rotate-180 transition-transform" : "transition-transform"} />
            </button>
            {method === "image" && (
              <div className="px-4 pb-5">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="text-sm"
                />
                {imageFile && <p className="text-xs text-gray-500 mt-2">Selected: {imageFile.name}</p>}
                <p className="text-xs text-gray-400 mt-2">
                  The image is only referenced by filename in this build — it isn't uploaded to a server yet.
                </p>
              </div>
            )}
          </div>

          <div className="border border-gray-200 rounded-md mb-6">
            <button
              onClick={() => setMethod("written")}
              className={`w-full flex items-center justify-between px-4 py-3 font-medium ${
                method === "written" ? "text-brand-primary" : "text-gray-700"
              }`}
            >
              <span className="flex items-center gap-2">
                <FiEdit3 /> Write Eyesight Number
              </span>
              <FiChevronDown className={method === "written" ? "rotate-180 transition-transform" : "transition-transform"} />
            </button>
            {method === "written" && (
              <div className="px-4 pb-5">
                <textarea
                  value={eyesightText}
                  onChange={(e) => setEyesightText(e.target.value)}
                  rows={3}
                  placeholder="e.g. Right -1.25, Left -1.00"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                />
              </div>
            )}
          </div>

          <button
            onClick={handleConfirm}
            className="w-full bg-brand-primary text-white font-semibold rounded-md py-3"
          >
            Confirm
          </button>
        </div>
      </div>

      {/* Sticky subtotal bar */}
      <div className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 py-3 z-40">
        <p className="max-w-7xl mx-auto px-6 text-right font-semibold text-gray-800">
          Subtotal: Rs {product.price.toLocaleString()}
        </p>
      </div>

      <Footer />
    </div>
  );
}
