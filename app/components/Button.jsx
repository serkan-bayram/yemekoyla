export default function Button({ text }) {
  return (
    <div className="w-full rounded-sm bg-primary border border-gray-500">
      <button className="w-full h-full py-2 flex justify-center items-center text-center bg-transparent appearance-none text-white text-sm">
        {text}
      </button>
    </div>
  );
}
