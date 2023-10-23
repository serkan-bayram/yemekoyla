import { v4 as uuidv4 } from "uuid";

export default function ImageInfo() {
  const info = [
    "Tavuk Suyu Çorba",
    "Nohut",
    "Şehriyeli Pirinç Pilavı",
    "Puding",
  ];

  return (
    <div>
      <ul>
        {info.map((food) => {
          return (
            <li key={uuidv4()} className="text-white my-2 text-center">
              {food}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
