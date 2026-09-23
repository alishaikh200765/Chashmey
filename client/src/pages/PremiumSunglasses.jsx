import { useEffect, useState } from "react";
import TopStrip from "../components/TopStrip.jsx";
import Header from "../components/Header.jsx";
import Breadcrumb from "../components/Breadcrumb.jsx";
import PageIntro from "../components/PageIntro.jsx";
import BrandRow from "../components/BrandRow.jsx";
import FilterBar from "../components/FilterBar.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
import Pagination from "../components/Pagination.jsx";
import Footer from "../components/Footer.jsx";
import { fetchProducts } from "../api/products.js";
import { shopLink as q } from "../utils/shopLink.js";


const brands = [
  { name: "Ray Bannnnn", image: "https://dreamspakistan.com/cdn/shop/files/73130_1.webp?v=1749826364&width=600" },
  {
    name: "Prada",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRpfMaKeXNTGoSGrQQQ-w_ttZPPthL5aWGMDPuCQu63ZfT2f4dpSnLnCuW&s=10",
  },
  {
    name: "Louis Vuitton",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS1hI9AwY9uleHTj8YL9kta0UWpxz2Q-PewyQoYxCJBnTJJdFM6PkYh_pG&s=10",
  },
  { name: "Gucci", image: "https://dreamspakistan.com/cdn/shop/files/73008_1.webp?v=1749826333" },
  {
    name: "Oliver Peoples",
    image: "https://top3.com.au/cdn/shop/files/izipizi_reading_E_tortoise_front_1500.jpg?v=1741234839&width=720",
  },
  { name: "Mont Blanc", image: "https://shopoptica.com/wp-content/uploads/2024/10/190.jpg" },
].map((brand) => ({
  ...brand,
  to: q({ category: "sunglasses", brand: brand.name }),
}));

const LIMIT = 18;

export default function PremiumSunglasses() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sort, setSort] = useState("latest");
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    setLoading(true);

    const cleanFilters = Object.fromEntries(
      Object.entries(filters).filter(([, v]) => v !== undefined)
    );

    fetchProducts({ subCategory: "premium-sunglasses", sort, page, limit: LIMIT, ...cleanFilters })
      .then((data) => {
        if (ignore) return;
        setProducts(data.items);
        setTotal(data.total);
        setTotalPages(data.totalPages);
      })
      .catch((err) => console.error("Failed to load products:", err))
      .finally(() => !ignore && setLoading(false));
    return () => {
      ignore = true;
    };
  }, [sort, page, filters]);

  const handleFilterChange = (patch) => {
    setFilters((prev) => ({ ...prev, ...patch }));
    setPage(1);
  };

  const handleClearFilters = () => {
    setFilters({});
    setPage(1);
  };

  const rangeStart = total === 0 ? 0 : (page - 1) * LIMIT + 1;
  const rangeEnd = Math.min(page * LIMIT, total);

  return (
    <div>
      <TopStrip text="Same day or next day delivery in Lahore" />
      <Header />
      <Breadcrumb trail={["Home", "Premium Sunglasses"]} />
      <PageIntro
        title="Premium Sunglasses"
        description="You will get all the premium quality sunglasses of different brands here."
      />
      <BrandRow brands={brands} />
      <FilterBar
        total={total}
        rangeStart={rangeStart}
        rangeEnd={rangeEnd}
        sort={sort}
        onSortChange={(v) => {
          setSort(v);
          setPage(1);
        }}
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />
      <ProductGrid products={products} loading={loading} />
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      <Footer />
    </div>
  );
}
