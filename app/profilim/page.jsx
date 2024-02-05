import { getSession } from "../components/Functions/getSession";
import Navbar from "../components/Navbar/Navbar";
import Main from "./components/Main";

export default async function Page() {
  const { session } = await getSession();

  const userEmail = session?.user.record.email || "";
  const username = session?.user.record.username || "";

  return (
    <>
      <Navbar />
      <Main userEmail={userEmail} username={username} />
    </>
  );
}
