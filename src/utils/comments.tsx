import { Comment } from "../types";
import fetchData from "./makeRequest";
import AuthToken from "./AuthToken";

const url: string = "http://localhost:8000/api";
const accessToken: string = AuthToken();

export function createComment(
  postId: string | undefined,
  content: string,
  parent_comment?: string | undefined
): Promise<Comment[]> {
  return fetchData(`${url}/posts/${postId}/comments/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + String(accessToken),
    },
    data: { content, parent_comment },
  });
}

export function updateComment(
  content: string,
  commentId: string
): Promise<Comment[]> {
  return fetchData(`${url}/comments/${commentId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + String(accessToken),
    },
    data: { content },
  });
}

export function deleteComment(commentId: string): Promise<string> {
  return fetchData(`${url}/comments/${commentId}`, {
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

export function upvoteComment(commentId: string): Promise<UpvoteResponse> {
  return fetchData(`${url}/upvote_comments/${commentId}`, {
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

export function downvoteComment(commentId: string): Promise<DownvoteResponse> {
  return fetchData(`${url}/downvote_comments/${commentId}`, {
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

export function loveComment(commentId: string): Promise<LoveResponse> {
  return fetchData(`${url}/love_comments/${commentId}`, {
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

export function likeComment(commentId: string): Promise<LikeResponse> {
  return fetchData(`${url}/like_comments/${commentId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + String(accessToken),
    },
  });
}
