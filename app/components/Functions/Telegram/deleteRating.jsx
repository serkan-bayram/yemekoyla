import pb from "../authAsAdmin";

export const deleteRating = async (menu, userId) => {
  try {
    const rating = await pb
      .collection("ratings")
      .getFirstListItem(`menu = "${menu.id}"`, {
        filter: `menu = "${menu.id}" && user.id = "${userId}"`,
      });

    await pb.collection("ratings").delete(rating.id);

    return true;
  } catch (error) {
    return null;
  }
};
