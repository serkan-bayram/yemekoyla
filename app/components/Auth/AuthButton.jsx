import { Icon } from "../Input/Icon";
import Loading from "../LoadingButton";

export default function AuthButton({
  handleClick = () => {},
  isLoading,
  text,
  iconName,
}) {
  return isLoading ? (
    <Loading />
  ) : (
    <div
      className="w-full rounded-md bg-primary-100
   hover:bg-transparent transition-all
 border duration-300 border-gray-500"
    >
      <button
        onClick={handleClick}
        className="w-full h-full py-3 gap-2 flex justify-center 
        items-center text-center bg-transparent 
        appearance-none text-fade-400 text-sm font-body font-semibold"
      >
        {text}
        {iconName && <Icon name={iconName} />}
      </button>
    </div>
  );
}
