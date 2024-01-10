import Others from "./components/Others";
import Food from "./components/Food";
import Navbar from "../components/Navbar/Navbar";
import { getSession } from "../components/Functions/getSession";
import { getRatings } from "../components/Functions/getRatings";
import { getMenu } from "../components/Functions/getMenu";
import { authAsAdmin } from "../components/Functions/authAsAdmin";

import { getEmojis } from "./components/getEmojis";
import Notifications from "./components/Notifications";
import SnowfallClient from "./components/SnowfallClient";
import { headers } from "next/headers";

export default async function Page() {
  const pb = await authAsAdmin();

  const headersList = headers();
  const isGuest = headersList.get("is-guest");

  const menu = await getMenu(pb);
  const emojis = await getEmojis(pb, isGuest);

  // if (isGuest === "1") {
  //   return <GuestPage pb={pb} menu={menu} emojis={emojis} />;
  // }

  const { session } = await getSession();
  const username = session.user.record.username;
  const userId = session.user.record.id;

  const rating = await getRatings(pb, username, menu);

  const isAdmin = session.user.record.permission === "admin";

  const clientSafeRatingInfo = {
    comment: rating?.comment || "",
    rating: rating?.rating || null,
    gif: rating?.gif || "",
    ratingId: rating?.id || null,
    menuId: menu?.id || null,
  };

  return (
    <>
      <Navbar />
      <div className="pt-16">
        <Notifications pb={pb} />
        <SnowfallClient />
        <div className="flex  flex-col lg:flex-row justify-center  gap-12 mb-8 my-12 lg:mt-0 px-3 lg:px-0 ">
          <div
            className="p-5 py-8 pb-6 lg:sticky top-4 rounded-md 
        border bg-primary-400  h-fit
        border-gray-700 lg:shadow-xl"
          >
            <Food menu={menu} />
          </div>
          <Others
            rating={clientSafeRatingInfo}
            isAdmin={isAdmin}
            pb={pb}
            emojis={emojis}
            currentUser={username}
          />
        </div>
      </div>
    </>
  );
}
