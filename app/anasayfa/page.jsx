import Send from "./components/Send";
import DatePicker from "./components/DataPicker";
import Others from "./components/Others";
import RatingContainer from "./components/RatingContainer";
import Food from "./components/Food";

export default function Page() {
  // const session = await getServerSession(options);

  // console.log(session);

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
