import { Comment } from "../types";
import { FaHeart, FaEdit, FaTrash, FaReply } from "react-icons/fa";
import UpvoteArrow from "../icons/UpvoteArrow";
import DownvoteArrow from "../icons/DownvoteArrow";
import Like from "../icons/Like";
// import { IoMdSettings } from "react-icons/io";
// import { AiOutlineForm } from "react-icons/ai";
// import { BiComment } from "react-icons/bi";
// import { BiBell } from "react-icons/bi";
// import { FaArrowAltCircleUp, FaArrowAltCircleDown } from "react-icons/fa";
// import ThickerArrowIcon from "../icons/UpvoteArrow";
import IconBtn from "./IconBtn";
import { useState } from "react";
import { usePost } from "../contexts/PostContext";
import { createComment, updateComment, deleteComment } from "../utils/comments";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import AuthToken from "../utils/AuthToken";
import jwt_decode from "jwt-decode";

import Comments from "./CommentList";
import CommentForm from "./CommentForm";

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
});

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
    <div
      className="comment"
      style={{
        margin: "20px",
        padding: "10px",
      }}
    >
      <div className="header">
        <span className="name">{comment.author?.first_name}</span>
        <span> | </span>
        <span className="date">
          {dateFormatter.format(Date.parse(comment.created_at))}
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
          <IconBtn Icon={UpvoteArrow} aria-label="love" />
          <p>800</p>
          <IconBtn Icon={DownvoteArrow} aria-label="love" />
        </div>
        <IconBtn Icon={FaHeart} aria-label="love">
          2
        </IconBtn>
        <IconBtn Icon={Like} aria-label="like">
          2
        </IconBtn>
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

        {nestedComments && <Comments comments={nestedComments} />}
      </div>
    </div>
  );
};

export default SingleComment;
