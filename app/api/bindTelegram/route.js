import { isRequestSafe } from "../../components/Functions/Telegram/isRequestSafe";
import { bindTelegram } from "../../components/Functions/Telegram/bindTelegram";

export async function POST(request) {
  const response = JSON.parse(await request.json());

  if (!isRequestSafe(response)) Response.json({ isSuccess: false });

  const bindingResponse = await bindTelegram(response);

  if (bindingResponse?.error === "userHasNotFound") {
    return Response.json({ error: "userHasNotFound" });
  }

  if (bindingResponse?.error === "alreadyVerified") {
    return Response.json({ error: "alreadyVerified" });
  }

  return Response.json({ code: bindingResponse.code });
}
