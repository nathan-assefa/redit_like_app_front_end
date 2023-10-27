import { Messages } from "../types";

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  //   dateStyle: "medium",
  timeStyle: "short",
});

const longDateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
});

const ListItem = ({ message }: { message: Messages }) => {
  return (
    <div>
      <div className="user-message-wrapper">
        <div className="profile-picture user-picture"></div>
        <div className="user-message-content">
          <p className="u-message">{message.content}</p>
          <p className="u-date-formatter">
            {dateFormatter.format(Date.parse(message?.created_at))}
          </p>
        </div>
      </div>
      <p className="long-date-format">
        {longDateFormatter.format(Date.parse(message?.created_at))}
      </p>
    </div>
  );
};

export default ListItem;

/*
const ListItem = ({ message }: { message: Messages }) => {
  const accessToken = AuthToken();

  const decodedToken: { user_id: string | null } = jwt_decode(accessToken);
  const userId = decodedToken.user_id;
  const isSender = message.sender.id === userId!; // Replace `loggedInUserId` with the actual ID of the logged-in user.

  return (
    <div>
      <div
        className={`user-message-wrapper ${
          isSender ? "from-sender" : "from-recipient"
        }`}
      >
        <div
          className={`profile-picture ${
            isSender ? "user-picture" : "recipient-picture"
          }`}
        ></div>
        <div className="user-message-content">
          <p
            className={`u-message ${
              isSender ? "from-sender-message" : "from-recipient-message"
            }`}
          >
            {message.content}
          </p>
          <p className="u-date-formatter">
            {dateFormatter.format(Date.parse(message?.created_at))}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
*/
