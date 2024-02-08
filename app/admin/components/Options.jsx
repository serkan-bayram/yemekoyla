import CategoryButton from "./CategoryButton";
import { v4 as uuidv4 } from "uuid";

export default function Options({ setOption }) {
  const options = [
    { text: "Duyuru", name: "announcement" },
    { text: "Kullanıcılar", name: "users" },
    { text: "Değerlendirmeler", name: "ratings" },
  ];

  return (
    <ul className="flex justify-center mt-8 gap-3">
      {options.map((option) => (
        <li key={uuidv4()}>
          <CategoryButton
            text={option.text}
            name={option.name}
            setOption={setOption}
          />
        </li>
      ))}
    </ul>
  );
}
