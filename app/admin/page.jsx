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

  const ratings = await pb.collection("ratings").getFullList({
    sort: "-created",
    expand: "user,menu",
  });

  return <Client users={users} ratings={ratings} />;
}
