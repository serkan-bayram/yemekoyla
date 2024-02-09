import pb from "../../components/Functions/authAsAdmin";
import { getMenu } from "../../components/Functions/getMenu";

// gets other users' ratings
export const getOtherRatings = async (date) => {
  let records;
  try {
    const { id: menuId } = await getMenu(date);

    records = await pb.collection("ratings").getFullList({
      sort: "-updated",
      filter: `menu="${menuId}"`,
      expand: "user",
    });
  } catch (error) {
    console.log("Error on getOtherRatings: ", error);
  }

  const ratings = [];
  let average = 0;

  records.forEach((record) => {
    const url = pb.files.getUrl(record.expand.user, record.expand.user.avatar);

    ratings.push({
      ratingId: record.id,
      rating: record.rating,
      comment: record?.comment || null,
      username: record.isAnonim ? "Anonim" : record.expand.user.username,
      avatar: record.isAnonim ? null : url || null,
      gif: record?.gif || null,
    });
    average += parseFloat(record.rating);
  });

  average = average / ratings.length;

  return { ratings, average };
};
