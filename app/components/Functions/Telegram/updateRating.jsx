import pb from "../authAsAdmin";

export const updateRating = async (data, menu, userId) => {
  try {
    // CHANGE USER ID
    const isRated = await pb
      .collection("ratings")
      .getFirstListItem(`menu = "${menu.id}"`, {
        filter: `menu = "${menu.id}" && user.id = "${userId}"`,
      });

    const record = await pb.collection("ratings").update(isRated.id, data);
    return true;
  } catch (error) {
    return null;
  }
};
