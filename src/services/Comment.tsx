import { Comment, User } from "../types";
import {
  FaEdit,
  FaTrash,
  FaReply,
  FaHeart,
  FaRegHeart,
  FaRegThumbsUp,
  FaThumbsUp,
} from "react-icons/fa";
import UpvoteArrowActivate from "../icons/UpvoteArrowActivate";
import UpvoteArrowDeactivate from "../icons/UpvotedArrowDeactive";
import DownvoteArrowDeactivate from "../icons/DownvoteArrowDeactive";
import DownvoteArrowActivate from "../icons/DownvoteArrowActivate";
import ThreeDots from "../icons/ThreeDots";
// import IconBtn from "../IconButtons/HeaderIconBtn";
import IconForReactions from "../IconButtons/IconForReactions";
import IsReplying from "../IconButtons/IsReplying";
import { useState, useEffect } from "react";
import { usePost } from "../contexts/PostContext";
import {
  createComment,
  updateComment,
  deleteComment,
  upvoteComment,
  downvoteComment,
  likeComment,
  loveComment,
} from "../utils/comments";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import AuthToken from "../utils/AuthToken";
import jwt_decode from "jwt-decode";

import Comments from "./CommentList";
import CommentForm from "./CommentForm";
import TimeAgo from "../utils/getTimeAgo";

