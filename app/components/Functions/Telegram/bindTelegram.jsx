import pb from "../authAsAdmin";
import randomize from "randomatic";

export const bindTelegram = async (response) => {
  let user;

  // is user exists
  try {
    user = await pb
      .collection("users")
      .getFirstListItem(`username="${response.username}"`);
  } catch (error) {
    return { error: "userHasNotFound" };
  }

  const sixDigitCode = randomize("0", 6);

  const data = {
    telegramId: response.telegramId,
    telegramBindingCode: sixDigitCode,
  };

  await pb.collection("users").update(user.id, data);

  return { code: sixDigitCode };
};
