import { useEffect, useState } from "react";
import ProductGrid from "./ProductGrid.jsx";
import { fetchProducts } from "../api/products.js";

export default function ProductSection({ title, tagline, subCategory, ctaLabel, limit = 8 }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    fetchProducts({ subCategory, limit, sort: "latest" })
      .then((data) => !ignore && setProducts(data.items))
      .catch((err) => console.error(`Failed to load ${subCategory}:`, err))
      .finally(() => !ignore && setLoading(false));
    return () => {
      ignore = true;
    };
  }, [subCategory, limit]);

  return (
    <section className="mt-14">
      {ctaLabel && (
        <div className="flex justify-center mb-6">
          <button className="bg-brand-primary text-white font-semibold px-6 py-3 rounded-md">
            {ctaLabel}
          </button>
        </div>
      )}
      <h2 className="text-2xl font-bold text-center text-gray-900">{title}</h2>
      {tagline && (
        <p className="text-center text-brand-blue text-sm mt-1 font-medium">{tagline}</p>
      )}
      <ProductGrid products={products} loading={loading} />
    </section>
  );
}
