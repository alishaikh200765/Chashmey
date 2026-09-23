export default function Breadcrumb({ trail = [] }) {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-4 text-sm text-gray-500">
      {trail.map((item, i) => (
        <span key={item}>
          {i > 0 && <span className="mx-1">»</span>}
          {i === trail.length - 1 ? (
            <span className="text-gray-700">{item}</span>
          ) : (
            <a href="/" className="hover:text-brand-primary">
              {item}
            </a>
          )}
        </span>
      ))}
    </div>
  );
}
