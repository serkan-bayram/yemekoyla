import { bindMenuWithPoll } from "../../components/Functions/Telegram/bindMenuWithPoll";
import { isRequestSafe } from "../../components/Functions/Telegram/isRequestSafe";

export async function POST(request) {
  const response = JSON.parse(await request.json());

  if (!isRequestSafe(response)) Response.json({ isSuccess: false });

  await bindMenuWithPoll();

  return Response.json({ isSuccess: true });
}
