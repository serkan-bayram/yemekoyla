import Navbar from "../components/Navbar/Navbar";
import { getAllMenus } from "../components/Functions/getAllMenus";
import { Day } from "./components/Day";
import { v4 as uuidv4 } from "uuid";

export default async function Page() {
  const menus = await getAllMenus();

  return (
    <>
      <Navbar />
      <div className="font-heading text-5xl text-center font-bold lg:p-16 pt-24 pb-12">
        Tarihçe
      </div>
      <div className=" pb-6 flex flex-wrap justify-center lg:grid lg:grid-cols-7  gap-4 lg:px-24 place-items-center">
        {menus.map((menu) => (
          <Day key={uuidv4()} menu={menu} />
        ))}
      </div>
    </>
  );
}
