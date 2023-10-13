import { FaAngleDown } from "react-icons/fa6";
import Image from "next/image";
import BigStars from "../../components/BigStars";
import Send from "../../components/Send";
import { v4 as uuidv4 } from "uuid";
import Rating from "@mui/material/Rating";

function SmallStars({ id }) {
  return (
    <Rating
      value={2}
      precision={0.5}
      sx={{
        "& .MuiRating-iconEmpty": {
          color: id % 2 == 0 ? "#282932" : "#181A1E",
        },
      }}
      readOnly
    />
  );
}

function OtherRatings({ name, id }) {
  return (
    <li>
      <div
        className={`${
          id % 2 == 0 ? "bg-secondary" : "bg-primary"
        } flex justify-between items-center text-white rounded-sm p-2`}
      >
        {name}
        <SmallStars id={id} />
      </div>
    </li>
  );
}

function Others() {
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

function RatingContainer() {
  return (
    <div className="flex flex-col items-center bg-primary mx-20 rounded-sm shadow-md mt-4 p-6 border border-gray-700">
      <h1 className="text-white text-center font-bold">Genel Puan</h1>
      <BigStars />
    </div>
  );
}

function ImageInfo() {
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

function Food() {
  return (
    <div className="flex flex-col items-center pt-8 gap-6">
      <Image
        src="/food.jpeg"
        width={250}
        height={250}
        alt="Bugünün yemeği."
        priority={true}
      />
      <ImageInfo />
    </div>
  );
}

function DatePicker() {
  return (
    <div className="flex justify-center items-center gap-1 pt-8">
      <button className="flex gap-1 items-center py-2 px-5 text-xs rounded-full text-white  appearance-none focus:ring ring-primary">
        Bugün
        <FaAngleDown />
      </button>
    </div>
  );
}

export default function Page() {
  return (
    <div>
      <DatePicker />
      <Food />
      <RatingContainer />
      <Send />
      <Others />
    </div>
  );
}
