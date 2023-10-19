import { Post } from "../types";
import fetchData from "./makeRequest";
import AuthToken from "./AuthToken";

const url: string = "http://localhost:8000/api";
const accessToken: string = AuthToken();

export function getPosts(): Promise<Post[]> {
  return fetchData(`${url}/posts/`);
}

export function getPostsOfCommunity(communityId: string): Promise<Post[]> {
  return fetchData(`${url}/communities/${communityId}/posts`);
}

export function getPost(id: string): Promise<Post> {
  return fetchData(`${url}/posts/${id}`);
}

export function createPost(
  communityId: string | undefined,
  title: string,
  content: string
): Promise<Post> {
  return fetchData(`${url}/communities/${communityId}/posts/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + String(accessToken),
    },
    data: { content, title },
  });
}

export function updatePost(
  postId: string,
  title?: string | undefined,
  content?: string | undefined
): Promise<Post> {
  return fetchData(`${url}/posts/${postId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + String(accessToken),
    },
    data: { content, title },
  });
}

export function deletePost(postId: string): Promise<string> {
  return fetchData(`${url}/posts/${postId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + String(accessToken),
    },
  });
}

export interface UpvoteResponse {
  upvoted: boolean;
}

export function upvotePost(postId: string): Promise<UpvoteResponse> {
  return fetchData(`${url}/upvote_posts/${postId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + String(accessToken),
    },
  });
}

export interface DownvoteResponse {
  downvoted: boolean;
}

export function downvotePost(postId: string): Promise<DownvoteResponse> {
  return fetchData(`${url}/downvote_posts/${postId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + String(accessToken),
    },
  });
}

export interface LoveResponse {
  loved: boolean;
}

export function lovePost(postId: string): Promise<LoveResponse> {
  return fetchData(`${url}/love_posts/${postId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + String(accessToken),
    },
  });
}

export interface LikeResponse {
  liked: boolean;
}

export function likePost(postId: string): Promise<LikeResponse> {
  return fetchData(`${url}/like_posts/${postId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + String(accessToken),
    },
  });
}
