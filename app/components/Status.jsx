import { getOtherRatings } from "../oyla/components/getOtherRatings";
import { authAsAdmin } from "./Functions/authAsAdmin";
import StatusClient from "./StatusClient";

export default async function Status() {
  const pb = await authAsAdmin();
  const response = await getOtherRatings(pb);

  const average = response?.average || null;

  console.log(average);

  let emoji, text;

  if (average === null) {
    emoji = "🤔";
    text = "Hesaplanıyor";
  } else if (average < 2) {
    emoji = "😭";
    text = "Çok Kötü";
  } else if (average >= 2 && average <= 4) {
    emoji = "🙂";
    text = "İyi";
  } else if (average > 4) {
    emoji = "😄";
    text = "Çok İyi";
  }

  return <StatusClient emoji={emoji} text={text} />;
}
