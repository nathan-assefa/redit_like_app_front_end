import { Community } from "../types";
import JoinOrLeaveCommunity from "./JoinOrLeaveCommunity";
import DateIcon from "../icons/DateIcon";

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
});

const CommunityDetail = ({ community }: { community: Community }) => {
  return (
    <div>
      <div className="community-detail top-community-list">
        <div className="community-3"></div>
        <div
          className="top-community-name c-name-and-button"
          key={community.id}
        >
          <div className="co-name">
            <p>{community.name}</p>
            <p className="members-count">
              {community.member_count}
              <span> members</span>
            </p>
          </div>
          <JoinOrLeaveCommunity communityId={community?.id.toString()!} />
        </div>
        <p className="asking-membership">
          Already a member? Engage and contribute in our community. Not joined
          yet? Join now!"
        </p>
        <div className="c-date-info">
          <div className="date-icon">
            <DateIcon />
          </div>
          <span className="date">
            Created {dateFormatter.format(Date.parse(community?.created_at))}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CommunityDetail;
