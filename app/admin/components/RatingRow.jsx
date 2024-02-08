import Image from "next/image";
import Link from "next/link";
import { deleteRating } from "../../components/Functions/actions";
import { error, success } from "../../components/Functions/notify";

export function RatingRow({ rating }) {
  const { id, user, menu, rating: userRating, comment, gif } = rating;

  const username = rating.expand?.user?.username || "null";
  const menuDate = rating.expand?.menu?.date;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await deleteRating(rating);

    if (response?.success) {
      success("Değerlendirme silindi.");
      return;
    }

    error("Değerlendirme silinemedi.");
  };

  return (
    <tr className="border h-12 border-primary-100">
      <td className="p-8">{id}</td>
      <td className="max-w-[16ch] p-8 overflow-hidden">{username}</td>
      <td className="p-8">
        <Link target="_blank" href={`/oyla/${menuDate}`}>
          {menu}
        </Link>
      </td>
      <td className="p-8">{userRating}</td>
      <td className="p-8">
        {!!comment ? (
          comment
        ) : (
          <span className="text-error">Yorum paylaşılmamış.</span>
        )}
      </td>
      <td className="p-8">
        {!!gif ? (
          <Image alt="gif" src={gif} width={150} height={150} />
        ) : (
          <span className="text-error">Gif paylaşılmamış.</span>
        )}
      </td>
      <td className="p-8">
        <form onSubmit={handleSubmit}>
          <button
            type="submit"
            className="bg-error p-2 rounded-md 
font-body font-bold hover:opacity-50 transition-all"
          >
            Sil
          </button>
        </form>
      </td>
    </tr>
  );
}
