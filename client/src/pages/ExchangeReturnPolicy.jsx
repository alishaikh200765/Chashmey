import TopStrip from "../components/TopStrip.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

export default function ExchangeReturnPolicy() {
  return (
    <div>
      <TopStrip />
      <Header />

      <div className="max-w-3xl mx-auto px-6 mt-10 mb-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Exchange &amp; Return Policy</h1>
        <p className="text-gray-600 text-sm mb-6">
          At Chashmey.pk, customer satisfaction is our priority. Please read our policy carefully
          before placing your order:
        </p>

        <ol className="space-y-5 list-decimal list-inside text-sm text-gray-700">
          <li>
            <span className="font-semibold text-gray-900">Frames &amp; Sunglasses</span>
            <ul className="list-disc list-inside mt-1 ml-4 space-y-1">
              <li>
                You can request an <span className="font-semibold">exchange or return within 7 days</span> of
                receiving your order.
              </li>
              <li>Product must be unused, undamaged, and in its original packaging.</li>
            </ul>
          </li>
          <li>
            <span className="font-semibold text-gray-900">Eyesight Glasses &amp; Eyesight Sunglasses</span>
            <ul className="list-disc list-inside mt-1 ml-4 space-y-1">
              <li>
                <span className="font-semibold">No exchange or return</span> is applicable on customized
                eyesight glasses or eyesight sunglasses.
              </li>
            </ul>
          </li>
          <li>
            <span className="font-semibold text-gray-900">Contact Lenses</span>
            <ul className="list-disc list-inside mt-1 ml-4 space-y-1">
              <li>
                <span className="font-semibold">No return</span> is allowed on contact lenses.
              </li>
              <li>Exchange is only possible for sealed/packed lenses.</li>
              <li>Opened or used lenses cannot be exchanged or returned.</li>
            </ul>
          </li>
          <li>
            <span className="font-semibold text-gray-900">Refunds</span>
            <ul className="list-disc list-inside mt-1 ml-4 space-y-1">
              <li>
                For orders paid via <span className="font-semibold">Bank Transfer</span>, we will refund the
                full amount.
              </li>
              <li>
                For <span className="font-semibold">Cash on Delivery (COD)</span> orders, a 4% deduction will
                be applied as tax by the government.
              </li>
            </ul>
          </li>
          <li>
            <span className="font-semibold text-gray-900">General Conditions</span>
            <ul className="list-disc list-inside mt-1 ml-4 space-y-1">
              <li>All returns/exchanges must be requested within the specified period.</li>
              <li>
                Shipping costs for return/exchange will be borne by the customer, unless the product is
                faulty or incorrect.
              </li>
            </ul>
          </li>
        </ol>
      </div>

      <Footer />
    </div>
  );
}
