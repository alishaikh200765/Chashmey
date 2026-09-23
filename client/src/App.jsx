import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Home from "./pages/Home.jsx";
import PremiumSunglasses from "./pages/PremiumSunglasses.jsx";
import Shop from "./pages/Shop.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import LensSelection from "./pages/LensSelection.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import OrderConfirmation from "./pages/OrderConfirmation.jsx";
import Reviews from "./pages/Reviews.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import FAQ from "./pages/FAQ.jsx";
import ExchangeReturnPolicy from "./pages/ExchangeReturnPolicy.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import TermsAndConditions from "./pages/TermsAndConditions.jsx";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
      {/* Real homepage: hero carousel, mega-menu nav, shop-by-category, product
          sections, contact lenses, accordions/FAQ. */}
      <Route path="/" element={<Home />} />
      {/* Premium Sunglasses category/listing page (filters + full grid + pagination). */}
      <Route path="/premium-sunglasses" element={<PremiumSunglasses />} />
      {/* Generic filtered listing — every other navbar link (category/brand/gender/etc.) routes here. */}
      <Route path="/shop" element={<Shop />} />
      {/* Single product page: gallery, description/details tabs, buy panel. */}
      <Route path="/product/:id" element={<ProductDetail />} />
      {/* Prescription / lens selection flow, reached from "SELECT LENSES" or the cart. */}
      <Route path="/lens-selection/:id" element={<LensSelection />} />
      {/* Cart page: real items from CartContext, or the empty-state message. */}
      <Route path="/cart" element={<Cart />} />
      {/* Checkout: delivery details, payment method, places a real order. */}
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/order-confirmation/:id" element={<OrderConfirmation />} />
      {/* Customer reviews list. */}
      <Route path="/reviews" element={<Reviews />} />
      {/* Static/info pages */}
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/faqs" element={<FAQ />} />
      <Route path="/exchange-return-policy" element={<ExchangeReturnPolicy />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      </Routes>
    </>
  );
}

export default App;
