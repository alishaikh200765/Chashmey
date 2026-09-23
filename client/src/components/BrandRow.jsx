import { Link } from "react-router-dom";
import { placeholderImage } from "../utils/placeholderImage.js";

export default function BrandRow({ brands = [] }) {
  return (
    <div className="max-w-7xl mx-auto px-6 mt-8">
      <div className="flex items-start gap-10 overflow-x-auto">
        <p className="text-lg font-semibold text-gray-900 shrink-0 w-32">
          Shop by sunglasses brands
        </p>
        <div className="flex gap-8">
          {brands.map((brand) => (
            <Link key={brand.name} to={brand.to} className="flex flex-col items-center gap-2 shrink-0">
              <img
                src={brand.image}
                alt={brand.name}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = placeholderImage(brand.name, { width: 160, height: 160 });
                }}
                className="w-20 h-20 rounded-full object-cover border border-gray-200"
              />
              <span className="text-sm text-gray-800">{brand.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
