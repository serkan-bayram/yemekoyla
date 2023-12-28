import Others from "./components/Others";
import Food from "./components/Food";
import RatingForm from "./components/RatingForm";
import Navbar from "../components/Navbar/Navbar";
import { getSession } from "../components/Functions/getSession";
import { getRatings } from "../components/Functions/getRatings";
import { getMenu } from "../components/Functions/getMenu";
import { authAsAdmin } from "../components/Functions/authAsAdmin";
import { getEmojis } from "./components/getEmojis";
import Notifications from "./components/Notifications";
import SnowfallClient from "./components/SnowfallClient";
import { cookies, headers } from "next/headers";
import GuestPage from "./components/GuestPage";

export default async function Page() {
  const pb = await authAsAdmin();
  const menu = await getMenu(pb);

  const headersList = headers();
  const isGuest = headersList.get("is-guest");

  const emojis = await getEmojis(pb, isGuest);

  if (isGuest === "1") {
    return <GuestPage pb={pb} menu={menu} emojis={emojis} />;
  }

  const { session } = await getSession();
  const username = session.user.record.username;
  const userId = session.user.record.id;

  const rating = await getRatings(pb, username, menu);
  const isAdmin = session.user.record.permission === "admin";

  const clientSafeRatingInfo = {
    comment: rating?.comment || "",
    rating: rating?.rating || null,
    ratingId: rating?.id || null,
    menuId: menu?.id || null,
  };

  return (
    <div className="pt-12">
      <Notifications pb={pb} />
      <SnowfallClient />
      <Navbar />
      <div
        className="mb-12 mt-6 w-fit mx-auto p-8 rounded-sm
        border bg-secondary h-fit 
        border-gray-700 lg:shadow-xl"
      >
        <Food menu={menu} />
        <RatingForm rating={clientSafeRatingInfo} />
      </div>
      <Others
        isAdmin={isAdmin}
        pb={pb}
        emojis={emojis}
        currentUser={username}
      />
    </div>
  );
}
