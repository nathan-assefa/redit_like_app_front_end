import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../utils/userProfile";
import { Profile } from "../types";

const UserProfile = () => {
  const {
    data: profile,
    isLoading,
    isError,
  } = useQuery<Profile | undefined>(["profile"], () => getUserProfile(), {
    initialData: undefined,
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Can't fetch your profile</div>;
  }

  return (
    <div>
      <div className="user-profile-wrapper">
        {profile?.unread_notifications_count}
      </div>
    </div>
  );
};

export default UserProfile;
