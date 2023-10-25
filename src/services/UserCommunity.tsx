import { useQuery } from "@tanstack/react-query";
import { getCommunities } from "../utils/communities";
import { Community } from "../types";
import JoinOrLeaveCommunity from "./JoinOrLeaveCommunity";

const UserCommunities = ({ userName }: { userName: string }) => {
  const {
    data: topCommunity,
    isLoading,
    isError,
  } = useQuery<Community[]>(["top_communities"], () => getCommunities(), {
    initialData: [],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Can't fetch</div>;
  }

  return (
    <div className="top-community-list user-community-list">
      <div className="user-community-picture"></div>
      <div className="t-names">
        <h3 className="join-user-community">
          {`The communities ${userName} is part of.`}
        </h3>
        {topCommunity.slice(0, 8).map((community) => (
          <div
            className="top-community-name user-communities"
            key={community.id}
          >
            <div className="com-content">
              <p className="user-c-name">{community.name}</p>
              <p className="members-count">
                {community.member_count}
                <span> members</span>
              </p>
            </div>
            <div className="user-c-join">
              <JoinOrLeaveCommunity communityId={community.id.toString()} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserCommunities;
