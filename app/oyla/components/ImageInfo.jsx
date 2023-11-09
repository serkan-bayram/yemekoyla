import { v4 as uuidv4 } from "uuid";

export default async function ImageInfo({ menuDate, menu }) {
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
