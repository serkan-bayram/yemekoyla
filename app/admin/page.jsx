import { cookies } from "next/headers";
import pb from "../components/Functions/authAsAdmin";
import Client from "./components/Client";

export default async function Page() {
  cookies();

  const records = await pb.collection("users").getFullList({
    sort: "-created",
  });

  const users = [];

  records.forEach((record) => {
    users.push({
      id: record.id,
      username: record.username,
      email: record.email,
      permission: record.permission,
    });
  });

  return <Client users={users} />;
}
