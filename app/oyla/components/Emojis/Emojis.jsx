import EmojisClient from "./EmojisClient";
import { isAdmin } from "../../../components/Functions/isAdmin";
import { getUsername } from "../../../components/Functions/getUsername";
import { getEmojis } from "./getEmojis";

export default async function Emojis({ ratingId }) {
  const emojisArray = ["❤", "😂", "😔", "😡", "🤗"];

  const adminEmojis = ["♿", "👨‍🦽"];

  const emojis = await getEmojis();
  const currentUser = await getUsername();

  if (isAdmin()) {
    adminEmojis.forEach((emoji) => {
      emojisArray.push(emoji);
    });
  }

  return (
    <EmojisClient
      currentUser={currentUser}
      emojisArray={emojisArray}
      adminEmojis={adminEmojis}
      votedEmojis={emojis.filter((emoji) => emoji.ratingId === ratingId)}
      ratingId={ratingId}
    />
  );
}
