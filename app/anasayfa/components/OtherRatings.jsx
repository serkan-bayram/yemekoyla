import { SmallStars } from "./Stars";

export default function OtherRatings({ name, id }) {
  return (
    <li>
      <div
        className={`${
          id % 2 == 0 ? "bg-secondary" : "bg-primary"
        } flex justify-between items-center text-white rounded-sm p-2`}
      >
        {name}
        <SmallStars id={id} />
      </div>
    </li>
  );
}
