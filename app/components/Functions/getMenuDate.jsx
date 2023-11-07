import { authAsAdmin } from "./authAsAdmin";

export async function getMenuDate() {
  try {
    const pb = await authAsAdmin();

    const record = await pb
      .collection("menus")
      .getFirstListItem(null, { sort: "-created" });

    const menuDate = record.date;

    return menuDate;
  } catch (error) {
    console.log("Can't get menu date.");
    return null;
  }
}
