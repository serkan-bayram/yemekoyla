import RatingContainer from "./RatingContainer";
import Send from "./Button";
import { saveRating } from "./saveRating";

export default function RatingForm() {
  return (
    <form action={saveRating}>
      <RatingContainer />
      <Send />
    </form>
  );
}
