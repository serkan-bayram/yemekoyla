import Others from "./components/Others";
import Food from "./components/Food";
import RatingForm from "./components/RatingForm";
import Navbar from "../components/Navbar/Navbar";
import UserInfo from "./components/UserInfo";
import { getSession } from "../components/Functions/getSession";
import { getRatings } from "../components/Functions/getRatings";
import { getMenu } from "../components/Functions/getMenu";
import { authAsAdmin } from "../components/Functions/authAsAdmin";

export default async function Page() {
  const { session } = await getSession();

  const username = session.user.record.username;

  const pb = await authAsAdmin();
  const menu = await getMenu(pb);
  const rating = await getRatings(pb, username, menu);

  const clientSafeRatingInfo = {
    comment: rating?.comment,
    rating: rating?.rating,
    ratingId: rating?.id,
    menuId: menu?.id,
  };

  return (
    <div className="pt-12">
      <Navbar />
      <UserInfo username={username} />
      <Food menu={menu} />
      <RatingForm rating={clientSafeRatingInfo} />
      <Others pb={pb} />
    </div>
  );
}
