import OtherRatings from "./OtherRatings";
import { getOtherRatings } from "./getOtherRatings";
import { v4 as uuidv4 } from "uuid";
import CommentSection from "./CommentSection";
import { getUsername } from "../../components/Functions/getUsername";
import { getRatings } from "../../components/Functions/getRatings";
import { headers } from "next/headers";

export default async function Others({ date }) {
  const headersList = headers();

  const isGuest = headersList.get("is-guest");

  const userRating = isGuest ? null : await getRatings();

  const rating = isGuest
    ? null
    : {
        comment: userRating?.comment || "",
        rating: userRating?.rating || null,
        gif: userRating?.gif || "",
        ratingId: userRating?.id || null,
        isAnonim: userRating?.isAnonim,
      };

  const response = await getOtherRatings(date);
  const currentUser = isGuest ? "Misafir" : await getUsername();

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
                isGuest={isGuest}
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
