import OtherRatings from "./OtherRatings";
import { getOtherRatings } from "./getOtherRatings";
import { v4 as uuidv4 } from "uuid";
import CommentSection from "./CommentSection";
import { getUsername } from "../../components/Functions/getUsername";

export default async function Others({ rating }) {
  const response = await getOtherRatings();
  const currentUser = await getUsername();

  const ratings = response?.ratings || null;
  const average = response?.average || null;

  return (
    <div className="flex flex-col">
      <ul
        className="shadow border rounded-md border-gray-700
       bg-primary-400"
      >
        <CommentSection rating={rating} currentUser={currentUser} />
        {!!average ? (
          ratings.map((rating, index) => {
            return (
              <OtherRatings
                gif={rating?.gif || ""}
                username={rating?.username || "Anonim"}
                rating={parseFloat(rating.rating)}
                ratingId={rating.ratingId}
                comment={rating?.comment || ""}
                key={uuidv4()}
                index={index}
              />
            );
          })
        ) : (
          <li className="p-5 lg:min-w-[500px] flex justify-center items-center">
            İlk oyu siz verin!
          </li>
        )}
      </ul>
    </div>
  );
}
