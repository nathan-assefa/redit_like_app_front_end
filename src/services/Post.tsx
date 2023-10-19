import { usePost } from "../contexts/PostContext";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import SinglePost from "./SinglePost";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment } from "../utils/comments";

export const Post = () => {
  const { post, rootComments, postId } = usePost();

  if (!post) {
    return <h3>No post found</h3>;
  }

  const createCommentMutation = useMutation((content: string) => {
    return createComment(postId, content);
  });

  const queryClient = useQueryClient();

  const handleCommentSubmit = async (content: string): Promise<void> => {
    try {
      await createCommentMutation.mutateAsync(content);
      queryClient.invalidateQueries(["post"]);
    } catch (error) {
      Promise.reject(error);
    }
  };

  return (
    <div>
      <div className="single-post">
        <SinglePost post={post} />
      </div>
      <h3 className="comment-header">
        Write your comment as{" "}
        <span>{post.author.first_name.toLocaleLowerCase()}</span>
      </h3>
      <br />
      <section>
        <div>
          <CommentForm
            isLoading={createCommentMutation.isLoading}
            isError={createCommentMutation.isError}
            autoFocus={true}
            onSubmit={handleCommentSubmit}
          />
        </div>
        <div className="comment-wrapper">
          {rootComments != null && rootComments.length > 0 && (
            <CommentList comments={rootComments} />
          )}
        </div>
      </section>
    </div>
  );
};
