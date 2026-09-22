import { Link } from "react-router-dom";
import { FiInstagram, FiFacebook, FiTwitter, FiYoutube } from "react-icons/fi";
import { shopLink as q } from "../utils/shopLink.js";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "Premium Sunglasses", to: "/premium-sunglasses" },
      { label: "Sunglasses", to: q({ category: "sunglasses" }) },
      { label: "Men Sunglasses", to: q({ category: "sunglasses", gender: "men" }) },
      { label: "Women Sunglasses", to: q({ category: "sunglasses", gender: "women" }) },
      { label: "Eyeglasses", to: q({ category: "eyeglasses" }) },
      { label: "Men Glasses", to: q({ category: "eyeglasses", gender: "men" }) },
      { label: "Women Glasses", to: q({ category: "eyeglasses", gender: "women" }) },
      { label: "Transparent Glasses", to: q({ category: "eyeglasses", subCategory: "transparent-glasses" }) },
      { label: "Round Glasses", to: q({ category: "eyeglasses", shape: "Round" }) },
      { label: "Cat Eye Glasses", to: q({ category: "eyeglasses", shape: "Cat Eye" }) },
    ],
  },
  {
    title: "Trending Searches",
    links: [
      { label: "Blue Light Glasses", to: q({ category: "eyeglasses", subCategory: "blue-light-glasses" }) },
      { label: "Computer Glasses", to: q({ category: "eyeglasses", subCategory: "computer-glasses" }) },
      { label: "Antiglare Glasses", to: q({ category: "eyeglasses", subCategory: "antiglare-glasses" }) },
      { label: "Transition / Photochromic Glasses", to: q({ category: "eyeglasses", subCategory: "transition-glasses" }) },
      { label: "Bifocal Glasses", to: q({ category: "lenses", subCategory: "bifocal-glasses" }) },
      { label: "Progressive Glasses", to: q({ category: "lenses", subCategory: "progressive-glasses" }) },
      { label: "Matte Sunglasses", to: q({ category: "sunglasses" }) },
    ],
  },
  {
    title: "Contact Lenses",
    links: [
      { label: "Colored Lenses", to: q({ category: "contact-lenses", subCategory: "colored-lenses" }) },
      { label: "Transparent Lenses", to: q({ category: "contact-lenses", subCategory: "transparent-lenses" }) },
      { label: "Daily Disposable Lenses", to: q({ category: "contact-lenses", brand: "Acuvue" }) },
      { label: "Bausch And Lomb Lenses", to: q({ category: "contact-lenses", brand: "Bausch And Lomb" }) },
      { label: "Bella Lenses", to: q({ category: "contact-lenses", brand: "Bella" }) },
      { label: "Biomedics Lenses", to: q({ category: "contact-lenses", brand: "Biomedics" }) },
      { label: "Silicone Hydrogel Lenses", to: q({ category: "contact-lenses", brand: "Biomedics" }) },
    ],
  },
  {
    title: "About us",
    links: [
      { label: "About Us", to: "/about-us" },
      { label: "Contact Us", to: "/contact-us" },
      { label: "FAQ's", to: "/faqs" },
      { label: "Exchange & Return Policy", to: "/exchange-return-policy" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-gray-300 pt-14 pb-6">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-6 gap-10">
        <div className="col-span-2">
          <p className="text-white font-semibold mb-3">Follow Us</p>
          <div className="flex gap-3 mb-6">
            {[FiInstagram, FiFacebook, FiTwitter, FiYoutube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center hover:border-white"
              >
                <Icon className="text-sm" />
              </a>
            ))}
          </div>

          <div className="w-24 h-24 rounded-full bg-brand-primary flex flex-col items-center justify-center text-center text-white text-xs mb-6">
            <span className="font-bold">12K+</span>
            <span>★★★★★</span>
            <span className="text-[10px]">CERTIFIED REVIEWS</span>
          </div>

          <p className="text-white font-semibold mb-2 text-sm">Track Your Order:</p>
          <div className="flex">
            <input
              type="text"
              placeholder="Track by email or Phone"
              className="bg-transparent border border-gray-600 rounded-l-md px-3 py-2 text-sm w-full focus:outline-none"
            />
            <button className="bg-brand-primary text-white text-sm px-4 rounded-r-md">Track</button>
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <p className="text-white font-semibold mb-3">{col.title}</p>
            <ul className="space-y-2 text-sm">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-10 pt-6 border-t border-gray-700 flex flex-wrap items-center justify-between text-xs text-gray-400">
        <p>
          Copyright © {new Date().getFullYear()} All Rights Reserved by{" "}
          <span className="text-brand-primary">chashmey.pk</span>.
        </p>
        <div className="flex gap-4">
          <Link to="/privacy-policy" className="hover:text-white">
            Privacy Policy
          </Link>
          <Link to="/terms-and-conditions" className="hover:text-white">
            Terms and Conditions of Use
          </Link>
        </div>
      </div>
    </footer>
  );
}
