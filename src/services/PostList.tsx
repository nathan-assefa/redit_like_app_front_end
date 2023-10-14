import { Link } from "react-router-dom";
import { getPosts } from "../utils/posts";
import { useQuery } from "@tanstack/react-query";
import { Post } from "../types";
import IconBtn from "./IconBtn";
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

export const PostList = () => {
  const {
    data: post,
    isLoading,
    isError,
  } = useQuery<Post[]>(["post"], () => getPosts(), { initialData: [] });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading posts.</div>;
  }
  return (
    <div className="post-wrapper">
      <div className="posts-list">
        {post.map((p) => (
          <div className="single-post" key={p.id}>
            <div className="post-container">
              <div className="post-header">
                <div className="community-name">{p.community.name}</div>
                <div className="post-title">{p.title}</div>
              </div>
              <div className="post-content">{p.content}</div>
              <div className="post-info">
                <p className="post-author">Posted by {p.author.first_name}</p>
                <p className="post-date">
                  <span className="divider">|</span>
                  {dateFormatter.format(Date.parse(p.created_at))}
                </p>
              </div>
              <div className="post-footer">
                <IconBtn Icon={UpvoteArrow} aria-label="upvote" />
                <p className="total-vote">800</p>
                <IconBtn Icon={DownvoteArrow} aria-label="downvote" />
                <IconBtn Icon={LoveIcon} aria-label="heart" />
                <IconBtn Icon={Like} aria-label="like" />
                <div className="comment-btn">
                  <IconBtn Icon={Comment} aria-label="comment">
                    <p className="count-comment">2 comments</p>
                  </IconBtn>
                </div>
                <div className="save-btn">
                  <IconBtn Icon={SaveIcon} aria-label="saveIcon">
                    <p className="save-name">save</p>
                  </IconBtn>
                </div>
                <button className="join-community">Join</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="community-post">
        <div className="create-post-and-community">
          <div className="community-1"></div>
          <p>
            Interested in sharing your thoughts? Create a community and post
            your ideas.
          </p>
          <Link to="/create_community">
            <button className=" buttn on-community-create">
              Create Community
            </button>
          </Link>
          <Link to="/create_post">
            <button className=" buttn on-post-create">Create Post</button>
          </Link>
        </div>
        <div className="top-community-list">
          <div className="community-2"></div>
        </div>
      </div>
    </div>
  );
};
