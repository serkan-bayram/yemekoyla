import pb from "../authAsAdmin";

export const findUserByTelegramId = async (votedBy) => {
  try {
    const record = await pb
      .collection("users")
      .getFirstListItem(`telegramId="${votedBy}"`, {
        filter: `isTelegramVerified=true && telegramId="${votedBy}"`,
      });

    return record;
  } catch (error) {
    console.log("Error on findUserByTelegramId: ", error.response.message);
    return null;
  }
};
