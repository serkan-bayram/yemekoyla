import OtherRatings from "./OtherRatings";

export default function Others() {
  return (
    <div className="flex flex-col px-8 pt-12  ">
      <div className="text-gray-500 pb-1">Diğer Oylamalar</div>
      <ul className="mb-8 shadow border border-gray-700">
        <OtherRatings name={"Serkan"} id={1} />
        <OtherRatings name={"Tolga"} id={2} />
        <OtherRatings name={"Furkan"} id={3} />
        <OtherRatings name={"Aga"} id={4} />
      </ul>
    </div>
  );
}
