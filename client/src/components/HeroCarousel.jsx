import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { placeholderImage } from "../utils/placeholderImage.js";

const slides = [
  {
    id: 1,
    eyebrow: "Premium Sunglasses",
    heading: "Flat 15%",
    sub: "discount at checkout",
    cta: "Shop now",
    to: "/premium-sunglasses",
    
    image: "https://www.shutterstock.com/image-photo/glasses-sale-banner-optic-store-260nw-2134039531.jpg",
  },
  {
    id: 2,
    eyebrow: "Contact Lenses",
    heading: "Fresh Look",
    sub: "discount at checkout",
    cta: "Shop now",
    to: "/shop?category=contact-lenses",
    image: "https://www.spexmaster.com/wp-content/uploads/2023/09/Contact-Lenses-Banner.webp",
  },
];

const AUTO_ADVANCE_MS = 4500;

export default function HeroCarousel() {
  const [active, setActive] = useState(0);
  const slide = slides[active];

  // Auto-advance to the next slide, looping back to the start.
  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 mt-4">
      <div className="relative rounded-xl overflow-hidden min-h-[340px] flex items-center">
        {/* Full-bleed background image, one per slide */}
        <img
          src={slide.image}
          alt={slide.eyebrow}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
        />
        {/* Gradient so the text stays readable over the image */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/60 to-transparent" />

        {/* Foreground content */}
        <div className="relative z-10 px-10 py-12 max-w-md">
          <span className="inline-block bg-brand-gold text-white font-semibold px-4 py-1.5 rounded mb-4">
            {slide.eyebrow}
          </span>
          <h2 className="text-5xl font-extrabold text-gray-900">{slide.heading}</h2>
          <p className="text-brand-primary font-semibold text-xl mt-1">{slide.sub}</p>
          <Link
            to={slide.to}
            className="inline-block mt-5 bg-brand-primary text-white font-semibold px-6 py-3 rounded-full"
          >
            {slide.cta}
          </Link>
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActive(i)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                i === active ? "bg-brand-primary" : "bg-gray-400/60"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
