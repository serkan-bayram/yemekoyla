import Navbar from "../../components/Navbar/Navbar";
import Food from "./Food";
import { NotificationsGuest } from "./Notifications";
import { OthersGuest } from "./Others";
import { RatingFormGuest } from "./RatingForm";
import SnowfallClient from "./SnowfallClient";

export default function GuestPage({ pb, menu, emojis }) {
  const notifications = [
    {
      title: (
        <div className="font-heading text-md">
          Misafir olarak giriş yaptınız.
        </div>
      ),
      content: (
        <p className="font-body mt-1 text-sm">
          En iyi deneyimi yaşamak için giriş yapın veya kaydolun.
        </p>
      ),
    },
  ];

  return (
    <div className="pt-12">
      <NotificationsGuest notifications={notifications} />
      <SnowfallClient />
      <Navbar isGuest={true} />
      <div
        className="mb-12 mt-6 w-fit mx-auto p-8 rounded-sm
        border bg-primary-400 h-fit 
        border-gray-700 lg:shadow-xl"
      >
        <Food menu={menu} />
        <RatingFormGuest />
      </div>
      <OthersGuest pb={pb} emojis={emojis} />
    </div>
  );
}
