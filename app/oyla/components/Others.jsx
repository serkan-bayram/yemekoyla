import OtherRatings from "./OtherRatings";
import { getOtherRatings } from "./getOtherRatings";
import { v4 as uuidv4 } from "uuid";

export default async function Others({ pb }) {
  const response = await getOtherRatings(pb);

  const ratings = response?.ratings || null;
  const average = response?.average || null;

  return (
    <div className="flex flex-col px-8 pt-12  ">
      <div className="text-gray-500 pb-1 flex justify-between items-center">
        <div>Diğer Oylamalar</div>
        {!!average ? (
          <div>
            Genel Puan:{" "}
            <span className="text-white">{average.toFixed(2)}/5</span>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <ul className="mb-8 shadow border  border-gray-700">
        {!!average ? (
          ratings.map((rating, index) => {
            return (
              <OtherRatings
                username={rating?.username || "Anonim"}
                rating={parseFloat(rating.rating)}
                comment={rating?.comment || ""}
                key={uuidv4()}
                index={index}
              />
            );
          })
        ) : (
          <li className="w-full p-5 flex justify-center items-center">
            İlk oyu siz verin!
          </li>
        )}
      </ul>
    </div>
  );
}
