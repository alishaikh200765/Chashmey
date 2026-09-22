import { Link } from "react-router-dom";
import { placeholderImage } from "../utils/placeholderImage.js";

export default function LensCard({ product }) {
  return (
    <Link to={`/product/${product._id}`} className="text-center block group">
      <div className="aspect-square flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = placeholderImage(product.name);
          }}
          className="max-h-full object-contain group-hover:scale-105 transition-transform"
        />
      </div>
      <h3 className="mt-3 text-sm font-semibold text-gray-800 uppercase">{product.name}</h3>
      <p className="text-gray-900 font-bold text-sm mt-1">Rs {product.price.toLocaleString()}</p>
    </Link>
  );
}
