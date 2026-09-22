import { Link } from "react-router-dom";
import { FiInfo, FiTrash2 } from "react-icons/fi";
import TopStrip from "../components/TopStrip.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { useCart } from "../context/CartContext.jsx";

export default function Cart() {
  const { items, removeFromCart, updateQty, subtotal } = useCart();

  return (
    <div>
      <TopStrip />
      <Header />

      <div className="max-w-5xl mx-auto px-6 mt-10">
        <h1 className="text-4xl font-bold text-center text-gray-900 border-b-2 border-brand-primary pb-6">
          Cart
        </h1>

        {items.length === 0 ? (
          <>
            <div className="bg-gray-100 border border-gray-200 rounded-md flex items-center gap-3 px-5 py-4 mt-8 text-gray-700">
              <FiInfo className="text-brand-primary shrink-0" />
              Your cart is currently empty.
            </div>
            <Link
              to="/"
              className="inline-block bg-gray-200 text-gray-800 font-medium px-5 py-2.5 rounded mt-6 hover:bg-gray-300"
            >
              Return to shop
            </Link>
          </>
        ) : (
          <div className="mt-8">
            <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
              {items.map((item) => (
                <div key={item.lineId} className="flex items-center gap-4 py-5">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-contain bg-gray-50 rounded"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Size: {item.size}
                      {item.color && (
                        <>
                          {" "}
                          · Color:{" "}
                          <span
                            className="inline-block w-3 h-3 rounded-full align-middle ml-1"
                            style={{ background: item.color }}
                          />
                        </>
                      )}
                    </p>
                    {item.lens ? (
                      <p className="text-xs text-brand-primary mt-1">
                        Lens: {item.lens.summary}
                      </p>
                    ) : (
                      <Link
                        to={`/lens-selection/${item.productId}?lineId=${item.lineId}`}
                        className="text-xs text-brand-primary underline mt-1 inline-block"
                      >
                        + Add prescription lenses
                      </Link>
                    )}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQty(item.lineId, item.qty - 1)}
                        className="w-7 h-7 border border-gray-300 rounded text-gray-600"
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-sm">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.lineId, item.qty + 1)}
                        className="w-7 h-7 border border-gray-300 rounded text-gray-600"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <p className="font-bold text-gray-900">Rs {(item.price * item.qty).toLocaleString()}</p>
                  <button
                    onClick={() => removeFromCart(item.lineId)}
                    aria-label="Remove item"
                    className="text-gray-400 hover:text-brand-primary"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-6">
              <div className="w-full sm:w-80">
                <div className="flex justify-between text-sm text-gray-600 py-1">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">Rs {subtotal.toLocaleString()}</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">Shipping &amp; discounts calculated at checkout.</p>
                <Link
                  to="/checkout"
                  className="block text-center w-full bg-brand-primary text-white font-semibold rounded-md py-3 mt-4"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-16">
        <Footer />
      </div>
    </div>
  );
}
