import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import TopStrip from "../components/TopStrip.jsx";
import Header from "../components/Header.jsx";
import Breadcrumb from "../components/Breadcrumb.jsx";
import PageIntro from "../components/PageIntro.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
import Pagination from "../components/Pagination.jsx";
import Footer from "../components/Footer.jsx";
import { fetchProducts } from "../api/products.js";

const LIMIT = 12;
const humanize = (slug) =>
  slug
    .split("-")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");

function deriveTitle(params) {
  if (params.get("title")) return params.get("title");
  const brand = params.get("brand");
  const subCategory = params.get("subCategory");
  const category = params.get("category");
  const gender = params.get("gender");
  const badge = params.get("badge");

  if (brand && category) return `${brand} ${humanize(category)}`;
  if (subCategory) return humanize(subCategory);
  if (badge) return `${badge} ${category ? humanize(category) : "Products"}`;
  if (gender && category) return `${gender === "men" ? "Men" : "Women"} ${humanize(category)}`;
  if (category) return humanize(category);
  return "Shop";
}

export default function Shop() {
  const [params] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const queryKey = params.toString();
  const title = deriveTitle(params);

  useEffect(() => {
    setPage(1);
  }, [queryKey]);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    const query = Object.fromEntries(params.entries());
    delete query.title;
    fetchProducts({ ...query, page, limit: LIMIT })
      .then((data) => {
        if (ignore) return;
        setProducts(data.items);
        setTotal(data.total);
        setTotalPages(data.totalPages);
      })
      .catch((err) => console.error("Failed to load shop products:", err))
      .finally(() => !ignore && setLoading(false));
    return () => {
      ignore = true;
    };
  }, [queryKey, page]);

  return (
    <div>
      <TopStrip />
      <Header />
      <Breadcrumb trail={["Home", title]} />
      <PageIntro
        title={title}
        description={`Browse our ${title.toLowerCase()} collection.`}
      />
      <ProductGrid products={products} loading={loading} />
      {!loading && total > 0 && (
        <p className="max-w-7xl mx-auto px-6 text-sm text-gray-500 mt-2">
          {total} product{total === 1 ? "" : "s"} found
        </p>
      )}
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      <Footer />
    </div>
  );
}
