import { useCommunity } from "../contexts/CommunityContext";
import PostsInCommunity from "./PostsListInCommunity";
import TopCommunities from "./TopCommunities";
import CommunityRules from "./CommunityRules";
import JoinOrLeaveCommunity from "./JoinOrLeaveCommunity";

export const Community = () => {
  const { community } = useCommunity();
  return (
    <div className="community-detail-wrapper">
      <div className="community-detail">
        <h1 className="c-name">{community?.name}</h1>
        <p className="no-of-members">
          community membership: {community?.member_count} members
        </p>
        <div className="c-join">
          <JoinOrLeaveCommunity communityId={community?.id?.toString()!} />
        </div>
        <p className="c-desctiption">
          <span>Description: </span>
          {community?.description}
        </p>
        <h3>Posts</h3>
        <div>
          {community?.posts != null && community?.posts.length > 0 && (
            <PostsInCommunity posts={community?.posts} />
          )}
        </div>
      </div>
      <div className="top-c-lists">
        <TopCommunities />
        <CommunityRules />
      </div>
    </div>
  );
};
