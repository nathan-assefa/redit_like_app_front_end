import { Link } from "react-router-dom";
import { Notification } from "../types";
import TimeAgo from "../utils/getTimeAgo";

const getTitle = (notification: Notification) => {
  const content = notification.content.split("\n")[0];

  if (content.length > 140) {
    return content.slice(0, 140) + "...";
  }

  return content;
};
const ListItem = ({ notification }: { notification: Notification }) => {
  return (
    <Link to={`/notification/${notification.id}`}>
      <div className="notes-list-item">
        <p>{getTitle(notification)}</p>
        <p>
          <span>{<TimeAgo date={new Date(notification.created_at)} />}</span>
        </p>
      </div>
    </Link>
  );
};

export default ListItem;
