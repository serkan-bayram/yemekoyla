import { getSession } from "../../components/Functions/getSession";
import MyProfileForm from "./MyProfileForm";

export default async function MyProfile() {
  const { session } = await getSession();

  const userEmail = session?.user.record.email || "";
  const username = session?.user.record.username || "";

  return <MyProfileForm userEmail={userEmail} username={username} />;
}
