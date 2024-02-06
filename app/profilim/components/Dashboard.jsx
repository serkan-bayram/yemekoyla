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
  let content;

  if (dashboard === "comments") {
    content = useMemo(
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
  } else if (dashboard === "settings") {
    content = (
      <Settings
        setDashboard={setDashboard}
        setPopup={setPopup}
        username={username}
        userEmail={userEmail}
      />
    );
  } else {
    content = <div></div>;
  }

  return content;
}
