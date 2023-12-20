import CategoryButton from "./CategoryButton";

export default function Options({ setOption }) {
  return (
    <ul className="flex justify-center mt-8">
      <li>
        <CategoryButton
          text="Duyuru"
          name="announcement"
          setOption={setOption}
        />
      </li>
    </ul>
  );
}
