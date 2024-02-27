import { isRequestSafe } from "../../components/Functions/Telegram/isRequestSafe";
import pb from "../../components/Functions/authAsAdmin";

export async function POST(request) {
  const response = JSON.parse(await request.json());

  if (!isRequestSafe(response)) Response.json({ isSuccess: false });

  const records = await pb.collection("balance").getFullList({
    sort: "-created",
  });

  return Response.json({ users: records });
}
