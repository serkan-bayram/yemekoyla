import Others from "./components/Others";
import Food from "./components/Food";
import RatingForm from "./components/RatingForm";
import Navbar from "../components/Navbar/Navbar";
import UserInfo from "./components/UserInfo";
import { getSession } from "../components/Functions/getSession";

export default async function Page() {
  const { session } = await getSession();

  const username = session.user.record.username;

  console.log(username);

  return (
    <div className="pt-12">
      <Navbar />
      <UserInfo username={username} />
      <Food />
      <RatingForm />
      <Others />
    </div>
  );
}