const SingleComment = ({ comment }: { comment: Comment }) => {
  const { getReplies } = usePost();
  const [isReplying, setIsReplying] = useState(false);
  const [horizontalMenu, setHorizontalMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [commentVote, setCommentVote] = useState(false);
  const [commentDownvote, setCommentDownvote] = useState(false);
  const [commentLove, setCommentLove] = useState(false);
  const [commentLike, setCommentLike] = useState(false);
  const { postId } = usePost();
  const accessToken = AuthToken();

  const decodedToken: { user_id: string | null } = jwt_decode(accessToken);
  const userId = decodedToken.user_id;

  const hasUserInArray = (userArray: User[], currentUserId: string) => {
    return userArray.some((user) => user.id === currentUserId);
  };

  useEffect(() => {
    if (comment) {
      const commentLiked = hasUserInArray(comment.likes, userId!);
      const commentLoved = hasUserInArray(comment.loves, userId!);
      const commentUpvoted = hasUserInArray(comment.upvoted_by, userId!);
      const commentDownvoted = hasUserInArray(comment.downvoted_by, userId!);

      setCommentLike(commentLiked);
      setCommentLove(commentLoved);
      setCommentVote(commentUpvoted);
      setCommentDownvote(commentDownvoted);
    }
  }, [comment, userId]);

  const queryClient = useQueryClient();

  const upvoteCommentMutation = useMutation(() => {
    return upvoteComment(comment.id.toString())
      .then(() => setCommentVote((prev) => !prev))
      .then(() => console.log(commentVote));
  });

  const onCommentVote = async (): Promise<void> => {
    try {
      await upvoteCommentMutation.mutateAsync();
      queryClient.invalidateQueries(["post"]);
    } catch (error) {
      Promise.reject(error);
    }
  };

  const downvoteCommentMutation = useMutation(() => {
    return downvoteComment(comment.id.toString()).then(() =>
      setCommentDownvote((prev) => !prev)
    );
  });

  const onCommentDownvote = async (): Promise<void> => {
    try {
      await downvoteCommentMutation.mutateAsync();
      queryClient.invalidateQueries(["post"]);
    } catch (error) {
      Promise.reject(error);
    }
  };

  const likeCommentMutation = useMutation(() => {
    return likeComment(comment.id.toString()).then(() =>
      setCommentLike((prev) => !prev)
    );
  });

  const onCommentLike = async (): Promise<void> => {
    try {
      await likeCommentMutation.mutateAsync();
      queryClient.invalidateQueries(["post"]);
    } catch (error) {
      Promise.reject(error);
    }
  };

  const loveCommentMutation = useMutation(() => {
    return loveComment(comment.id.toString()).then(() =>
      setCommentLove((prev) => !prev)
    );
  });

  const onCommentLove = async (): Promise<void> => {
    try {
      await loveCommentMutation.mutateAsync();
      queryClient.invalidateQueries(["post"]);
    } catch (error) {
      Promise.reject(error);
    }
  };

  const createCommentReplyMutation = useMutation((content: string) => {
    return createComment(postId, content, comment.id.toString()).then(() =>
      setIsReplying((prev) => !prev)
    );
  });

  const onCommentReply = async (content: string): Promise<void> => {
    try {
      await createCommentReplyMutation.mutateAsync(content);
      queryClient.invalidateQueries(["post"]);
    } catch (error) {
      Promise.reject(error);
    }
  };

  const updateCommentReplyMutation = useMutation((content: string) => {
    return updateComment(content, comment.id.toString()).then(() =>
      setIsEditing((prev) => !prev)
    );
  });

  const onCommentUpdate = async (content: string): Promise<void> => {
    try {
      await updateCommentReplyMutation.mutateAsync(content);
      queryClient.invalidateQueries(["post"]);
    } catch (error) {
      Promise.reject(error);
    }
  };

  const deleteCommentMutation = useMutation(() => {
    return deleteComment(comment.id.toString()).then(() =>
      setIsDeleting((prev) => !prev)
    );
  });

  const onCommentDelete = async (): Promise<void> => {
    try {
      await deleteCommentMutation.mutateAsync();
      queryClient.invalidateQueries(["post"]);
    } catch (error) {
      Promise.reject(error);
    }
  };

  const nestedComments = getReplies(comment.id.toString());
  return (
    <div className="comment">
      <div className="header">
        <div className="user-picture"></div>
        <span className="name">
          Commented by <span>{comment.author?.first_name}</span>
        </span>
        <span className="divider"> | </span>
        <span className="date">
          {<TimeAgo date={new Date(comment.created_at)} />}
        </span>
      </div>
      {isEditing ? (
        <CommentForm
          isLoading={updateCommentReplyMutation.isLoading}
          isError={updateCommentReplyMutation.isError}
          autoFocus={true}
          onSubmit={onCommentUpdate}
          initialValue={comment.content}
        />
      ) : (
        <div className="message">{comment.content}</div>
      )}
      <div className="footer">
        <div className="vote">
          <IconForReactions
            onClick={onCommentVote}
            isActive={commentVote}
            Icon={commentVote ? UpvoteArrowActivate : UpvoteArrowDeactivate}
            aria-label="upvote"
          />
          <p className="total-vote">{comment.voted_count}</p>
          <IconForReactions
            onClick={onCommentDownvote}
            isActive={commentDownvote}
            Icon={
              commentDownvote ? DownvoteArrowActivate : DownvoteArrowDeactivate
            }
            aria-label="downvote"
          />
        </div>
        <div className="comment-icon c-icon comment-heart">
          <IconForReactions
            onClick={onCommentLove}
            isActive={commentLove}
            Icon={commentLove ? FaHeart : FaRegHeart}
            aria-label="love"
          >
            {comment.love_count}
          </IconForReactions>
        </div>
        <div className="comment-icon c-icon comment-like">
          <IconForReactions
            onClick={onCommentLike}
            isActive={commentLike}
            Icon={commentLike ? FaThumbsUp : FaRegThumbsUp}
            aria-label="like"
          >
            {comment.like_count}
          </IconForReactions>
        </div>
        <div className="comment-icon c-icon comment-reply">
          <IsReplying
            Icon={FaReply}
            onClick={() => {
              setHorizontalMenu(false);
              setIsEditing(false);
              setIsDeleting(false);
              setIsReplying((prev) => !prev);
            }}
            isActive={isReplying}
            aria-label={isReplying ? "cancel" : "reply"}
          />
        </div>
        <div
          onClick={() => {
            setIsReplying(false);
            setIsEditing(false);
            setIsDeleting(false);
            setHorizontalMenu((prev) => !prev);
          }}
          className="three-dots"
        >
          <ThreeDots />
        </div>
      </div>
      {deleteCommentMutation.isError && (
        <div className="error-msg mt-1">
          You are not allowed to delete the comment
        </div>
      )}
      <div className="replying">
        {isReplying && (
          <div className="mt-1 mt-3">
            <CommentForm
              isLoading={createCommentReplyMutation.isLoading}
              isError={createCommentReplyMutation.isError}
              onSubmit={onCommentReply}
              autoFocus={true}
            />
          </div>
        )}

        {horizontalMenu && (
          <div className="d-e-wrapper">
            <div className="deleting-editing">
              {userId === comment.author.id && (
                <>
                  <div className="com-edit">
                    <IconForReactions
                      Icon={FaEdit}
                      onClick={() => setIsEditing((prev) => !prev)}
                      isActive={isEditing}
                      aria-label="edit"
                    >
                      Edit
                    </IconForReactions>
                  </div>
                  <div className="com-delete">
                    <IconForReactions
                      Icon={FaTrash}
                      onClick={onCommentDelete}
                      isActive={isDeleting}
                      aria-label="delete"
                      color="danger"
                    >
                      Delete
                    </IconForReactions>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        <div className="neseted-comment">
          {nestedComments && <Comments comments={nestedComments} />}
        </div>
      </div>
    </div>
  );
};

export default SingleComment;
