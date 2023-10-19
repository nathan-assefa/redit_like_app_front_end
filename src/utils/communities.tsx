import { Community } from "../types";
import fetchData from "./makeRequest";
import AuthToken from "./AuthToken";

const url: string = "http://localhost:8000/api";
const accessToken: string = AuthToken();

export function getCommunities(): Promise<Community[]> {
  return fetchData(`${url}/communities`);
}

export function getCommunity(id: string): Promise<Community> {
  return fetchData(`${url}/communities/${id}`);
}

export function createCommunity(
  name: string,
  description?: string
): Promise<Community[]> {
  return fetchData(`${url}/communities/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + String(accessToken),
    },
    data: { name, description },
  });
}

export function getCommunitiesForOwnerOrMembers(
  userId: string | null
): Promise<Community[]> {
  return fetchData(`${url}/communities/${userId}/list/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + String(accessToken),
    },
  });
}

export function getTopCommunities(): Promise<Community[]> {
  return fetchData(`${url}/top-communities/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + String(accessToken),
    },
  });
}

type CommunityMembership = {
  member: boolean;
};

export function joinOrLeaveCommunity(
  communityId: string
): Promise<CommunityMembership> {
  return fetchData(`${url}/join_or_leave_community/${communityId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + String(accessToken),
    },
  });
}

export function getMembershipStatus(
  communityId: string
): Promise<CommunityMembership> {
  return fetchData(`${url}/get_membership_status/${communityId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + String(accessToken),
    },
  });
}
