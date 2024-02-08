import pb from "./authAsAdmin";

export async function getAllMenus() {
  try {
    const record = await pb
      .collection("menus")
      .getFullList({ sort: "-created" });

    return record;
  } catch (error) {
    console.log("Error on getAllMenus: ", error);
    return null;
  }
}
