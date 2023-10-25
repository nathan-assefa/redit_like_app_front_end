import { usePost } from "../contexts/PostContext";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import SinglePost from "./SinglePost";
import CommunityDetail from "./CommunityDetail";
import CommunityRules from "./CommunityRules";
import TopCommunities from "./TopCommunities";
import { useAuth } from "../contexts/AuthContext";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment } from "../utils/comments";

export const Post = () => {
  const { post, rootComments, postId } = usePost();
  const { username } = useAuth();

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
    <div className="single-post-wrapper">
      <div className="left-column">
        <div className="single-post">
          <SinglePost post={post} />
        </div>
        <h3 className="comment-header">
          Write your comment as <span>{username?.toLocaleLowerCase()}</span>
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
      <div right-column>
        <div className="about-community">
          <CommunityDetail community={post.community} />
        </div>
        <div className="top-c-lists">
          <CommunityRules />
          <TopCommunities />
        </div>
      </div>
    </div>
  );
};
