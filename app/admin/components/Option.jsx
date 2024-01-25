import Announcement from "./Announcement";
import Users from "./Users";

const componentsByOption = {
  announcement: Announcement,
  users: Users,
};

export default function Option({ option, users }) {
  if (option === "announcement") {
    return <Announcement />;
  }

  if (option === "users") {
    return <Users users={users} />;
  }

  return null;
}
