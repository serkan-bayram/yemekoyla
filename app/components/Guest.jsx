import { headers } from "next/headers";
import { Icon } from "./Input/Icon";

export default async function Guest() {
  const headersList = headers();

  const isGuest = headersList.get("is-guest");

  return isGuest ? (
    <div
      className="fixed z-50 flex gap-2  right-4 bottom-4
   bg-primary-400 p-3 border border-primary-200 rounded-md max-w-[40ch] 
   text-sm font-body"
    >
      <Icon name="fa-solid fa-circle-exclamation" />
      <span>
        Misafir olarak giriş yaptınız, daha iyi bir deneyim için lütfen
        kaydolun.
      </span>
    </div>
  ) : (
    <div></div>
  );
}
