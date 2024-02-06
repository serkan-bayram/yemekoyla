import Settings from "./Settings";
import Comments from "./Comments";
import { useMemo } from "react";

export default function Dashboard({
  setPopup,
  dashboard,
  username,
  userEmail,
  comments,
  setDashboard,
  setComment,
}) {
  if (dashboard === "settings")
    return (
      <Settings
        setDashboard={setDashboard}
        setPopup={setPopup}
        username={username}
        userEmail={userEmail}
      />
    );

  if (dashboard === "comments") {
    return useMemo(
      () => (
        <Comments
          setComment={setComment}
          setDashboard={setDashboard}
          username={username}
          comments={comments}
          setPopup={setPopup}
        />
      ),
      []
    );
  }

  return <div></div>;
}
