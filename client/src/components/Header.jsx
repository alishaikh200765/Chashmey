import { useState } from "react";
import { Link } from "react-router-dom";
import { FiChevronDown, FiSearch, FiShoppingBag } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import MegaMenu from "./MegaMenu.jsx";
import SearchOverlay from "./SearchOverlay.jsx";
import { useCart } from "../context/CartContext.jsx";
import { shopLink as q } from "../utils/shopLink.js";

const link = (label, to) => ({ label, to });

const navData = [
  {
    label: "Eyeglasses",
    shop: [
      link("Eyeglasses", q({ category: "eyeglasses" })),
      link("Men Glasses", q({ category: "eyeglasses", gender: "men" })),
      link("Women Glasses", q({ category: "eyeglasses", gender: "women" })),
      link("Premium Glasses", q({ category: "eyeglasses", subCategory: "premium-glasses" })),
      link("Ray Ban Glasses", q({ category: "eyeglasses", brand: "Ray Ban" })),
      link("Hugo Boss Glasses", q({ category: "eyeglasses", brand: "Hugo Boss" })),
      link("Oliver Peoples Glasses", q({ category: "eyeglasses", brand: "Oliver Peoples" })),
    ],
    featured: [
      link("Prada Glasses", q({ category: "eyeglasses", brand: "Prada" })),
      link("Moscot Glasses", q({ category: "eyeglasses", brand: "Moscot" })),
      link("Cartier Glasses", q({ category: "eyeglasses", brand: "Cartier" })),
      link("Gucci Glasses", q({ category: "eyeglasses", brand: "Gucci" })),
      link("David Beckham", q({ category: "eyeglasses", brand: "David Beckham" })),
      link("Mont Blanc Glasses", q({ category: "eyeglasses", brand: "Mont Blanc" })),
    ],
  },
  {
    label: "Sunglasses",
    shop: [
      link("Sunglasses", q({ category: "sunglasses" })),
      link("Men Sunglasses", q({ category: "sunglasses", gender: "men" })),
      link("Women Sunglasses", q({ category: "sunglasses", gender: "women" })),
      link("Premium Sunglasses", "/premium-sunglasses"),
      link("Rayban Wayfarer", q({ category: "sunglasses", brand: "Ray Ban", shape: "Wayfarer" })),
      link("Polarized Sunglasses", q({ category: "sunglasses", badge: "Polarized" })),
    ],
    featured: [
      link("Louis Vuitton Sunglasses", q({ category: "sunglasses", brand: "Louis Vuitton" })),
      link("Ray ban Sunglasses", q({ category: "sunglasses", brand: "Ray Ban" })),
      link("Prada Sunglasses", q({ category: "sunglasses", brand: "Prada" })),
      link("Oliver Peoples Sunglasses", q({ category: "sunglasses", brand: "Oliver Peoples" })),
    ],
  },
  {
    label: "Lenses",
    shop: [
      link("Blue Light Glasses", q({ category: "eyeglasses", subCategory: "blue-light-glasses" })),
      link("Computer Glasses", q({ category: "eyeglasses", subCategory: "computer-glasses" })),
      link("Anti Glare Glasses", q({ category: "eyeglasses", subCategory: "antiglare-glasses" })),
      link("Transition Glasses", q({ category: "eyeglasses", subCategory: "transition-glasses" })),
    ],
    featured: [
      link("Bifocal Glasses", q({ category: "lenses", subCategory: "bifocal-glasses" })),
      link("Progressive Glasses", q({ category: "lenses", subCategory: "progressive-glasses" })),
    ],
  },
  {
    label: "Contact Lenses",
    shop: [
      link("Contact Lenses", q({ category: "contact-lenses" })),
      link("Transparent Lenses", q({ category: "contact-lenses", subCategory: "transparent-lenses" })),
      link("Colored Lenses", q({ category: "contact-lenses", subCategory: "colored-lenses" })),
    ],
    featured: [
      link("Daily Disposable Lenses", q({ category: "contact-lenses", brand: "Acuvue" })),
      link("Silicone Hydrogel Lenses", q({ category: "contact-lenses", brand: "Biomedics" })),
      link("Bella Lenses", q({ category: "contact-lenses", brand: "Bella" })),
      link("Bausch and Lomb Lenses", q({ category: "contact-lenses", brand: "Bausch And Lomb" })),
    ],
  },
];

export default function Header() {
  const [openMenu, setOpenMenu] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const { cartCount } = useCart();
  const activeItem = navData.find((n) => n.label === openMenu);

  return (
    <header className="border-b border-gray-200 relative z-50">
      {/* Everything that can trigger/host a mega menu lives inside this single
          relative wrapper, and the menu itself is centered on IT (not on the
          individual nav item), so it can never get dragged off to the right
          regardless of which item is hovered. */}
      <div className="relative" onMouseLeave={() => setOpenMenu(null)}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <span className="bg-brand-primary w-9 h-9 rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#B8912F" strokeWidth="2">
                <circle cx="6" cy="14" r="4" />
                <circle cx="18" cy="14" r="4" />
                <path d="M10 14h4M2 10l2-4h2M22 10l-2-4h-2" strokeLinecap="round" />
              </svg>
            </span>
            <span className="text-xl font-bold text-brand-primary tracking-tight">
              chashmey<span className="text-brand-gold">.pk</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-7 text-[15px] font-medium text-gray-800">
            {navData.map((item) => (
              <a
                key={item.label}
                href="#"
                onMouseEnter={() => setOpenMenu(item.label)}
                onFocus={() => setOpenMenu(item.label)}
                className={`flex items-center gap-1 pb-1 border-b-2 transition-colors ${
                  openMenu === item.label
                    ? "text-brand-primary border-brand-gold"
                    : "border-transparent hover:text-brand-primary"
                }`}
              >
                {item.label}
                <FiChevronDown className="text-xs" />
              </a>
            ))}
            <Link to="/reviews" className="hover:text-brand-primary">
              Reviews
            </Link>
          </nav>

          {/* Search + cart */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSearchOpen((v) => !v)}
              className="hidden sm:flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2 text-sm text-gray-600 hover:border-brand-primary"
            >
              <FiSearch />
              Search
            </button>
            <Link
              to="/cart"
              className="relative border border-gray-300 rounded-md p-2 hover:border-brand-primary"
            >
              <FiShoppingBag className="text-lg" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-gold text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>


        {activeItem && (
          <div className="absolute left-1/2 -translate-x-1/2 top-full w-max max-w-[90vw]">
            <MegaMenu shop={activeItem.shop} featured={activeItem.featured} />
          </div>
        )}

        {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
      </div>

      <a
        href="https://wa.me/923118327264"
        target="_blank"
        rel="noopener noreferrer"
        className="group fixed bottom-6 right-6 flex items-center gap-2 z-40"
      >
        <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs font-medium px-3 py-1.5 rounded-md whitespace-nowrap">
          WhatsApp
        </span>
        <span className="bg-[#25D366] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg shrink-0">
          <FaWhatsapp className="text-2xl" />
        </span>
      </a>
    </header>
  );
}
