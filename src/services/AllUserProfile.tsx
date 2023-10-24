import { useQuery } from "@tanstack/react-query";
import { getAllProfiles } from "../utils/userProfile";
import { Profile } from "../types";
import FollowOrUnfollowUser from "./FollowOrUnfollow";
import { Link } from "react-router-dom";
// import JoinOrLeaveCommunity from "./JoinOrLeaveCommunity";

const AllUsersProfile = () => {
  const {
    data: allProfiles,
    isLoading,
    isError,
  } = useQuery<Profile[]>(["all_profiles"], () => getAllProfiles(), {
    initialData: [],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Can't fetch</div>;
  }

  return (
    <div className="top-community-list all-participants">
      <div className="participants"></div>
      <div className="t-names">
        <h3 className="follow-participants">
          Follow interesting community members now!
        </h3>
        {allProfiles.slice(0, 6).map((profile) => (
          <div className="top-community-name" key={profile.id}>
            <div className="participants-wrapper">
              <Link to="#" className="participants-picture"></Link>
              <div className="participants-info">
                <Link to="#">
                  <p className="participat-name">@{profile.user.first_name}</p>
                </Link>
                <p className="members-count">
                  {profile.followers_count}
                  <span> followers</span>
                </p>
              </div>
            </div>
            <FollowOrUnfollowUser userId={profile.id.toString()} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllUsersProfile;