import { useQuery } from "@tanstack/react-query";
import { getTopCommunities } from "../utils/communities";
import { Community } from "../types";
import JoinOrLeaveCommunity from "./JoinOrLeaveCommunity";
import { Link } from "react-router-dom";

const TopCommunities = () => {
  const {
    data: topCommunity,
    isLoading,
    isError,
  } = useQuery<Community[]>(["top_communities"], () => getTopCommunities(), {
    initialData: [],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Can't fetch</div>;
  }

  return (
    <div className="top-community-list">
      <div className="community-2"></div>
      <div className="t-names">
        <h3 className="join-top-community">Join our top communities today!</h3>
        {topCommunity.slice(0, 6).map((community) => (
          <div className="top-community-name" key={community.id}>
            <div>
              <Link to={`/communities/${community.id}`}>
                <p className="c-d-name">{community.name}</p>
              </Link>
              <p className="members-count">
                {community.member_count}
                <span> members</span>
              </p>
            </div>
            <JoinOrLeaveCommunity communityId={community.id.toString()} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCommunities;
