import ProductCard from "./ProductCard.jsx";

export default function ProductGrid({ products = [], loading }) {
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-100 aspect-[4/3] rounded-lg" />
            <div className="h-4 bg-gray-100 rounded mt-3 w-2/3" />
            <div className="h-4 bg-gray-100 rounded mt-2 w-1/3" />
          </div>
        ))}
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="max-w-7xl mx-auto px-6 mt-12 text-center text-gray-500">
        No products found.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
      {products.map((p) => (
        <ProductCard key={p._id} product={p} />
      ))}
    </div>
  );
}
