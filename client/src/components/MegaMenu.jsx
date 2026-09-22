import { Link } from "react-router-dom";

function NavLink({ item }) {
  const label = typeof item === "object" ? item.label : item;
  const to = typeof item === "object" ? item.to : null;

  if (to) {
    return (
      <Link to={to} className="text-sm font-medium text-gray-800 hover:text-brand-primary">
        {label}
      </Link>
    );
  }
  return (
    <a href="#" className="text-sm font-medium text-gray-800 hover:text-brand-primary">
      {label}
    </a>
  );
}

export default function MegaMenu({ shop = [], featured = [] }) {
  return (
    <div className="w-full bg-white border border-gray-100 shadow-xl rounded-b-lg">
      <div className="flex gap-10 px-8 py-8">
        <div className="w-48 shrink-0">
          <p className="text-gray-400 text-xs font-semibold uppercase mb-3">Shop</p>
          <ul className="space-y-2.5">
            {shop.map((item) => (
              <li key={typeof item === "object" ? item.label : item}>
                <NavLink item={item} />
              </li>
            ))}
          </ul>
        </div>

        {featured.length > 0 && (
          <div className="w-52 shrink-0">
            <p className="text-gray-400 text-xs font-semibold uppercase mb-3">Featured</p>
            <ul className="space-y-2.5">
              {featured.map((item) => (
                <li key={typeof item === "object" ? item.label : item}>
                  <NavLink item={item} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
