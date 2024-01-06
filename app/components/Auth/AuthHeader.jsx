export default function AuthHeader({ text }) {
  return (
    <div
      className="w-full text-center py-9
     flex items-center justify-center transition-all  font-heading"
    >
      <h1 className="text-white max-w-[25ch] text-lg">{text}</h1>
    </div>
  );
}
