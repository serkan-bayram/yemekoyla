// This returns menu info (the menu that is publishing on the website right now)

export async function getMenu(pb) {
  try {
    const record = await pb
      .collection("menus")
      .getFirstListItem(null, { sort: "-created" });

    console.log("record from db:", record);

    return record;
  } catch (error) {
    console.log("Error on getMenu: ", error);
    return null;
  }
}
