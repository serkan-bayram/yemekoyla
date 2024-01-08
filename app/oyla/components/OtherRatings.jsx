import SmallStars from "./SmallStars";
import Emojis, { EmojisGuest } from "./Emojis";

export function OtherRatingsGuest({
  username,
  comment,
  rating,
  ratingId,
  emojis,
  emojisArray,
}) {
  return (
    <li
      className="border-l-0 border-r-0 border border-primary-100
     first:border-t-0 last:border-b-0 p-1"
    >
      <div className={`text-white h-auto  p-2`}>
        <div>
          <div className="flex justify-between items-center">
            <div className="font-heading font-bold ">{username}</div>
            <SmallStars rating={rating} />
          </div>
          {comment && <p className="mt-3 leading-6 max-w-prose">{comment}</p>}
        </div>
        <EmojisGuest votedEmojis={emojis} ratingId={ratingId} />
      </div>
    </li>
  );
}

export default function OtherRatings({
  username,
  comment,
  rating,
  ratingId,
  emojis,
  currentUser,
  emojisArray,
  adminEmojis,
  gif,
}) {
  return (
    <li
      className="border-l-0 border-r-0 border border-primary-100
     first:border-t-0 last:border-b-0 p-1"
    >
      <div className={`text-white h-auto  p-2`}>
        <div>
          <div className="flex justify-between items-center">
            <div className="font-heading font-bold ">{username}</div>
            <SmallStars rating={rating} />
          </div>
          {comment && <p className="mt-3 leading-6 max-w-prose">{comment}</p>}
        </div>
        {gif.length > 0 && (
          <div className="mt-4">
            <img src={gif} width={200} height={200} />
          </div>
        )}
        <Emojis
          adminEmojis={adminEmojis}
          emojisArray={emojisArray}
          votedEmojis={emojis}
          ratingId={ratingId}
          currentUser={currentUser}
        />
      </div>
    </li>
  );
}
