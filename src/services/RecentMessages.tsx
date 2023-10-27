import { useQuery } from "@tanstack/react-query";
import { mostRecentMessages } from "../utils/messages";
// import SingleMessage from '../services/SingleMessage'
import { Messages } from "../types";
import { Link } from "react-router-dom";

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  //   dateStyle: "medium",
  timeStyle: "short",
});

const getTitle = (message: Messages) => {
  const content = message.content.split("\n")[0];

  if (content.length > 30) {
    return content.slice(0, 30) + "...";
  }

  return content;
};

const RecentMessages = () => {
  const {
    data: messages,
    isLoading,
    isError,
  } = useQuery<Messages[]>(["recent_messages"], () => mostRecentMessages(), {
    initialData: [],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Can't fetch</div>;
  }

  return (
    <div className="recent-messages">
      <div className="recent">
        {messages.slice(0, 6).map((message) => (
          <Link to={`/messages/${message.sender.id}`} key={message.id}>
            <div
              className={`user-recent-message ${
                message.is_read ? "" : "not_recent_msg_read"
              }`}
            >
              <div className="profile-picture recent-pp"></div>
              <div className="recent-message-content">
                <p className="recent-m-u-name">{message.sender.first_name}</p>
                <p className="recent-m-c">{getTitle(message)}</p>
                <p className="u-date-formatter r-d-f">
                  {dateFormatter.format(Date.parse(message?.created_at))}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentMessages;
