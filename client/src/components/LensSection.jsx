import { useEffect, useState } from "react";
import LensCard from "./LensCard.jsx";
import { fetchProducts } from "../api/products.js";

export default function LensSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    fetchProducts({ category: "contact-lenses", limit: 8, sort: "latest" })
      .then((data) => !ignore && setProducts(data.items))
      .catch((err) => console.error("Failed to load contact lenses:", err))
      .finally(() => !ignore && setLoading(false));
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 mt-16">
      <h2 className="text-2xl font-bold text-center text-gray-900">Contact Lenses</h2>
      <p className="text-center text-sm text-gray-600 mt-2">
        Colored Lenses | Branded Contact Lenses | Transparent Lenses
      </p>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-100 aspect-square rounded-lg" />
              <div className="h-3 bg-gray-100 rounded mt-3 w-2/3 mx-auto" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-8">
          {products.map((p) => (
            <LensCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </section>
  );
}
