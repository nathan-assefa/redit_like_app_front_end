import { Profile } from "../types";
import fetchData from "./makeRequest";
import AuthToken from "./AuthToken";

const url: string = "http://localhost:8000/api";
const accessToken: string = AuthToken();

export function getUserProfile(): Promise<Profile | undefined> {
  return fetchData(`${url}/profile/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + String(accessToken),
    },
  });
}

export function getAllProfiles(): Promise<Profile[]> {
  return fetchData(`${url}/profiles/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + String(accessToken),
    },
  });
}

type FollowUserStatus = { message: string; following: boolean };

export function followOrUnfollow(userId: string): Promise<FollowUserStatus> {
  return fetchData(`${url}/toggle-follow/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + String(accessToken),
    },
  });
}

type FollowStatus = { is_following: boolean };

export function followStatus(userId: string): Promise<FollowStatus> {
  return fetchData(`${url}/follow-state/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + String(accessToken),
    },
  });
}
