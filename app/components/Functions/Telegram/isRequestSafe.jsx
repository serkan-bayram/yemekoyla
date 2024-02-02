export const isRequestSafe = (request) => {
  if (!request.hasOwnProperty("token")) return false;

  if (request.token !== process.env.TELEGRAM_TOKEN) return false;

  return true;
};
