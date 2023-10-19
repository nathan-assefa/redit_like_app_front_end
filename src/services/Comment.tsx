import { Comment } from "../types";
import { FaEdit, FaTrash, FaReply } from "react-icons/fa";
import LoveIcon from "../icons/Love";
import UpvoteArrow from "../icons/UpvoteArrow";
import DownvoteArrow from "../icons/DownvoteArrow";
import Like from "../icons/Like";
import IconBtn from "../IconButtons/HeaderIconBtn";
import IconForContent from "../IconButtons/DownvoteButton";
import { useState } from "react";
import { usePost } from "../contexts/PostContext";
import { createComment, updateComment, deleteComment } from "../utils/comments";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import AuthToken from "../utils/AuthToken";
import jwt_decode from "jwt-decode";

import Comments from "./CommentList";
import CommentForm from "./CommentForm";
import TimeAgo from "../utils/getTimeAgo";

const SingleComment = ({ comment }: { comment: Comment }) => {
  const { getReplies } = usePost();
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { postId } = usePost();
  const accessToken = AuthToken();

  const decodedToken: { user_id: string | null } = jwt_decode(accessToken);
  const userId = decodedToken.user_id;

  const queryClient = useQueryClient();

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
          <div className="comment-upvote">
            <UpvoteArrow aria-label="love" />
          </div>
          <p>800</p>
          <div className="comment-downvote">
            <DownvoteArrow aria-label="love" />
          </div>
        </div>
        <div className="comment-icon comment-heart">
          <IconForContent Icon={LoveIcon} aria-label="love">
            2
          </IconForContent>
        </div>
        <div className="comment-icon comment-like">
          <IconForContent Icon={Like} aria-label="like">
            2
          </IconForContent>
        </div>
        <IconBtn
          Icon={FaReply}
          onClick={() => setIsReplying((prev) => !prev)}
          isActive={isReplying}
          aria-label={isReplying ? "cance" : "reply"}
        />
        {userId === comment.author.id && (
          <>
            <IconBtn
              Icon={FaEdit}
              onClick={() => setIsEditing((prev) => !prev)}
              isActive={isEditing}
              aria-label="edit"
            />
            <IconBtn
              Icon={FaTrash}
              onClick={onCommentDelete}
              isActive={isDeleting}
              aria-label="delete"
              color="danger"
            />
          </>
        )}
      </div>
      {deleteCommentMutation.isError && (
        <div className="error-msg mt-1">
          You are not allowed to delete the comment
        </div>
      )}
      <div style={{ color: "red" }}>
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

        <div className="neseted-comment">
          {nestedComments && <Comments comments={nestedComments} />}
        </div>
      </div>
    </div>
  );
};

export default SingleComment;
