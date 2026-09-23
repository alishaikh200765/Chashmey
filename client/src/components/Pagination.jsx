export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = [];
  const maxShown = 3;
  for (let i = 1; i <= Math.min(maxShown, totalPages); i++) pages.push(i);
  const showEllipsis = totalPages > maxShown + 2;
  const tailPages = totalPages > maxShown ? [totalPages - 1, totalPages] : [];

  return (
    <div className="max-w-7xl mx-auto px-6 mt-10 mb-14 flex items-center justify-center gap-2">
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`w-9 h-9 rounded-md text-sm font-medium border ${
            p === page
              ? "bg-brand-primary text-white border-brand-primary"
              : "border-gray-300 text-gray-700 hover:border-brand-primary"
          }`}
        >
          {p}
        </button>
      ))}
      {showEllipsis && <span className="px-1 text-gray-500">...</span>}
      {tailPages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`w-9 h-9 rounded-md text-sm font-medium border ${
            p === page
              ? "bg-brand-primary text-white border-brand-primary"
              : "border-gray-300 text-gray-700 hover:border-brand-primary"
          }`}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        className="w-9 h-9 rounded-md border border-gray-300 flex items-center justify-center hover:border-brand-primary"
        aria-label="Next page"
      >
        →
      </button>
    </div>
  );
}
