import { Messages } from "../types";
// import { Link } from "react-router-dom";

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

const SingleMessage = ({ message }: { message: Messages }) => {
  return (
    <div className="recent-messages">
      <div className="recent">
        <div key={message.id}>
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
        </div>
      </div>
    </div>
  );
};

export default SingleMessage;
