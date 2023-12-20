import Announcement from "./Announcement";

const componentsByOption = {
  announcement: Announcement,
};

export default function Option({ option }) {
  const Component = componentsByOption[option];

  return Component ? <Component /> : null;
}
