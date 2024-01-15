import { authAsAdmin } from "./authAsAdmin";

// This returns menu info (the menu that is publishing on the website right now)
export const getMenu = async () => {
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
};
