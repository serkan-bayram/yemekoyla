import { FaAngleDown } from "react-icons/fa6";

export default function DatePicker() {
  return (
    <div className="flex justify-center items-center gap-1 pt-8">
      <button className="flex gap-1 items-center py-2 px-5 text-xs rounded-full text-white  appearance-none focus:ring ring-primary">
        Bugün
        <FaAngleDown />
      </button>
    </div>
  );
}
