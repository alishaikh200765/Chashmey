import { useEffect, useState } from "react";
import { FiStar } from "react-icons/fi";
import TopStrip from "../components/TopStrip.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { fetchReviews } from "../api/reviews.js";

// Headline "Reviews (12800)" is a marketing stat (same 12K+ figure used
// sitewide), independent of how many individual review cards are loaded.
const HEADLINE_COUNT = 12800;

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews({ limit: 20 })
      .then((data) => setReviews(data.items))
      .catch((err) => console.error("Failed to load reviews:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <TopStrip text="Same day or next day delivery in Lahore" />
      <Header />

      <div className="max-w-4xl mx-auto px-6 mt-10 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Customer Reviews</h1>
        <p className="text-gray-600 mt-2">Reviews ({HEADLINE_COUNT.toLocaleString()})</p>
      </div>

      <div className="max-w-4xl mx-auto px-6 mt-8 mb-16 space-y-4">
        {loading &&
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-md h-32 animate-pulse" />
          ))}

        {!loading &&
          reviews.map((r) => (
            <div key={r._id} className="bg-gray-50 rounded-md p-6 flex justify-between gap-6">
              <div>
                <div className="flex gap-0.5 text-brand-gold mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FiStar key={i} className={i < r.rating ? "fill-brand-gold" : ""} />
                  ))}
                </div>
                <h3 className="font-bold text-gray-900">"{r.title}"</h3>
                <p className="text-gray-600 mt-2 text-sm">{r.body}</p>
                {r.image && (
                  <img
                    src={r.image}
                    alt="Review"
                    className="w-24 h-24 object-contain bg-white rounded mt-4 border border-gray-200"
                  />
                )}
              </div>
              <div className="text-right shrink-0 min-w-[180px]">
                <p className="font-semibold text-gray-900">{r.reviewerName}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Reviewed on {new Date(r.reviewedAt).toLocaleDateString("en-GB")}
                  {r.size ? ` - Size ${r.size}` : ""}
                </p>
                {r.productName && (
                  <p className="text-brand-primary text-sm font-medium mt-1">{r.productName}</p>
                )}
              </div>
            </div>
          ))}

        {!loading && reviews.length === 0 && (
          <p className="text-center text-gray-500">No reviews yet.</p>
        )}
      </div>

      <Footer />
    </div>
  );
}
