import { authAsAdmin } from "../../components/Functions/authAsAdmin";
import { getMenuId } from "../../components/Functions/getMenuId";

export const getOtherRatings = async () => {
  const pb = await authAsAdmin();
  const menuId = await getMenuId();

  pb.autoCancellation(false);

  try {
    const records = await pb.collection("ratings").getFullList({
      sort: "-updated",
      filter: `menu="${menuId}"`,
    });

    const ratings = [];
    const promises = [];

    let average = 0;

    records.forEach(async (record) => {
      const promise = pb
        .collection("users")
        .getOne(record.user)
        .then(async (result) => {
          const { username } = result;
          average += parseFloat(record.rating);
          ratings.push({ username: username, rating: record.rating });
        });
      promises.push(promise);
    });

    await Promise.all(promises);
    // Wait for all promises to resolve

    average = average / ratings.length;

    return { ratings, average };
  } catch (error) {
    console.log(error);
    console.log("There is a problem about fetching ratings.");
  }
};
