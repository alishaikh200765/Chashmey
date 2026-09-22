export default function PageIntro({ title, description }) {
  return (
    <div className="max-w-7xl mx-auto px-6 mt-4">
      <div className="bg-brand-cream rounded-xl px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>
    </div>
  );
}
