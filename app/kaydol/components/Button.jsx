"use client";

export default function Button({ text, handleClick }) {
  return (
    <div className="w-full rounded-md bg-primary border border-gray-500">
      <button
        onClick={handleClick}
        className="w-full h-full py-2 flex justify-center items-center text-center bg-transparent appearance-none text-white text-sm"
      >
        {text}
      </button>
    </div>
  );
}
