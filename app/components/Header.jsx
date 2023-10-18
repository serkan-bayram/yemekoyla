export default function Header({ text }) {
  return (
    <div className="w-full text-center pt-6 flex items-center justify-center transition-all">
      <h1 className="text-white max-w-[25ch]">{text}</h1>
    </div>
  );
}
