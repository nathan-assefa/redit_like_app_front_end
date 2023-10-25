import React, { createContext, useContext } from "react";
import { getAllProfiles } from "../utils/userProfile";
import { useQuery } from "@tanstack/react-query";
import { Profile } from "../types";
import { useParams } from "react-router-dom";

const useProfileSource = (): {
  profile: Profile | undefined;
  isLoading: boolean;
  isError: boolean;
} => {
  const { id: profileId } = useParams();

  const {
    data: all_profiles,
    isLoading,
    isError,
  } = useQuery<Profile[]>(["profiles"], () => getAllProfiles(), {
    initialData: [],
  });

  const profile = all_profiles.find((profile) => profile.id === +profileId!);

  return { profile, isLoading, isError };
};

const ProfileContext = createContext<ReturnType<typeof useProfileSource>>(
  {} as ReturnType<typeof useProfileSource>
);

export const useUserProfile = () => {
  return useContext(ProfileContext);
};

export const ProfileProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ProfileContext.Provider value={useProfileSource()}>
      {children}
    </ProfileContext.Provider>
  );
};
