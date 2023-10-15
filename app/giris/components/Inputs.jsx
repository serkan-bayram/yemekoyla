export default function Inputs({ children }) {
  return <div className="px-8 pt-12 flex flex-col gap-6">{children}</div>;
}

export function Input({ placeholder }) {
  return (
    <div className="w-full py-2 rounded-md border border-primary">
      <input
        className="w-full pr-4 bg-transparent pl-4 placeholder:text-sm appearance-none outline-none placeholder:text-gray-500 text-white text-sm"
        placeholder={placeholder}
      />
    </div>
  );
}
