import Others from "./components/Others";
import Food from "./components/Food";
import Navbar from "../components/Navbar/Navbar";
import Notifications from "./components/Notifications";
import SnowfallClient from "./components/SnowfallClient";

export default async function Page() {
  return (
    <>
      <Navbar />
      <div className="pt-16">
        <Notifications />
        <SnowfallClient />
        <div className="flex  flex-col lg:flex-row justify-center  gap-12 mb-8 my-12 lg:mt-0 px-3 lg:px-24 ">
          <div
            className="p-5 py-8 pb-6 lg:sticky top-4 rounded-md 
        border bg-primary-400  h-fit
        border-gray-700 lg:shadow-xl"
          >
            <Food />
          </div>
          <Others />
        </div>
      </div>
    </>
  );
}
