import pb from "../authAsAdmin";

export const createRating = async (data) => {
  try {
    const record = await pb.collection("ratings").create(data);
    return true;
  } catch (error) {
    return null;
  }
};
