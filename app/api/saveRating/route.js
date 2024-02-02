import pb from "../../components/Functions/authAsAdmin";
import { updateRating } from "../../components/Functions/Telegram/updateRating";
import { findUserByTelegramId } from "../../components/Functions/Telegram/findUserByTelegramId";
import { createRating } from "../../components/Functions/Telegram/createRating";
import { isRequestSafe } from "../../components/Functions/Telegram/isRequestSafe";
import { deleteRating } from "../../components/Functions/Telegram/deleteRating";

// Finished Tasks
// A poll will be shared when the day of menu is shared
// if user is binded it's telegram account it can vote on that poll
// votes on poll will save to db
// user can revoke it's vote

// TODO
// binding telegram acc with yemekoyla
// how would updating your rating on the website affect telegram?
// should create explaining telegram page
// and should add explaining messages to bot

export async function POST(request) {
  const response = JSON.parse(await request.json());

  if (!isRequestSafe(response)) Response.json({ isSuccess: false });

  try {
    const user = await findUserByTelegramId(response.votedBy);
    if (user === null) return Response.json({ isSuccess: false });

    const userId = user.id;

    // Get the correct menu according to the voted poll
    const menu = await pb
      .collection("menus")
      .getFirstListItem(`pollId="${response.pollId}"`);

    // user is removed its vote
    if (!response.isVoted) {
      const deleted = await deleteRating(menu, userId);
      if (deleted) return Response.json({ isSuccess: true });
    }

    const data = {
      rating: response.votedOption,
      menu: menu.id,
      user: userId,
    };

    const updated = await updateRating(data, menu, userId);
    if (updated) return Response.json({ isSuccess: true });

    const created = await createRating(data);
    if (created) return Response.json({ isSuccess: true });
  } catch (error) {
    console.log("Error: ", error);
  }

  return Response.json({ isSuccess: false });
}
