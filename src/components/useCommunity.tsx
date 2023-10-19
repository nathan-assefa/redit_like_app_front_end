import { getCommunities, getTopCommunities } from "../utils/communities";
import { useQuery } from "@tanstack/react-query";
import { Community } from "../types";

const useCommunity = () => {
  const { data: allCommunitis } = useQuery<Community[]>(
    ["community"],
    () => getCommunities(),
    { initialData: [] }
  );

  const { data: topCommunity } = useQuery<Community[]>(
    ["top_community"],
    () => getTopCommunities(),
    { initialData: [] }
  );

  return { allCommunitis, topCommunity };
};

export default useCommunity;
