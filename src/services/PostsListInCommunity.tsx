import { Post } from "../types";
import SinglePost from "../services/SinglePost";

const PostsInCommunity = ({ posts }: { posts: Post[] }) => {
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className="post-list-in-c">
          <div>
            <SinglePost post={post} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostsInCommunity;
