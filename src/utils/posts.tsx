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
