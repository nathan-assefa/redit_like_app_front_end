import { Post } from "../types";
import { SinglePostInCommunity } from "./SinglePostInCommunity";

const PostsInCommunity = ({ posts }: { posts: Post[] }) => {
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <SinglePostInCommunity post={post} />
        </div>
      ))}
    </div>
  );
};

export default PostsInCommunity;
