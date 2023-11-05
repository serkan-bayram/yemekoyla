import { authAsAdmin } from "../Functions/authAsAdmin";

export async function getFoodList() {
  try {
    const pb = await authAsAdmin();

    const record = await pb
      .collection("menus")
      .getFirstListItem(null, { sort: "-created" });

    const menu = JSON.parse(record.menu);

    return menu;
  } catch (error) {
    console.log("Can't get food list.");
    return null;
  }
}
