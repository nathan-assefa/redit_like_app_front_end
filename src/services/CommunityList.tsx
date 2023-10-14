import { Link } from "react-router-dom";
import { getCommunities } from "../utils/communities";
import { Community } from "../types";
import { useQuery } from "@tanstack/react-query";

export const CommunityList = () => {
  const {
    data: community,
    isLoading,
    isError,
  } = useQuery<Community[]>(["community"], () => getCommunities(), {
    initialData: [],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading communities.</div>;
  }

  return (
    <div>
      {community.map((c) => (
        <Link to={`/communities/${c.id}`} key={c.id}>
          <div>{c.name}</div>
          <div>{c.description}</div>
          <hr />
        </Link>
      ))}
    </div>
  );
};
