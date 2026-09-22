import TopStrip from "../components/TopStrip.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

const sections = [
  {
    heading: "Use of This Site",
    body:
      "By placing an order on Chashmey.pk, you confirm the information you provide (including prescription details) is accurate to the best of your knowledge.",
  },
  {
    heading: "Orders & Pricing",
    body:
      "All prices are listed in PKR and may change without prior notice. We reserve the right to cancel an order if a pricing or listing error is discovered.",
  },
  {
    heading: "Prescription Accuracy",
    body:
      "Prescription lenses are made to the specifications you submit. Please double-check your prescription before confirming — see our Exchange & Return Policy for what's covered if something's wrong.",
  },
  {
    heading: "Payments",
    body:
      "We currently support Cash on Delivery and bank transfer (with a discount). Bank transfer orders are confirmed once payment is verified.",
  },
  {
    heading: "Limitation of Liability",
    body:
      "Chashmey.pk is provided \"as is.\" We aren't liable for indirect or incidental damages arising from use of the site or products, to the extent permitted by law.",
  },
  {
    heading: "Changes to These Terms",
    body: "We may update these terms from time to time; continued use of the site means you accept the current version.",
  },
];

export default function TermsAndConditions() {
  return (
    <div>
      <TopStrip />
      <Header />

      <div className="max-w-3xl mx-auto px-6 mt-10 mb-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms and Conditions of Use</h1>
        <p className="text-xs text-gray-400 mb-6">Last updated: July 2026</p>

        <div className="space-y-6">
          {sections.map((s) => (
            <div key={s.heading}>
              <h2 className="font-semibold text-gray-900 mb-1">{s.heading}</h2>
              <p className="text-sm text-gray-600">{s.body}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
