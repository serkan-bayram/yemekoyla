import DatePicker from "./components/DataPicker";
import Others from "./components/Others";
import Food from "./components/Food";
import RatingForm from "./components/RatingForm";

export default async function Page() {
  return (
    <div>
      <DatePicker />
      <Food />
      <RatingForm />
      <Others />
    </div>
  );
}
