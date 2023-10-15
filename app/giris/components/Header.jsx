export default function Header({ text }) {
  return (
    <div className="w-full pt-6 flex items-center justify-center transition-all">
      <h1 className="text-white">{text}</h1>
    </div>
  );
}
