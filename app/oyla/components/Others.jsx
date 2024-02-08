import OtherRatings from "./OtherRatings";
import { getOtherRatings } from "./getOtherRatings";
import { v4 as uuidv4 } from "uuid";
import CommentSection from "./CommentSection";
import { getUsername } from "../../components/Functions/getUsername";
import { getRatings } from "../../components/Functions/getRatings";
import { cookies } from "next/headers";

export default async function Others({ date }) {
  cookies();

  const userRating = await getRatings();

  const rating = {
    comment: userRating?.comment || "",
    rating: userRating?.rating || null,
    gif: userRating?.gif || "",
    ratingId: userRating?.id || null,
  };

  const response = await getOtherRatings(date);
  const currentUser = await getUsername();

  const ratings = response?.ratings || null;
  const average = response?.average || null;

  return (
    <div className="flex flex-col flex-1">
      <ul
        className="shadow border rounded-md border-gray-700
       bg-primary-400"
      >
        {!!date === false && (
          <CommentSection rating={rating} currentUser={currentUser} />
        )}
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
                avatar={rating.avatar}
              />
            );
          })
        ) : (
          <li className="p-5 flex justify-center items-center">
            {!!date
              ? "Bu tarihte hiç değerlendirme yapılmamış."
              : "İlk oyu siz verin!"}
          </li>
        )}
      </ul>
    </div>
  );
}
