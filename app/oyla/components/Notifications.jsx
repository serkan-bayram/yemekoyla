import Notification, { NotificationGuest } from "./Notification";
import { getNotifications } from "./getNotifications";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";

export function NotificationsGuest({ notifications }) {
  return (
    <div className="flex flex-col gap-3 w-5/6 md:w-1/3 fixed z-50 top-24 md:right-16 md:top-16 md:left-auto md:translate-x-0 left-1/2 -translate-x-1/2">
      {!!notifications &&
        notifications.map((notification) => (
          <NotificationGuest
            key={uuidv4()}
            title={notification.title}
            content={notification.content}
          />
        ))}
    </div>
  );
}

export default async function Notifications({ pb }) {
  const notifications = await getNotifications(pb);

  return (
    <div className="flex flex-col gap-3 w-5/6 md:w-1/3 fixed z-50 top-24 md:right-16 md:top-16 md:left-auto md:translate-x-0 left-1/2 -translate-x-1/2">
      {!!notifications &&
        notifications.map((notification) => (
          <Notification
            key={uuidv4()}
            id={notification.id}
            title={notification.title}
            content={notification.content}
          />
        ))}
    </div>
  );
}
