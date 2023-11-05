import { authAsAdmin } from "../Functions/authAsAdmin";

export async function getMenuId() {
  try {
    const pb = await authAsAdmin();

    const record = await pb
      .collection("menus")
      .getFirstListItem(null, { sort: "-created" });

    const id = record.id;

    return id;
  } catch (error) {
    console.log("Can't get menu id.");
    return null;
  }
}
