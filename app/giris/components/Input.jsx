"use client";

export default function Input({ placeholder }) {
  return (
    <div className="w-full py-2 rounded-md border border-primary">
      <input
        className="w-full pr-4 bg-transparent pl-4 placeholder:text-sm appearance-none outline-none placeholder:text-gray-500 text-white text-sm"
        placeholder={placeholder}
      />
    </div>
  );
}
