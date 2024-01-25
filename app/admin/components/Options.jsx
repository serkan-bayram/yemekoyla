import CategoryButton from "./CategoryButton";

export default function Options({ setOption }) {
  return (
    <ul className="flex justify-center mt-8 gap-3">
      <li>
        <CategoryButton
          text="Duyuru"
          name="announcement"
          setOption={setOption}
        />
      </li>
      <li>
        <CategoryButton
          text="Kullanıcılar"
          name="users"
          setOption={setOption}
        />
      </li>
    </ul>
  );
}
