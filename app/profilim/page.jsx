import { getSession } from "../components/Functions/getSession";
import { getUserComments } from "../components/Functions/getUserComments";
import Navbar from "../components/Navbar/Navbar";
import Main from "./components/Main";

export default async function Page() {
  const { session } = await getSession();

  const userEmail = session?.user.record.email || "";
  const username = session?.user.record.username || "";

  const comments = await getUserComments();

  return (
    <>
      <Navbar />
      <Main comments={comments} userEmail={userEmail} username={username} />
    </>
  );
}
