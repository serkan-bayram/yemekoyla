import { getSession } from "../components/Functions/getSession";
import { getUserComments } from "../components/Functions/getUserComments";
import { getAvatar } from "../components/Functions/getAvatar";
import Navbar from "../components/Navbar/Navbar";
import Main from "./components/Main";

export default async function Page() {
  const { session } = await getSession();

  const userEmail = session?.user.record.email || "";
  const username = session?.user.record.username || "";

  // TODO: Comments json exposes too much unneccessary data
  const comments = await getUserComments();

  const avatar = await getAvatar();

  return (
    <>
      <Navbar />
      <Main
        avatar={avatar}
        comments={comments}
        userEmail={userEmail}
        username={username}
      />
    </>
  );
}
