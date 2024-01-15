import { authAsAdmin } from "./authAsAdmin";
import { getMenu } from "./getMenu";
import { getUsername } from "./getUsername";

// Returns user's the rating info about the current menu
export async function getRatings() {
  try {
    const username = await getUsername();

    const menu = await getMenu();
    const menuId = menu.id;

    const pb = await authAsAdmin();
    // If this throws an error, that means user is not rated the menu yet.
    const record = await pb
      .collection("ratings")
      .getFirstListItem(`menu = "${menuId}"`, {
        filter: `menu = "${menuId}" && user.username = "${username}"`,
      });

    return record;
  } catch (error) {
    console.log("User has not rated yet: ", error);
    return null;
  }
}
