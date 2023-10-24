import { FaAngleDown } from "react-icons/fa6";

export default function DatePicker() {
  return (
    <div
      title="Yakında."
      className="flex justify-center items-center gap-1 pt-8"
    >
      <button
        disabled
        className="text-gray-700
         cursor-not-allowed flex gap-1 
         items-center py-2 px-5 text-xs 
         rounded-full appearance-none focus:ring ring-primary"
      >
        Bugün
        <FaAngleDown />
      </button>
    </div>
  );
}
