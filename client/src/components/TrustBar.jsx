import { FiShield, FiTruck, FiRotateCw, FiStar } from "react-icons/fi";

const items = [
  { icon: FiShield, label: "Premium Quality Products" },
  { icon: FiTruck, label: "Free Delivery In Pakistan" },
  { icon: FiRotateCw, label: "7 Days Exchange or Return" },
];

export default function TrustBar() {
  return (
    <div className="max-w-7xl mx-auto px-6 mt-4">
      <div className="bg-gray-100 rounded-full flex flex-wrap items-center justify-center gap-6 sm:gap-10 px-6 py-4 text-sm text-gray-700 font-medium divide-x divide-gray-300">
        {items.map(({ icon: Icon, label }, i) => (
          <span key={label} className={`flex items-center gap-2 ${i > 0 ? "pl-6 sm:pl-10" : ""}`}>
            <Icon className="text-brand-red" />
            {label}
          </span>
        ))}
        <span className="flex items-center gap-1 pl-6 sm:pl-10">
          {Array.from({ length: 5 }).map((_, i) => (
            <FiStar key={i} className="text-amber-400 fill-amber-400" />
          ))}
          <span className="ml-1">12K+ Reviews</span>
        </span>
      </div>
    </div>
  );
}
