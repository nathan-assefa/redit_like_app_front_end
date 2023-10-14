import { usePost } from "../contexts/PostContext";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment } from "../utils/comments";

export const Post = () => {
  const { post, rootComments, postId } = usePost();

  if (!post) {
    return <h3>No post found</h3>;
  }

  const createCommentMutation = useMutation((content: string) => {
    // Calling createComment function with the content
    return createComment(postId, content);
  });

  const queryClient = useQueryClient();

  // Function to handle form submission
  const handleCommentSubmit = async (content: string): Promise<void> => {
    try {
      await createCommentMutation.mutateAsync(content);
      // Trigger a refetch of the comments query
      queryClient.invalidateQueries(["post"]);
    } catch (error) {
      Promise.reject(error);
    }
  };

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>{post.author?.first_name}</p>
      <h3>Comments</h3>
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
        {rootComments != null && rootComments.length > 0 && (
          <CommentList comments={rootComments} />
        )}
      </section>
    </div>
  );
};
