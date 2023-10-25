import SmallStars from "./SmallStars";

export default function OtherRatings({ username, index, rating }) {
  return (
    <li>
      <div
        className={`${
          index % 2 == 0 ? "bg-secondary" : "bg-primary"
        } flex justify-between items-center text-white  p-2`}
      >
        {username}
        <SmallStars index={index} rating={rating} />
      </div>
    </li>
  );
}
