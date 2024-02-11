import { isRequestSafe } from "../../components/Functions/Telegram/isRequestSafe";
import pb from "../../components/Functions/authAsAdmin";
import AES from "crypto-js/aes";
import Utf8 from "crypto-js/enc-utf8";

export async function POST(request) {
  const response = JSON.parse(await request.json());

  if (!isRequestSafe(response)) Response.json({ isSuccess: false });

  const records = await pb.collection("balance").getFullList({
    sort: "-created",
  });

  const secret = process.env.TELEGRAM_TOKEN;

  // Passwords are encrypted in database, so we decrypt
  // them before we send them to python script
  records.forEach((record) => {
    const bytes = AES.decrypt(record.sofra_password, secret);

    const originalText = bytes.toString(Utf8);

    record.sofra_password = originalText;
  });

  return Response.json({ users: records });
}
