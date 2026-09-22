export default function TopStrip({ text = "1 to 3 days for delivery in Pakistan" }) {
  return (
    <div className="bg-brand-primary text-white text-center text-sm py-2 font-medium">
      {text}
    </div>
  );
}
