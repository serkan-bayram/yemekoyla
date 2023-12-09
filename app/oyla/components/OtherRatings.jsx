import SmallStars from "./SmallStars";
import Emojis from "./Emojis";

export default function OtherRatings({
  username,
  comment,
  rating,
  ratingId,
  emojis,
  currentUser,
}) {
  return (
    <li
      className="border-l-0 border-r-0 border border-primary
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
        <Emojis
          votedEmojis={emojis}
          ratingId={ratingId}
          currentUser={currentUser}
        />
      </div>
    </li>
  );
}
