import { authAsAdmin } from "./authAsAdmin";

export const revalidate = 0;

// This returns menu info (the menu that is publishing on the website right now)
export async function getMenu() {
  try {
    const pb = await authAsAdmin();

    const record = await pb
      .collection("menus")
      .getFirstListItem(null, { sort: "-created" });

    return record;
  } catch (error) {
    console.log("Error on getMenu: ", error);
    return null;
  }
}
