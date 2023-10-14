import { Post, Comment } from "../types";

function NestedComments(
  post: Post | undefined
): Record<string | "parent", Comment[]> {
  const commentByParentId: Record<string | "parent", Comment[]> = {};

  if (!post) {
    // Handling the case where post is undefined
    return commentByParentId;
  }

  for (const comment of post.comments) {
    const parentCommentId = comment.parent_comment
      ? comment.parent_comment.toString()
      : "parent";
    if (!commentByParentId[parentCommentId]) {
      commentByParentId[parentCommentId] = [];
    }
    commentByParentId[parentCommentId].push(comment);
  }
  return commentByParentId;
}

const UseNestedComments = (
  post: Post | undefined
): Record<string | "parent", Comment[]> => {
  return NestedComments(post);
};

// const UseNestedComments = useMemo(() => {
//   return (post: Post | undefined) => {
//     return NestedComments(post);
//   };
// }, [post]);

export default UseNestedComments;
