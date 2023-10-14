import React, { createContext, useContext } from "react";
import { getCommunities } from "../utils/communities";
import { useQuery } from "@tanstack/react-query";
import { Community } from "../types";
import { useParams } from "react-router-dom";

const useCommunitySource = (): {
  community: Community | undefined;
} => {
  const { id: communityId } = useParams();

  const { data: communities } = useQuery<Community[]>(
    ["community"],
    () => getCommunities(),
    { initialData: [] }
  );

  const community = communities.find(
    (community) => community.id === +communityId!
  );

  return { community };
};

const CommunityContext = createContext<ReturnType<typeof useCommunitySource>>(
  {} as ReturnType<typeof useCommunitySource>
);

export const useCommunity = () => {
  return useContext(CommunityContext);
};

export const CommunityProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <CommunityContext.Provider value={useCommunitySource()}>
      {children}
    </CommunityContext.Provider>
  );
};
