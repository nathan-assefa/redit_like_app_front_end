import { Link } from "react-router-dom";
import SinglePost from "./SinglePost";
import { usePostList } from "../contexts/PostListContext";
import TopCommunities from "./TopCommunities";
import TopUsersProfile from "./TopUserProfile";
import Magnifier from "../icons/Magnifier";

export const PostList = () => {
  const { post, search, setSearch } = usePostList();

  return (
    <div className="post-wrapper">
      <div className="posts-list-containser">
        <div className="search-post-header">
          <div className="magnifi-icon">
            <Magnifier />
          </div>
          <input
            className="search"
            placeholder="Search Posts by Title"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="posts-list">
          {post &&
            post.map((p) => (
              <div className="single-post" key={p.id}>
                <SinglePost post={p} />
              </div>
            ))}
        </div>
      </div>
      <div className="post-page-right-col community-post">
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
