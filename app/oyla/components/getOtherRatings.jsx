import PocketBase from "pocketbase";

export const getOtherRatings = async () => {
  const pb = new PocketBase("http://127.0.0.1:8090");

  // Auth as admin to create user
  await pb.admins.authWithPassword(
    process.env.dbUsername,
    process.env.dbPassword
  );

  const records = await pb.collection("ratings").getFullList({
    sort: "-updated",
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

  // Wait for all promises to resolve
  await Promise.all(promises);

  average = average / ratings.length;

  return { ratings, average };
};
