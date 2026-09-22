import TopStrip from "../components/TopStrip.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

const sections = [
  {
    heading: "Information We Collect",
    body:
      "When you place an order, create an account, or contact us, we collect information such as your name, email, phone number, shipping address, and — where relevant — the prescription details you provide for lens orders.",
  },
  {
    heading: "How We Use Your Information",
    body:
      "We use your information to process orders, communicate order and delivery updates, respond to support requests, and improve our products and services.",
  },
  {
    heading: "Cookies",
    body:
      "We use cookies to keep you signed in, remember items in your cart, and understand how the site is used so we can improve it.",
  },
  {
    heading: "Sharing Your Information",
    body:
      "We do not sell your personal information. We share only what's necessary with delivery partners to fulfil your order, and with service providers who help us run the site.",
  },
  {
    heading: "Data Retention & Security",
    body:
      "We retain order and account information for as long as needed to provide our services and meet legal obligations, and take reasonable measures to protect it from unauthorized access.",
  },
  {
    heading: "Your Choices",
    body:
      "You can request access to, correction of, or deletion of your personal information at any time by contacting us.",
  },
  {
    heading: "Contact Us",
    body: "Questions about this policy? Reach us at sales@chashmey.pk.",
  },
];

export default function PrivacyPolicy() {
  return (
    <div>
      <TopStrip />
      <Header />

      <div className="max-w-3xl mx-auto px-6 mt-10 mb-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
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
