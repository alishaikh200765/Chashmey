import { FiShoppingCart, FiEye, FiRotateCcw } from "react-icons/fi";
import TopStrip from "../components/TopStrip.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { placeholderImage } from "../utils/placeholderImage.js";

const promise = [
  { icon: FiShoppingCart, label: "BUY", caption: "Buy with confidence from chashmey.pk" },
  { icon: FiEye, label: "TRY", caption: "Try your eyewear with ease" },
  { icon: FiRotateCcw, label: "RETURN", caption: "You can return back if it's uncomfortable" },
];

export default function AboutUs() {
  return (
    <div>
      <TopStrip />
      <Header />

      <div className="max-w-4xl mx-auto px-6 mt-10 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Our Mission</h1>
        <p className="text-gray-600 mt-3">
          To be customer focused, innovative and provide high quality products that exceed our
          customer's expectations.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6 mt-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <img
  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS06Rp3XPiKQnexFURvDcUO2_aLJ5KQJ6c9zX1zCoXaVKMc2q-YlT6wRCA&s=10"
  alt="Chashmey.pk packaging"
  />
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Origin Story</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Chashmey.pk was founded with a mission to deliver premium optical products. Our main
            focus is on providing the best prices in the market while quality remains the standard
            objective. We deal in all types of optical products, including eyeglasses, sunglasses,
            contact lenses, optical frames, power lenses and power sunglasses.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 mt-16 mb-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-10">We Promise Quality</h2>
        <div className="flex flex-wrap justify-center gap-16">
          {promise.map(({ icon: Icon, label, caption }) => (
            <div key={label} className="flex flex-col items-center gap-4 w-40">
              <span className="w-20 h-20 rounded-full bg-brand-primary text-white flex flex-col items-center justify-center gap-1">
                <Icon className="text-xl" />
                <span className="text-xs font-bold">{label}</span>
              </span>
              <p className="text-sm text-gray-600">{caption}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
