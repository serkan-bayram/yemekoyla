import SmallStars from "./SmallStars";
import Emojis from "./Emojis/Emojis";
import Image from "next/image";

export default function OtherRatings({
  username,
  comment,
  rating,
  ratingId,
  gif,
  avatar,
}) {
  return (
    <li
      className="border-l-0 border-r-0 border border-primary-100
     first:border-t-0 last:border-b-0 p-1"
    >
      <div className={`text-white h-auto flex gap-3  p-2`}>
        {!!avatar && (
          <div
            className="lg:w-16 lg:h-16 w-12 h-12 relative 
            
            "
          >
            <Image
              className="rounded-full "
              src={avatar}
              fill
              alt="Kullanıcı Avatarı"
            />
          </div>
        )}
        <div className="h-auto w-full">
          <div className="h-auto ">
            <div className="flex justify-between items-center">
              <div className="font-heading font-bold ">{username}</div>
              <SmallStars rating={rating} />
            </div>
            {comment && (
              <p className="break-words leading-6 max-w-prose">{comment}</p>
            )}
          </div>
          {gif.length > 0 && (
            <div className="mt-4">
              <img src={gif} width={200} height={200} />
            </div>
          )}
          <Emojis ratingId={ratingId} />
        </div>
      </div>
    </li>
  );
}
