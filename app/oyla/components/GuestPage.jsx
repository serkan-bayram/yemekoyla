import Navbar from "../../components/Navbar/Navbar";
import Food from "./Food";
import Notifications from "./Notifications";
import SnowfallClient from "./SnowfallClient";

export default function GuestPage({ pb, menu, emojis }) {
  return (
    <div className="pt-12">
      <Notifications pb={pb} />
      <SnowfallClient />
      {/* <Navbar /> */}
      <div
        className="mb-12 mt-6 w-fit mx-auto p-8 rounded-sm
        border bg-secondary h-fit 
        border-gray-700 lg:shadow-xl"
      >
        <Food menu={menu} />
        {/* <RatingForm rating={clientSafeRatingInfo} /> */}
      </div>
      {/* <Others
        isAdmin={isAdmin}
        pb={pb}
        emojis={emojis}
        currentUser={username}
      /> */}
    </div>
  );
}
