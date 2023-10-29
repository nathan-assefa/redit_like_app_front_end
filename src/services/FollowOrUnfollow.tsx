import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { followOrUnfollow, followStatus } from "../utils/userProfile";
import { useState, useEffect } from "react";

const FollowOrUnfollowUser = ({ userId }: { userId: string }) => {
  type FollowUserStatus = { is_following: boolean };

  const { data: follow_status, status } = useQuery<FollowUserStatus>(
    ["follow_status", userId],
    () => followStatus(userId)
  );

  const [isFollow, setIsFollow] = useState(false);

  const queryClient = useQueryClient();

  const FollowOrUnfollowMutation = useMutation(() => {
    return followOrUnfollow(userId).then(() => {
      setIsFollow((prevIsFollow) => !prevIsFollow);
      queryClient.invalidateQueries(["all_profiles"]);
      queryClient.invalidateQueries(["profiles"]);
    });
  });

  const onFollowORUnfollow = async (): Promise<void> => {
    try {
      await FollowOrUnfollowMutation.mutateAsync();
    } catch (error) {
      Promise.reject(error);
    }
  };

  useEffect(() => {
    setIsFollow(follow_status?.is_following || false);
  }, [follow_status]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Can't fetch</div>;
  }

  return (
    <button
      onClick={onFollowORUnfollow}
      className={isFollow ? "unfollow-button" : "follow-button"}
    >
      {isFollow ? "Following" : "Follow"}
    </button>
  );
};

export default FollowOrUnfollowUser;
