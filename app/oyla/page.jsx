import Others from "./components/Others";
import Food from "./components/Food";
import RatingForm from "./components/RatingForm";
import Navbar from "../components/Navbar/Navbar";
import UserInfo from "./components/UserInfo";
import { getSession } from "../components/Functions/getSession";
import { getComment } from "../components/Functions/getComment";

export default async function Page() {
  const { session } = await getSession();

  const username = session.user.record.username;
  const userId = session.user.record.id;

  const response = await getComment(userId);

  const didUserCommented = response?.ok || false;
  const userComment = response?.comment || null;

  return (
    <div className="pt-12">
      <Navbar />
      <UserInfo username={username} />
      <Food />
      <RatingForm
        didUserCommented={didUserCommented}
        userComment={userComment}
      />
      <Others />
    </div>
  );
}
