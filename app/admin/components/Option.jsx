import Announcement from "./Announcement";
import { Ratings } from "./Ratings";
import Users from "./Users";

export default function Option({ option, users, ratings }) {
  if (option === "announcement") {
    return <Announcement />;
  }

  if (option === "users") {
    return <Users users={users} />;
  }

  if (option === "ratings") return <Ratings ratings={ratings} />;

  return null;
}
