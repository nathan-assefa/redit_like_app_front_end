import { useCommunity } from "../contexts/CommunityContext";
import PostsInCommunity from "./PostsListInCommunity";
import TopCommunities from "./TopCommunities";
import CommunityRules from "./CommunityRules";
import CommunityDetail from "./CommunityDetail";
import JoinOrLeaveCommunity from "./JoinOrLeaveCommunity";
import { useState } from "react";

export const Community = () => {
  const { community } = useCommunity();
  const [showposts, setShowPosts] = useState(false);
  return (
    <div className="community-detail-wrapper">
      <div className="community-right-col">
        <div className="community-details c-details">
          <h1 className="c-name">{community?.name}</h1>
          <p className="no-of-members">
            community membership: {community?.member_count} members
          </p>
          <div className="c-join">
            <JoinOrLeaveCommunity communityId={community?.id?.toString()!} />
          </div>
          <p className="c-desctiption">
            <span>Description: </span>
            {community?.description
              ? community.description
              : "No description for this community"}
          </p>
          <button
            onClick={() => setShowPosts((prev) => !prev)}
            className="see-more-posts"
          >
            See Posts
          </button>
          {showposts && (
            <div className="posts-in-com">
              {community?.posts != null && community?.posts.length > 0 && (
                <PostsInCommunity posts={community?.posts} />
              )}
            </div>
          )}
        </div>
      </div>
      <div className="top-c-lists">
        <div className="c-info-box">
          {community && <CommunityDetail community={community} />}
        </div>
        <TopCommunities />
        <div className="c-info-box c-rules-info">
          <CommunityRules />
        </div>
      </div>
    </div>
  );
};
