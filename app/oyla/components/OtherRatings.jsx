import SmallStars from "./SmallStars";

export default function OtherRatings({ username, comment, index, rating }) {
  return (
    <li>
      <div
        className={`${
          index % 2 == 0 ? "bg-secondary" : "bg-primary"
        } flex justify-between items-center text-white h-auto  p-2`}
      >
        <div>
          <div>
            {username} {comment && ":"}{" "}
          </div>
          <p className="pr-3 break-all">{comment}</p>
        </div>
        <SmallStars index={index} rating={rating} />
      </div>
    </li>
  );
}
