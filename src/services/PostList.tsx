import { Link } from "react-router-dom";
import SinglePost from "./SinglePost";
import { usePostList } from "../contexts/PostListContext";
import TopCommunities from "./TopCommunities";
import TopUsersProfile from "./TopUserProfile";

export const PostList = () => {
  const { post } = usePostList();

  return (
    <div className="post-wrapper">
      <div className="posts-list">
        {post &&
          post.map((p) => (
            <div className="single-post" key={p.id}>
              <SinglePost post={p} />
            </div>
          ))}
      </div>
      <div className="community-post">
        <div className="create-post-and-community">
          <div className="community-1"></div>
          <p>
            Interested in sharing your thoughts? Create a community and post
            your ideas.
          </p>
          <Link to="/create_community">
            <button className=" buttn on-community-create">
              Create Community
            </button>
          </Link>
          <Link to="/create_post">
            <button className=" buttn on-post-create">Create Post</button>
          </Link>
        </div>
        <TopUsersProfile />
        <TopCommunities />
      </div>
    </div>
  );
};
