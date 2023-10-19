import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  joinOrLeaveCommunity,
  getMembershipStatus,
} from "../utils/communities";
import { useState, useEffect } from "react";

const JoinOrLeaveCommunity = ({ communityId }: { communityId: string }) => {
  interface MembershipStatus {
    member: boolean;
  }

  const { data: membership_status, status } = useQuery<MembershipStatus>(
    /*
    here I query and fetch the initial data for each button separately,
    so each button initializes its state based on its specific community's
    membership status. 
    */
    ["membership_status", communityId],
    () => getMembershipStatus(communityId)
  );

  const [isMember, setIsMember] = useState(false);

  const queryClient = useQueryClient();

  const JoinOrLeaveCommunityMutation = useMutation(() => {
    return joinOrLeaveCommunity(communityId).then(() => {
      setIsMember((prevIsMember) => !prevIsMember);
      queryClient.invalidateQueries(["top_communities"]);
    });
  });

  const onCommunityJoinOrLeave = async (): Promise<void> => {
    try {
      await JoinOrLeaveCommunityMutation.mutateAsync();
    } catch (error) {
      Promise.reject(error);
    }
  };

  useEffect(() => {
    setIsMember(membership_status?.member || false);
  }, [membership_status]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Can't fetch</div>;
  }

  return (
    <button
      onClick={onCommunityJoinOrLeave}
      className={isMember ? "leave-community" : "join-community"}
    >
      {isMember ? "Leave" : "Join"}
    </button>
  );
};

export default JoinOrLeaveCommunity;
