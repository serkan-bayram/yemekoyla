import { BigStars } from "./Stars";
import Rating from "@mui/material/Rating";

export function RatingContainerGuest() {
  return (
    <div className="flex flex-col items-center bg-primary w-1/2 md:w-1/3 mx-auto min-w-[250px] rounded-md shadow-md  p-6 border border-gray-700">
      <h1 className="text-white text-center font-bold">Genel Puan</h1>
      <div className="flex flex-col items-center">
        <div className="relative flex items-center gap-2 justify-center mt-4 ">
          <Rating
            name="rating"
            precision={0.5}
            readOnly
            size="large"
            sx={{
              "& .MuiRating-iconEmpty": {
                color: "#d1d5db",
              },
            }}
          />
        </div>
        <div className="mt-4"></div>
      </div>
    </div>
  );
}

export default function RatingContainer({ rating }) {
  return (
    <div className="flex flex-col items-center bg-primary w-1/2 md:w-1/3 mx-auto min-w-[250px] rounded-md shadow-md  p-6 border border-gray-700">
      <h1 className="text-white text-center font-bold">Genel Puan</h1>
      <BigStars rating={rating} />
    </div>
  );
}
