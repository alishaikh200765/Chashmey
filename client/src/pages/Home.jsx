import TopStrip from "../components/TopStrip.jsx";
import Header from "../components/Header.jsx";
import HeroCarousel from "../components/HeroCarousel.jsx";
import TrustBar from "../components/TrustBar.jsx";
import ShopByCategory from "../components/ShopByCategory.jsx";
import ProductSection from "../components/ProductSection.jsx";
import LensSection from "../components/LensSection.jsx";
import Accordion from "../components/Accordion.jsx";
import Footer from "../components/Footer.jsx";

const infoItems = [
  {
    question: "Glasses Price in Pakistan",
    answer:
      "Glasses prices in Pakistan vary by material, brand, and lens type, but Chashmey.pk keeps pricing transparent and affordable by manufacturing frames and lenses under one roof — cutting out middlemen without cutting corners on quality.",
  },
  {
    question: "Online Glasses in Pakistan",
    answer:
      "Shopping for glasses online means you can browse hundreds of frames, filter by shape, size, and material, and upload your prescription from home — with free delivery across Pakistan and a 7-day exchange window if something isn't right.",
  },
  {
    question: "Eyeglasses Frames",
    answer:
      "Pick up elegant eyeglasses frame styles in vintage designs at Chashmey.pk to achieve timeless, fashionable looks. Upgrade your look with the incredible styles of our top-of-the-line frames, whether you're after prescription glasses or a fashion frame. Select our exceptional designer glasses and artistic flair frames — highly appealing and built to stay functional for years. The hottest trend in eyewear is all here at Chashmey.pk.",
  },
];

const faqItems = [
  {
    question: "How to Buy Online Glasses in Pakistan?",
    answer:
      "Buying glasses online in Pakistan is a piece of cake — no need to fret about it. Frame prices are reasonable and affordable, and we'd highly recommend checking them out on our official website, chashmey.pk, to get glasses with amazing outlooks. Wherever you're based — Lahore, Islamabad, Rawalpindi, Karachi, Multan, or any other city — we offer free delivery all over Pakistan. Let us know what type of glasses you want and we'll get back to you with great offers.",
  },
  {
    question: "What Glasses Frames are Trending?",
    answer:
      "Right now, oversized acetate frames, thin metal aviators, and clear/transparent frames are trending across Pakistan — check the Premium Glasses and Premium Sunglasses collections for the latest arrivals.",
  },
  {
    question: "What Is The Most Popular Frame For Glasses?",
    answer:
      "Classic rectangular and round full-rim frames remain the most popular overall, since they suit the widest range of face shapes and work equally well for prescription and fashion wear.",
  },
];

export default function Home() {
  return (
    <div>
      <TopStrip />
      <Header />
      <HeroCarousel />
      <TrustBar />
      <ShopByCategory />

      <ProductSection
        title="Premium Sunglasses"
        tagline="Acetate Material | Premium Finishing | Life Long Quality"
        subCategory="premium-sunglasses"
        limit={8}
      />

      <ProductSection
        title="Sunglasses For Men & Women"
        tagline="UV Protected | Gradient Tinted | Polarized Filters"
        subCategory="men-women-sunglasses"
        ctaLabel="Explore Collection"
        limit={8}
      />

      <LensSection />

      <Accordion items={infoItems} />
      <Accordion title="FAQ" items={faqItems} />

      <Footer />
    </div>
  );
}
