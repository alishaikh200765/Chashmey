import { FiChevronDown } from "react-icons/fi";

const filters = ["Gender", "Price", "Material", "Shape", "Rim", "Size", "Color"];

export default function FilterBar({ total = 0, rangeStart = 1, rangeEnd = 18, sort, onSortChange }) {
  return (
    <div className="max-w-7xl mx-auto px-6 mt-8">
      <p className="font-semibold text-gray-800 mb-2">Filters:</p>
      <div className="bg-brand-cream rounded-lg flex flex-wrap items-center gap-6 px-6 py-3">
        {filters.map((f) => (
          <button
            key={f}
            className="flex items-center gap-1 text-sm text-gray-700 hover:text-brand-primary"
          >
            {f}
            <FiChevronDown className="text-xs" />
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between mt-3 text-sm">
        <p className="text-gray-600">
          Showing {rangeStart}-{rangeEnd} of {total} results
        </p>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700"
        >
          <option value="latest">Sort by latest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
}
