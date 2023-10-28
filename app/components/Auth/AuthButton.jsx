import Loading from "../LoadingButton";

export default function AuthButton({ isLoading, text }) {
  return isLoading ? (
    <Loading />
  ) : (
    <div
      className="w-full rounded-md bg-primary
   hover:bg-transparent transition-all
 border duration-300 border-gray-500"
    >
      <button className="w-full h-full py-2 flex justify-center items-center text-center bg-transparent appearance-none text-white text-sm">
        {text}
      </button>
    </div>
  );
}
