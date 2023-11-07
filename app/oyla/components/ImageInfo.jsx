import { v4 as uuidv4 } from "uuid";
import { getFoodList } from "../../components/Functions/getFoodList";
import { getMenuDate } from "../../components/Functions/getMenuDate";

export default async function ImageInfo() {
  const menu = await getFoodList();
  const menuDate = await getMenuDate();

  return (
    <div>
      <ul className="max-w-[30ch] md:max-w-[50ch]">
        <li className="font-body font-bold text-white my-2 mb-4 text-center">
          {menuDate}
        </li>
        {!!menu ? (
          menu.map((food) => {
            return (
              <li
                key={uuidv4()}
                className="font-body text-white my-2 text-center"
              >
                {food}
              </li>
            );
          })
        ) : (
          <div>Menü Bulunamadı</div>
        )}
      </ul>
    </div>
  );
}
