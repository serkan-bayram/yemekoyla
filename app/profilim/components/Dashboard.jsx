import Settings from "./Settings";
import Comments from "./Comments";

export default function Dashboard({
  setPopup,
  dashboard,
  username,
  userEmail,
  comments,
  setDashboard,
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
    return (
      <Comments
        setDashboard={setDashboard}
        username={username}
        comments={comments}
      />
    );
  }

  return <div></div>;
}
