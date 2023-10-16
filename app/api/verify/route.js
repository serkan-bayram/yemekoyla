import jsonwebtoken from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(request) {
  const res = await request.json();

  const { code } = res;

  const cookieStore = cookies();
  const token = cookieStore.get("codeToken").value;

  const secret = process.env.tokenSecret;

  const decoded = jsonwebtoken.verify(token, secret, function (err, decoded) {
    if (err) {
      return new Error(err);
    }
    return decoded;
  });

  if (decoded.code === code) {
    console.log("yes");
    return new Response(true, {
      status: 200,
      headers: { isValidated: `yes` },
    });
  }

  return new Response(false);
}
