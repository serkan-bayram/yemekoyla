import pb from "./authAsAdmin";

// This returns menu info (the menu that is publishing on the website right now)
export const getMenu = async (date) => {
  try {
    if (!!date) {
      const record = await pb
        .collection("menus")
        .getFirstListItem(`date="${date}"`);

      record.url = `${process.env.serverIP}:8090/data/${date}/${date}.jpeg`;

      return record;
    }

    const record = await pb
      .collection("menus")
      .getFirstListItem(null, { sort: "-created" });

    return record;
  } catch (error) {
    console.log("Error on getMenu: ", error);
    return null;
  }
};
