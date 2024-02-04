import pb from "../../components/Functions/authAsAdmin";
import { updateRating } from "../../components/Functions/Telegram/updateRating";
import { findUserByTelegramId } from "../../components/Functions/Telegram/findUserByTelegramId";
import { createRating } from "../../components/Functions/Telegram/createRating";
import { isRequestSafe } from "../../components/Functions/Telegram/isRequestSafe";
import { deleteRating } from "../../components/Functions/Telegram/deleteRating";

export async function POST(request) {
  const response = JSON.parse(await request.json());

  if (!isRequestSafe(response)) Response.json({ isSuccess: false });

  try {
    const user = await findUserByTelegramId(response.votedBy);
    if (user === null) return Response.json({ error: "userHasNotFound" });

    const userId = user.id;

    // Get the correct menu according to the voted poll
    const menu = await pb
      .collection("menus")
      .getFirstListItem(`pollId="${response.pollId}"`);

    // user is removed its vote
    if (!response.isVoted) {
      const deleted = await deleteRating(menu, userId);
      if (deleted) return Response.json({ success: "deleted" });
    }

    const data = {
      rating: response.votedOption,
      menu: menu.id,
      user: userId,
    };

    const updated = await updateRating(data, menu, userId);
    if (updated) return Response.json({ success: "updated" });

    const created = await createRating(data);
    if (created) return Response.json({ success: "created" });
  } catch (error) {
    console.log("Error: ", error);
  }

  return Response.json({ error: "somethingWentWrong" });
}
