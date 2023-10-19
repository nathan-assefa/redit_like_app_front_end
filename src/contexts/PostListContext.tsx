import React, { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { useReducer, useCallback, useMemo } from "react";
import { Post } from "../types";

import { getPosts } from "../utils/posts";

const UsePostSource = (): {
  post: Post[];
  search: string;
  setSearch: (search: string) => void;
} => {
  const { data: post } = useQuery<Post[]>(["post"], () => getPosts(), {
    initialData: [],
  });

  type PostState = {
    search: string;
  };

  type PostAction = { type: "setSearch"; payload: string };

  const reducer = (state: PostState, action: PostAction) => {
    switch (action.type) {
      case "setSearch":
        return { ...state, search: action.payload };
    }
  };

  const setSearch = useCallback((search: string) => {
    dispatch({
      type: "setSearch",
      payload: search,
    });
  }, []);

  const [{ search }, dispatch] = useReducer(reducer, {
    search: "",
  });

  const filteredPost = useMemo(
    () =>
      post
        .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
        .slice(0, 20),
    [post, search]
  );

  // const sortedPost = useMemo(
  //   () =>
  //     [...filteredPost].sort((a, b) =>
  //       a.created_at.localeCompare(b.created_at)
  //     ),
  //   [filteredPost]
  // );

  return {
    post: filteredPost,
    search,
    setSearch,
  };
};

const PostContext = createContext<ReturnType<typeof UsePostSource>>(
  {} as ReturnType<typeof UsePostSource>
);

export const usePostList = () => {
  return useContext(PostContext);
};

export const PostListProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <PostContext.Provider value={UsePostSource()}>
      {children}
    </PostContext.Provider>
  );
};
