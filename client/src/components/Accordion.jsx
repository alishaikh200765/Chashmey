import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

export default function Accordion({ title, items }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="max-w-7xl mx-auto px-6 mt-14">
      {title && <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>}
      <div className="divide-y divide-gray-200 border-t border-gray-200">
        {items.map((item, i) => (
          <div key={item.question}>
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between py-4 text-left font-semibold text-gray-900"
            >
              {item.question}
              <FiChevronDown
                className={`transition-transform ${openIndex === i ? "rotate-180" : ""}`}
              />
            </button>
            {openIndex === i && item.answer && (
              <p className="text-sm text-gray-600 pb-4 pr-8">{item.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
