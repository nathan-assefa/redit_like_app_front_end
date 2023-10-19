import { Link } from "react-router-dom";
import { Post } from "../types";
import DownvoteButton from "../IconButtons/DownvoteButton";
import UpvoteButton from "../IconButtons/UpvoteButton";
import IconForReactions from "../IconButtons/IconForReactions";
import UpvoteArrow from "../icons/UpvoteArrow";
import DownvoteArrow from "../icons/DownvoteArrow";
import LoveIcon from "../icons/Love";
import Like from "../icons/Like";
import Comment from "../icons/Comment";
import SaveIcon from "../icons/SaveIcon";
// import JoinOrLeaveCommunity from "./JoinOrLeaveCommunity";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { upvotePost, downvotePost, lovePost, likePost } from "../utils/posts";
import TimeAgo from "../utils/getTimeAgo";

const SinglePost = ({ post }: { post: Post }) => {
  if (!post) {
    return <h3>No post found</h3>;
  }

  const [postVote, setPostVote] = useState(false);
  const [postDownvote, setPostDownvote] = useState(false);
  const [postLove, setPostLove] = useState(false);
  const [postLike, setPostLike] = useState(false);

  const queryClient = useQueryClient();

  const upvotePostMutation = useMutation(() => {
    return upvotePost(post.id.toString()).then(() =>
      setPostVote((prev) => !prev)
    );
  });

  const onPostVote = async (): Promise<void> => {
    try {
      await upvotePostMutation.mutateAsync();
      queryClient.invalidateQueries(["post"]);
    } catch (error) {
      Promise.reject(error);
    }
  };

  const downvotePostMutation = useMutation(() => {
    return downvotePost(post.id.toString()).then(() =>
      setPostDownvote((prev) => !prev)
    );
  });

  const onPostDownvote = async (): Promise<void> => {
    try {
      await downvotePostMutation.mutateAsync();
      queryClient.invalidateQueries(["post"]);
    } catch (error) {
      Promise.reject(error);
    }
  };

  const likePostMutation = useMutation(() => {
    return likePost(post.id.toString()).then(() =>
      setPostLike((prev) => !prev)
    );
  });

  const onPostLike = async (): Promise<void> => {
    try {
      await likePostMutation.mutateAsync();
      queryClient.invalidateQueries(["post"]);
    } catch (error) {
      Promise.reject(error);
    }
  };

  const lovePostMutation = useMutation(() => {
    return lovePost(post.id.toString()).then(() =>
      setPostLove((prev) => !prev)
    );
  });

  const onPostLove = async (): Promise<void> => {
    try {
      await lovePostMutation.mutateAsync();
      queryClient.invalidateQueries(["post"]);
    } catch (error) {
      Promise.reject(error);
    }
  };

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
              {<TimeAgo date={new Date(post.created_at)} />}
            </p>
          </div>
          <div className="post-footer">
            <div className="vote-wrapper">
              <div className="post-vote">
                <UpvoteButton
                  onClick={onPostVote}
                  isActive={postVote}
                  Icon={UpvoteArrow}
                  aria-label="upvote"
                />
                <p className="total-vote">{post.voted_count}</p>
                <DownvoteButton
                  onClick={onPostDownvote}
                  isActive={postDownvote}
                  Icon={DownvoteArrow}
                  aria-label="downvote"
                />
              </div>
            </div>
            <IconForReactions
              onClick={onPostLove}
              isActive={postLove}
              Icon={LoveIcon}
              aria-label="heart"
            >
              {post.love_count}
            </IconForReactions>
            <IconForReactions
              onClick={onPostLike}
              isActive={postLike}
              Icon={Like}
              aria-label="like"
            >
              {post.like_count}
            </IconForReactions>
            <div className="comment-btn">
              <IconForReactions Icon={Comment} aria-label="comment">
                <p className="count-comment">{post.comment_count} comments</p>
              </IconForReactions>
            </div>
            <div className="save-btn">
              <IconForReactions Icon={SaveIcon} aria-label="saveIcon">
                <p className="save-name">save</p>
              </IconForReactions>
            </div>
            {/* <JoinOrLeaveCommunity communityId={post.community.id.toString()} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
