import { getMenu } from "../../components/Functions/getMenu";

// gets other users' ratings
export const getOtherRatings = async (pb) => {
  const { id: menuId } = await getMenu(pb);

  let records;
  try {
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
    ratings.push({
      rating: record.rating,
      comment: record?.comment || null,
      username: record.expand.user.username,
    });
    average += parseFloat(record.rating);
  });

  average = average / ratings.length;

  return { ratings, average };
};

// pb.autoCancellation(false);

// const ratings = [];
// const promises = [];

// let average = 0;

// records.forEach(async (record) => {
//   const promise = pb
//     .collection("users")
//     .getOne(record.user)
//     .then(async (result) => {
//       const { username } = result;
//       average += parseFloat(record.rating);
//       ratings.push({
//         username: username,
//         rating: record.rating,
//         comment: record?.comment || null,
//       });
//     });
//   promises.push(promise);
// });

// await Promise.all(promises);
// // Wait for all promises to resolve

// average = average / ratings.length;

// return { ratings, average };
