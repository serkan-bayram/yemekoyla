import { authAsAdmin } from "../Functions/authAsAdmin";

export async function getMenuURL() {
  try {
    const pb = await authAsAdmin();

    const record = await pb
      .collection("menus")
      .getFirstListItem(null, { sort: "-created", cache: "no-cache" });

    const url = record.url;

    return url;
  } catch (error) {
    console.log("Can't get menu url.");
    return null;
  }
}
