import pb from "../../components/Functions/authAsAdmin";
import { getMenu } from "../../components/Functions/getMenu";

export const dynamic = "force-dynamic";

export async function GET() {
  const menu = await getMenu();

  const menuInfo = { menu: menu.menu, url: menu.url, date: menu.date };

  return Response.json({ menu: menuInfo });
}
