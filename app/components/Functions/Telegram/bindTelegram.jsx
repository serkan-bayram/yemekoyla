import pb from "../authAsAdmin";
import randomize from "randomatic";

// BE CAREFUL
// We save telegramId of messager even if it does not enter the authenticate code
// So if you want to know if someone's telegramId is really right, check isTelegramVerified
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

  if (user.isTelegramVerified) return { error: "alreadyVerified" };

  const sixDigitCode = randomize("0", 6);

  const data = {
    telegramId: response.telegramId,
    telegramBindingCode: sixDigitCode,
  };

  await pb.collection("users").update(user.id, data);

  return { code: sixDigitCode };
};
