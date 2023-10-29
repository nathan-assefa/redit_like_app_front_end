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

export async function updatePost(
  postId: string,
  title?: string | undefined,
  content?: string | undefined
): Promise<Post> {
  try {
    const response = await fetchData<Post>(`${url}/posts/${postId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(accessToken),
      },
      data: { content, title },
    });
    return response;
  } catch (error) {
    throw error;
  }
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

/* for updating a post */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface UpdatedPost {
  id: string;
  title?: string;
  content?: string;
}

const apiUrl: string = "http://localhost:8000/api";

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  const accessToken = AuthToken();

  const updatePostMutation = useMutation(
    async (updatedPost: UpdatedPost) => {
      const { id, title, content } = updatedPost;
      const url = `${apiUrl}/posts/${id}`;
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(accessToken),
      };
      const data = { content, title };

      try {
        const response = await axios.patch(url, data, { headers });
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["post"]);
      },
    }
  );

  const onPostUpdate = async (
    post: UpdatedPost,
    formData: { title: string; content: string }
  ) => {
    try {
      await updatePostMutation.mutateAsync({
        id: post.id,
        title: formData.title,
        content: formData.content,
      });
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return { onPostUpdate, updatePostMutation };
};
