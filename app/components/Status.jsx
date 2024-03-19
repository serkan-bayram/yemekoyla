import { getOtherRatings } from "../oyla/components/getOtherRatings";
import StatusClient from "./StatusClient";
import { unstable_noStore } from "next/cache";

export default async function Status() {
  unstable_noStore();

  const response = await getOtherRatings();

  const average = response?.average || null;

  let emoji, text;

  if (average === null) {
    emoji = "🤔";
    text = "Hesaplanıyor";
  } else if (average < 2) {
    emoji = "😭";
    text = "Çok Kötü";
  } else if (average >= 2 && average < 3) {
    emoji = "😔";
    text = "Kötü";
  } else if (average >= 3 && average < 4) {
    emoji = "🙂";
    text = "İyi";
  } else if (average >= 4) {
    emoji = "😄";
    text = "Çok İyi";
  }

  return <StatusClient emoji={emoji} text={text} />;
}
