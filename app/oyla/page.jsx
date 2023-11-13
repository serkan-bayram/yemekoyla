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
      <div className="lg:flex  lg:mx-32 lg:gap-8 lg:mt-8 lg:mb-12">
        <div
          className="lg:sticky lg:top-16 lg:px-12 lg:p-4 rounded-sm
        mx-8 my-4 lg:my-0 lg:py-8 pb-8 border bg-secondary h-fit 
         border-gray-700 lg:shadow-xl"
        >
          {/* <UserInfo username={username} /> */}

          <Food menu={menu} />
          <RatingForm rating={clientSafeRatingInfo} />
        </div>
        <Others pb={pb} />
      </div>
    </div>
  );
}
