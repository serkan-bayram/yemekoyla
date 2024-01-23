import pb from "./authAsAdmin";

// This returns menu info (the menu that is publishing on the website right now)
export const getMenu = async () => {
  try {
    const record = await pb
      .collection("menus")
      .getFirstListItem(null, { sort: "-created" });

    return record;
  } catch (error) {
    console.log("Error on getMenu: ", error);
    return null;
  }
};
