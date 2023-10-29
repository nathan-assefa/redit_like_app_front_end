import { useQuery } from "@tanstack/react-query";
import { getAllProfiles } from "../utils/userProfile";
import { Profile } from "../types";
import FollowOrUnfollowUser from "./FollowOrUnfollow";
import { Link } from "react-router-dom";

interface ModelData {
  onClose: () => void;
}

const AllUsersProfile: React.FC<ModelData> = ({ onClose }) => {
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
    <div className="all-user">
      <div className="t-names">
        {allProfiles.map((profile) => (
          <div className="top-community-name" key={profile.id}>
            <div className="participants-wrapper">
              <Link
                onClick={onClose}
                to={`/user_profile/${profile.id}`}
                style={
                  profile?.profile_picture
                    ? { backgroundImage: `url(${profile.profile_picture})` }
                    : {}
                }
                className="participants-picture"
              ></Link>
              <div onClick={onClose} className="participants-info">
                <Link to={`/user_profile/${profile.id}`}>
                  <p className="participat-name">@{profile.user.first_name}</p>
                </Link>
                <p className="members-count">
                  {profile.followers_count}
                  <span> followers</span>
                </p>
              </div>
            </div>
            <div className="fol-unfol">
              <FollowOrUnfollowUser userId={profile.id.toString()} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllUsersProfile;
