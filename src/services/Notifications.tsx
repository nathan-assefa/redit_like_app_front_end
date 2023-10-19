import { useQuery } from "@tanstack/react-query";
import { Notification } from "../types";
import { getNotifications } from "../utils/notifications";
import NotificationList from "./ListNotification";

const Notifications = () => {
  const {
    data: notifications,
    isLoading,
    isError,
  } = useQuery<Notification[]>(["notification"], () => getNotifications(), {
    initialData: [],
  });

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (isError) {
    return (
      <div>
        <p>Can't fetch notifications</p>
      </div>
    );
  }
  // return (
  //   <div>
  //     <div className="all-notifications">
  //       {notifications.map((notification) => (
  //         <div key={notification.id}>{notification.content}</div>
  //       ))}
  //     </div>
  //   </div>
  // );
  return (
    <div className="notifications">
      <div className="notes">
        <div className="notes-list">
          {notifications.map((notification, index) => (
            <NotificationList notification={notification} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
