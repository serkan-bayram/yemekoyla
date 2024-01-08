import OtherRatings, { OtherRatingsGuest } from "./OtherRatings";
import { getOtherRatings } from "./getOtherRatings";
import { v4 as uuidv4 } from "uuid";

export async function OthersGuest({ pb, emojis }) {
  const response = await getOtherRatings(pb);

  const ratings = response?.ratings || null;
  const average = response?.average || null;

  const emojisArray = ["❤", "😂", "😔", "😡", "🤗"];

  return (
    <div className="flex flex-col px-2 pt-12 lg:pt-0 lg:px-48  ">
      <div className="flex justify-between mb-1 font-heading">
        <div>Yorumlar</div>
        {!!average ? <div>Ortalama: {average.toFixed(2)}</div> : <div></div>}
      </div>
      <ul
        className="mb-8 shadow border  border-gray-700
   bg-primary-400"
      >
        {!!average ? (
          ratings.map((rating, index) => {
            return (
              <OtherRatingsGuest
                emojisArray={emojisArray}
                emojis={emojis.filter(
                  (emoji) => emoji.ratingId === rating.ratingId
                )}
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
          <li className="w-full p-5 flex justify-center items-center">
            İlk oyu siz verin!
          </li>
        )}
      </ul>
    </div>
  );
}

export default async function Others({ pb, isAdmin, emojis, currentUser }) {
  const response = await getOtherRatings(pb);

  const ratings = response?.ratings || null;
  const average = response?.average || null;

  const emojisArray = ["❤", "😂", "😔", "😡", "🤗"];

  const adminEmojis = ["♿", "👨‍🦽"];

  if (isAdmin) {
    adminEmojis.forEach((emoji) => {
      emojisArray.push(emoji);
    });
  }

  return (
    <div className="flex flex-col px-2 pt-12 lg:pt-0 lg:px-48  ">
      <div className="flex justify-between mb-1 font-heading">
        <div>Yorumlar</div>
        {!!average ? <div>Ortalama: {average.toFixed(2)}</div> : <div></div>}
      </div>
      <ul
        className="mb-8 shadow border  border-gray-700
       bg-primary-400"
      >
        {!!average ? (
          ratings.map((rating, index) => {
            return (
              <OtherRatings
                adminEmojis={adminEmojis}
                emojisArray={emojisArray}
                currentUser={currentUser}
                gif={rating?.gif || ""}
                emojis={emojis.filter(
                  (emoji) => emoji.ratingId === rating.ratingId
                )}
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
          <li className="w-full p-5 flex justify-center items-center">
            İlk oyu siz verin!
          </li>
        )}
      </ul>
    </div>
  );
}

{
  /* <div className="text-gray-500 pb-1 lg:pb-0 flex justify-between items-center">
<div>Diğer Oylamalar</div>
{!!average ? (
  <div>
    Ortalama: <span className="text-white">{average.toFixed(2)}/5</span>
  </div>
) : (
  <div></div>
)}
</div> */
}
