import { v4 as uuidv4 } from "uuid";
import { RatingRow } from "./RatingRow";

export function Ratings({ ratings }) {
  return (
    <div className="mt-8 lg:w-full lg:flex justify-center px-4 mb-4">
      <table className="border border-primary-100">
        <thead>
          <tr>
            <th>Değerlendirme ID</th>
            <th>Kullanıcı Adı</th>
            <th>Menu ID</th>
            <th>Kullanıcı Değerlendirmesi</th>
            <th>Kullanıcı Yorumu</th>
            <th>Kullanıcı Gif</th>
          </tr>
        </thead>
        <tbody>
          {ratings.map((rating) => (
            <RatingRow key={uuidv4()} rating={rating} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
