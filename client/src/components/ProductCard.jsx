import { useState } from "react";
import { Link } from "react-router-dom";
import { placeholderImage, glassesOverlayImage } from "../utils/placeholderImage.js";
import TryOnModal from "./TryOnModal.jsx";

const badgeStyles = {
  New: "bg-brand-green text-white",
  Premium: "bg-brand-gold text-white",
  "Hot selling": "bg-brand-blue text-white",
  Polarized: "bg-brand-blue text-white",
};

export default function ProductCard({ product }) {
  const [tryOnOpen, setTryOnOpen] = useState(false);
  const isEyewear = product.category !== "contact-lenses";

  return (
    <>
      <Link to={`/product/${product._id}`} className="group block">
        <div className="relative aspect-[4/3]">
          {isEyewear && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setTryOnOpen(true);
              }}
              className="absolute top-2 right-2 z-10 bg-brand-primary text-white text-xs font-semibold px-3 py-1.5 rounded-md"
            >
              Try on
            </button>
          )}
          <img
            src={product.image}
            alt={product.name}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = placeholderImage(product.name);
            }}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform"
          />
        </div>

        <div className="mt-3 flex gap-2">
          {product.badges?.map((b) => (
            <span
              key={b}
              className={`text-xs font-semibold px-2.5 py-1 rounded ${badgeStyles[b] || "bg-gray-200"}`}
            >
              {b}
            </span>
          ))}
        </div>

        <div className="flex gap-1 mt-2">
          {product.colorSwatches?.map((c, i) => (
            <span
              key={i}
              className="w-4 h-4 rounded-full border border-gray-300"
              style={{ background: c }}
            />
          ))}
        </div>

        <h3 className="mt-1 font-semibold text-gray-900">{product.name}</h3>
        <p className="text-brand-primary text-sm">
          {product.size} <span>({product.gender})</span>
        </p>
        <p className="font-bold text-gray-900 mt-1">Rs {product.price.toLocaleString()}</p>
      </Link>

      {tryOnOpen && (
        <TryOnModal
          productName={product.name}
          glassesImage={product.image}
          fallbackImage={glassesOverlayImage(product.name, { color: product.colorSwatches?.[0] })}
          onClose={() => setTryOnOpen(false)}
        />
      )}
    </>
  );
}
