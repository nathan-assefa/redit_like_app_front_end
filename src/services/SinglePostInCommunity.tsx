import { Link } from "react-router-dom";
import { Post } from "../types";
import IconForContent from "../IconButtons/DownvoteButton";
import UpvoteArrow from "../icons/UpvoteArrow";
import DownvoteArrow from "../icons/DownvoteArrow";
import LoveIcon from "../icons/Love";
import Like from "../icons/Like";
import Comment from "../icons/Comment";
import SaveIcon from "../icons/SaveIcon";

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
});

export const SinglePostInCommunity = ({ post }: { post: Post }) => {
  if (!post) {
    return <h3>No post found</h3>;
  }

  return (
    <div>
      <div className="single-post">
        <div className="post-container">
          <div className="post-header">
            <div className="community-name">{post.community.name}</div>
            <Link to={`/posts/${post.id}`}>
              <div className="post-title">{post.title}</div>
            </Link>
          </div>
          <Link to={`/posts/${post.id}`}>
            <div className="post-content">{post.content}</div>
          </Link>
          <div className="post-info">
            <p className="post-author">Posted by {post.author.first_name}</p>
            <p className="post-date">
              <span className="divider">|</span>
              {dateFormatter.format(Date.parse(post.created_at))}
            </p>
          </div>
          <div className="post-footer">
            <IconForContent Icon={UpvoteArrow} aria-label="upvote" />
            <p className="total-vote">800</p>
            <IconForContent Icon={DownvoteArrow} aria-label="downvote" />
            <IconForContent Icon={LoveIcon} aria-label="heart" />
            <IconForContent Icon={Like} aria-label="like" />
            <div className="comment-btn">
              <IconForContent Icon={Comment} aria-label="comment">
                <p className="count-comment">2 comments</p>
              </IconForContent>
            </div>
            <div className="save-btn">
              <IconForContent Icon={SaveIcon} aria-label="saveIcon">
                <p className="save-name">save</p>
              </IconForContent>
            </div>
            <button className="join-community">Join</button>
          </div>
        </div>
      </div>
    </div>
  );
};
