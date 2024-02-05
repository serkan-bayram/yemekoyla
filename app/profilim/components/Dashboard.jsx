import Settings from "./Settings";

export default function Dashboard({
  setPopup,
  dashboard,
  username,
  userEmail,
}) {
  if (dashboard === "settings")
    return (
      <Settings setPopup={setPopup} username={username} userEmail={userEmail} />
    );

  return <div>Dashboard</div>;
}
