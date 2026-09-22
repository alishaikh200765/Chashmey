import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiX } from "react-icons/fi";
import { fetchProducts } from "../api/products.js";

export default function SearchOverlay({ onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const boxRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) onClose();
    };
    const onEsc = (e) => e.key === "Escape" && onClose();
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEsc);
    };
  }, [onClose]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    const t = setTimeout(() => {
      fetchProducts({ search: query.trim(), limit: 8 })
        .then((data) => setResults(data.items))
        .catch((err) => console.error("Search failed:", err))
        .finally(() => setLoading(false));
    }, 300);
    return () => clearTimeout(t);
  }, [query]);

  return (
    <div className="absolute inset-x-0 top-full bg-white border-b border-gray-200 shadow-xl z-50">
      <div ref={boxRef} className="max-w-3xl mx-auto px-6 py-5">
        <div className="flex items-center gap-3 border border-gray-300 rounded-full px-4 py-2.5">
          <FiSearch className="text-gray-400" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search glasses, sunglasses, lenses, brands..."
            className="flex-1 outline-none text-sm"
          />
          <button onClick={onClose} aria-label="Close search">
            <FiX className="text-gray-400 hover:text-gray-700" />
          </button>
        </div>

        {query.trim() && (
          <div className="mt-4 max-h-96 overflow-y-auto">
            {loading && <p className="text-sm text-gray-500 py-4">Searching...</p>}
            {!loading && results.length === 0 && (
              <p className="text-sm text-gray-500 py-4">No products found for "{query}".</p>
            )}
            <ul className="divide-y divide-gray-100">
              {results.map((p) => (
                <li key={p._id}>
                  <Link
                    to={`/product/${p._id}`}
                    onClick={onClose}
                    className="flex items-center gap-4 py-3 hover:bg-gray-50 px-2 rounded"
                  >
                    <img src={p.image} alt={p.name} className="w-14 h-14 object-contain bg-gray-50 rounded" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">{p.name}</p>
                      <p className="text-xs text-gray-500">{p.brand}</p>
                    </div>
                    <p className="text-sm font-bold text-brand-primary">Rs {p.price.toLocaleString()}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
