import SmallStars from "./SmallStars";
import Emojis from "./Emojis/Emojis";

export default function OtherRatings({
  username,
  comment,
  rating,
  ratingId,
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
        <Emojis ratingId={ratingId} />
      </div>
    </li>
  );
}
