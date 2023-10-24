import React, { createContext, useContext } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import UseNestedComments from "../utils/NestedComment";
import { Post, Comment } from "../types";

import { getPosts } from "../utils/posts";

const UsePostSource = (): {
  post: Post | undefined;
  postId: string | undefined;
  rootComments: Comment[];
  getReplies: (parentId: string) => Comment[];
} => {
  const { id: postId } = useParams();

  const { data: post } = useQuery<Post[]>(["post"], () => getPosts(), {
    initialData: [],
  });

  const postData = post?.find((p) => p.id === +postId!);
  const commentByParentId = postData ? UseNestedComments(postData) : {};

  const getReplies = (parentId: string) => {
    return commentByParentId[parentId];
  };

  return {
    post: postData,
    postId,
    rootComments: commentByParentId["parent"] || [],
    getReplies,
  };
};

const PostContext = createContext<ReturnType<typeof UsePostSource>>(
  {} as ReturnType<typeof UsePostSource>
);

export const usePost = () => {
  return useContext(PostContext);
};

export const PostProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <PostContext.Provider value={UsePostSource()}>
      {children}
    </PostContext.Provider>
  );
};
