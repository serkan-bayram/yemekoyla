import { BigStars } from "./Stars";

export default function RatingContainer({ rating }) {
  return (
    <div className="flex flex-col items-center bg-primary w-1/2 md:w-1/3 mx-auto min-w-[250px] rounded-md shadow-md  p-6 border border-gray-700">
      <h1 className="text-white text-center font-bold">Genel Puan</h1>
      <BigStars rating={rating} />
    </div>
  );
}
