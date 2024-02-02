import pb from "../authAsAdmin";

export const findUserByTelegramId = async (votedBy) => {
  try {
    const record = await pb
      .collection("users")
      .getFirstListItem(`telegramId="${votedBy}"`);

    return record;
  } catch (error) {
    return null;
  }
};
