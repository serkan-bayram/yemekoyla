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
    comment: rating?.comment || "",
    rating: rating?.rating || null,
    ratingId: rating?.id || null,
    menuId: menu?.id || null,
  };

  console.log("rating info: ", clientSafeRatingInfo);

  return (
    <div className="pt-12">
      <Navbar />
      {/* <UserInfo username={username} /> */}
      <div
        className="mb-12 mt-6 w-fit mx-auto p-8 rounded-sm
        border bg-secondary h-fit 
        border-gray-700 lg:shadow-xl"
      >
        <Food menu={menu} />
        <RatingForm rating={clientSafeRatingInfo} />
      </div>
      <Others pb={pb} />
    </div>
  );
}
