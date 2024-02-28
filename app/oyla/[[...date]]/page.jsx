import Others from "../components/Others";
import Food from "../components/Food";
import Navbar from "../../components/Navbar/Navbar";
import Notifications from "../components/Notifications";
import SnowfallClient from "../components/SnowfallClient";
import Guest from "../../components/Guest";
import { getMenu } from "../../components/Functions/getMenu";
import { redirect } from "next/navigation";

export default async function Page({ params }) {
  let date;

  if (!!params.date && params.date.length > 0) {
    date = params.date[0];
  } else {
    date = null;
  }

  // simple way to check is there a menu with current date
  // but I'm not going to pass this menu to down components because
  // it might be cached
  const menu = await getMenu(date);

  if (menu === null) {
    redirect("/oyla");
  }

  return (
    <>
      <Navbar />
      <div className="pt-16">
        <Notifications />
        {/* <SnowfallClient /> */}
        <div className="flex  flex-col lg:flex-row justify-center  gap-12 mb-8 my-12 lg:mt-0 px-3 lg:px-24 ">
          <div
            className="p-5 py-8 pb-6 lg:sticky top-4 rounded-md 
        border bg-primary-400  h-fit
        border-gray-700 lg:shadow-xl"
          >
            <Food date={date} />
          </div>
          <Others date={date} />
        </div>
      </div>
      <Guest />
    </>
  );
}
