import OtherRatings from "./OtherRatings";
import { getOtherRatings } from "./getOtherRatings";
import { v4 as uuidv4 } from "uuid";

export default async function Others() {
  const { ratings, average } = await getOtherRatings();

  return (
    <div className="flex flex-col px-8 pt-12  ">
      <div className="text-gray-500 pb-1 flex justify-between items-center">
        <div>Diğer Oylamalar</div>
        <div>
          Genel Puan: <span className="text-white">{average}/5</span>
        </div>
      </div>
      <ul className="mb-8 shadow border border-gray-700">
        {ratings.map((rating, index) => {
          return (
            <OtherRatings
              username={rating.username}
              rating={parseInt(rating.rating)}
              key={uuidv4()}
              index={index}
            />
          );
        })}
      </ul>
    </div>
  );
}