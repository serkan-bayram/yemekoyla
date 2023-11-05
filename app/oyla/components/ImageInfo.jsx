import { v4 as uuidv4 } from "uuid";
import { getFoodList } from "../../components/Functions/getFoodList";

export default async function ImageInfo() {
  const menu = await getFoodList();

  return (
    <div>
      <ul>
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
          <div>Menü bulunamadı.</div>
        )}
      </ul>
    </div>
  );
}
