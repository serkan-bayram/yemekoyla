import DatePicker from "./components/DataPicker";
import Others from "./components/Others";
import Food from "./components/Food";
import RatingForm from "./components/RatingForm";
import Navbar from "../components/LandingPage/Navbar";

export default async function Page() {
  return (
    <div className="pt-12">
      <Navbar />
      <DatePicker />
      <Food />
      <RatingForm />
      <Others />
    </div>
  );
}
