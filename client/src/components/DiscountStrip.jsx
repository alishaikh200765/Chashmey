export default function DiscountStrip() {
  return (
    <div className="max-w-7xl mx-auto px-6 mt-4">
      <div className="bg-brand-primary rounded-full flex flex-wrap items-center gap-3 px-6 py-3">
        <span className="text-white font-bold text-lg">
          Pay with bank transfer and get
        </span>
        <span className="bg-white text-brand-primary font-extrabold px-4 py-1.5 rounded-full text-sm">
          flat 15% discount <span className="font-medium">on glasses &amp; sunglasses</span>
        </span>
        <span className="text-white font-bold">at checkout</span>
        <span className="bg-white text-brand-primary font-bold px-4 py-1.5 rounded-full text-sm">
          10% discount on contact lenses
        </span>
      </div>
    </div>
  );
}
