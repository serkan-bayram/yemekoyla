import Send from "./components/Button";
import DatePicker from "./components/DataPicker";
import Others from "./components/Others";
import RatingContainer from "./components/RatingContainer";
import Food from "./components/Food";

export default async function Page() {
  return (
    <div>
      <DatePicker />
      <Food />
      <RatingContainer />
      <Send />
      <Others />
    </div>
  );
}
