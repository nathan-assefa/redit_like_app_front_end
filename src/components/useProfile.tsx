import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../utils/userProfile";
import { Profile } from "../types";

const useProfile = (): {
  profile: Profile | undefined;
  isLoading: boolean;
  isError: boolean;
} => {
  const {
    data: profile,
    isLoading,
    isError,
  } = useQuery<Profile | undefined>(["profile"], () => getUserProfile(), {
    initialData: undefined,
  });

  return { profile, isLoading, isError };
};

export default useProfile;
