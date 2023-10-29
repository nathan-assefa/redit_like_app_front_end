import { BookMark } from "../types";
import { Link } from "react-router-dom";
import DateIcon from "../icons/DateIcon";

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
});

const BookMarks = ({ bookMarks }: { bookMarks: BookMark[] }) => {
  if (!bookMarks) {
    return null;
  }
  return (
    <div>
      <div className="profile-right-column">
        <div className="recent-articles book-marked-posts">
          Your Saved Posts Here
        </div>
        {bookMarks.length > 0 ? (
          bookMarks.slice(0, 6).map((bookMark) => (
            <Link
              to={`/posts/${bookMark.post.id}`}
              className="filtered-post single-post"
              key={bookMark.post.id}
            >
              <div className="profile-picture pro-picture"></div>
              <div className="user-posts">
                <p className="p-u-name">@{bookMark.post.author.first_name}</p>
                <div className="c-date-info p-c-date">
                  <div className="date-icon">
                    <DateIcon />
                  </div>
                  <span className="date">
                    {dateFormatter.format(
                      Date.parse(bookMark.post?.created_at)
                    )}
                  </span>
                </div>
                <p className="p-c-title">
                  {bookMark.post.title.length >= 40
                    ? bookMark.post.title.slice(0, 40) + "..."
                    : bookMark.post.title}
                </p>
                {/* <div className="bookmark-post-content">
                  <p className="p-c-content">
                    {bookMark.post.content.length >= 40
                      ? bookMark.post.content.slice(0, 40) + "..."
                      : bookMark.post.content}
                  </p>
                </div> */}
              </div>
            </Link>
          ))
        ) : (
          <p className="no-post">
            There are currently no posts from this user.
          </p>
        )}
      </div>
    </div>
  );
};

export default BookMarks;
