import { Link } from "react-router-dom";
import { placeholderImage } from "../utils/placeholderImage.js";
import { shopLink as q } from "../utils/shopLink.js";

const categories = [
  {
    name: "Eyeglasses",
    color: "#1F5D4B",
    image: "https://www.eyeglasses.pk/media/catalog/product/1/5/157023w.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700",
  },
  {
    name: "Premium Glasses",
    color: "#B8912F",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHUVavCIm-CjMQwZsJyFzJ_sN85Dn0jpXTXQqM5Hbz0lvgdUkgaeDBc9PC&s=10",
  },
  {
    name: "Metal Glasses",
    color: "#33506B",
    image: "https://ainakstore.com/wp-content/uploads/28-01.webp",
  },
  {
    name: "Sunglasses",
    color: "#0F1B2B",
    image: "https://audeamuswatch.com/cdn/shop/files/C1.png?v=1695229721",
  },
  {
    name: "Premium Sunglasses",
    color: "#5A3E24",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9Xb2xSzIZcKgKbhWdnCUXCO2rUDILdyCQKcMXsEdzdwylKXnyBuTwF9OD&s=10",
  },
];

export default function ShopByCategory() {
  return (
    <div className="max-w-7xl mx-auto px-6 mt-6">
      <div className="bg-brand-cream rounded-xl px-8 py-10">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Shop By Category</h2>
        <div className="flex flex-wrap justify-center gap-10">
          {categories.map((cat) => (
            <Link key={cat.name} to={cat.to} className="flex flex-col items-center gap-3 w-28">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-28 h-28 rounded-full object-cover"
              />
              <span className="text-sm font-medium text-gray-800 text-center">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
