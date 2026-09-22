import TopStrip from "../components/TopStrip.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

const sections = [
  {
    heading: "Orders / General",
    qas: [
      {
        q: "How do I place an order?",
        a: "Just browse our site and choose a frame. Enter your prescription prescribed by your optometrist and choose from the variety of lenses. There is an extra option of coatings for you if you want that. The rest would be taken care of by the Chashmey.pk team.",
      },
      {
        q: "Where do I find my prescription?",
        a: "By law, your optometrist or eye-care professional has to provide you with a prescription following an eye exam.",
      },
      {
        q: "How is Chashmey.pk easy on the pocket?",
        a: "The pricing is reduced by eliminating the role of middlemen, and all the cost attached to retail is kept at the same time as quality is maintained to the best. Chashmey.pk manufacturing is done under one roof where quality is the prime objective.",
      },
    ],
  },
  {
    heading: "Frames",
    qas: [
      {
        q: "What kind of frames are sold at Chashmey.pk?",
        a: "We are putting forward eminent optical frames and lenses that are manufactured for perfection. Chashmey.pk offers a wide range of optical products varying from optical frames (full rim, semi rim, and rimless frames) to trendy sunglasses of the best variety that fit every style and budget.",
      },
      {
        q: "Is there a way to try on Chashmey.pk frames before I buy?",
        a: "Absolutely yes — this build focuses on browsing, filtering, and checkout rather than a live camera try-on, so this specific feature isn't wired up here.",
      },
      {
        q: "Is it possible to order Chashmey.pk frames with non-prescription lenses?",
        a: "Yes, you can choose plain (non-prescription) lenses during the lens selection step on any product page.",
      },
    ],
  },
  {
    heading: "Delivery and Shipping",
    qas: [
      {
        q: "Can I track my order?",
        a: "Yes — once your order ships, you'll be able to track it using the courier's tracking reference.",
      },
      {
        q: "How long do I have to wait for my glasses after I have ordered them?",
        a: "We ensure that your order should reach you within 1-4 business days.",
      },
      {
        q: "What shipping methods do you offer?",
        a: "We offer a Cash on Delivery (COD) option for your convenience, as well as prepaid bank transfer with a discount.",
      },
    ],
  },
  {
    heading: "Support",
    qas: [
      {
        q: "Oops! I entered some of my prescription incorrectly. Now what?",
        a: "Don't panic. Just contact us via the Contact Us page as soon as you find the mistake, and the rest will be handled by our team.",
      },
    ],
  },
  {
    heading: "Prescriptions",
    qas: [
      {
        q: "What do the numbers on my prescription mean?",
        a: "A prescription normally has a chart of your vision suggesting the numbers for a better sighting. The chart usually has two rows — one for each eye — and columns filled by the numbers your eye-care specialist has suggested.",
      },
      {
        q: "SPH or Sphere",
        a: "It explains the spherical error of the eye. The measurement of Sphere is in quarters and has a (+) or (−) sign.",
      },
      {
        q: "CYL or Cylinder",
        a: "It defines the refractive error of the astigmatism, which makes vision blurry or distorted. It's also measured in quarters and with (+) or (−) signs.",
      },
      {
        q: "AXIS",
        a: "It refers to your eye's astigmatism alignment and is calculated in degrees from 1 to 180.",
      },
      {
        q: "ADD or NV",
        a: "Near Vision gives the reading correction of the eyes. It increases near vision and is always specified with a positive (+) sign.",
      },
      {
        q: "O.D or R",
        a: "It is used for the right eye.",
      },
      {
        q: "O.S or L",
        a: "It is used for the left eye.",
      },
      {
        q: "Can I use my contact lens prescription for ordering glasses?",
        a: "No, we don't suggest it. Prescriptions for contact lenses differ from eyeglasses, and interchanging the two can affect your vision correction.",
      },
    ],
  },
];

export default function FAQ() {
  return (
    <div>
      <TopStrip text="Pay with bank transfer and get upto 15% off" />
      <Header />

      <div className="max-w-3xl mx-auto px-6 mt-10 mb-16">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-10">
          Frequently Asked Questions
        </h1>

        {sections.map((section) => (
          <div key={section.heading} className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 text-center mb-6">{section.heading}</h2>
            <div className="space-y-6">
              {section.qas.map((item) => (
                <div key={item.q}>
                  <p className="font-semibold text-gray-900">{item.q}</p>
                  <p className="text-sm text-gray-600 mt-1">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}
