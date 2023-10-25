import { Link } from "react-router-dom";
import { Notification } from "../types";
import TimeAgo from "../utils/getTimeAgo";
import { markNotificatiosAsRead } from "../utils/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const getTitle = (notification: Notification) => {
  const content = notification.content.split("\n")[0];

  if (content.length > 140) {
    return content.slice(0, 140) + "...";
  }

  return content;
};
const ListItem = ({ notification }: { notification: Notification }) => {
  const queryClient = useQueryClient();

  const markNotificationMutation = useMutation(() => {
    return markNotificatiosAsRead(notification?.id.toString());
  });

  const onNotificationMark = async (): Promise<void> => {
    try {
      await markNotificationMutation.mutateAsync();
      queryClient.invalidateQueries(["notification"]);
    } catch (error) {
      Promise.reject(error);
    }
  };

  return (
    <Link
      onClick={notification.is_read ? undefined : onNotificationMark}
      to={`/posts/${notification.post_id}`}
    >
      <div
        className={`notes-list-item ${notification.is_read ? "" : "not_read"}`}
      >
        <p>{getTitle(notification)}</p>
        <p>
          <span>{<TimeAgo date={new Date(notification.updated_at)} />}</span>
        </p>
      </div>
    </Link>
  );
};

export default ListItem;
