export function Textarea({ placeholder, name }) {
  return (
    <div className="w-full py-2 rounded-md border border-primary">
      <textarea
        required
        name={name}
        rows={12}
        className="resize-none w-full px-4  bg-transparent placeholder:text-sm appearance-none outline-none placeholder:text-gray-500 text-white text-sm"
        placeholder={placeholder}
      />
    </div>
  );
}

export default function Input({ placeholder, name }) {
  return (
    <div className="w-full  py-2 rounded-md border border-primary">
      <input
        required
        name={name}
        className="w-full px-4 bg-transparent placeholder:text-sm appearance-none outline-none placeholder:text-gray-500 text-white text-sm"
        placeholder={placeholder}
      />
    </div>
  );
}
