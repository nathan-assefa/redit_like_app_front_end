import { createPost } from "../utils/posts";
import { getCommunitiesForOwnerOrMembers } from "../utils/communities";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import PostForm from "../services/PostForm";
import AuthToken from "../utils/AuthToken";
import jwt_decode from "jwt-decode";
import { Community } from "../types";
import { useState } from "react";
import OptionIcon from "../icons/OptionIcon";
import { useNavigate } from "react-router-dom";

interface PostFormData {
  title: string;
  content: string;
}

const CreatePost = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const accessToken = AuthToken();

  const decodedToken: { user_id: string | null } = jwt_decode(accessToken);
  const userId = decodedToken.user_id;

  const { data: communities } = useQuery<Community[]>(
    ["community"],
    () => getCommunitiesForOwnerOrMembers(userId),
    { initialData: [] }
  );

  const createPostMutation = useMutation(
    (formData: PostFormData) => {
      return createPost(
        selectedCommunityId.toString(),
        formData.title,
        formData.content
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["post"]);
      },
    }
  );

  const handlePostSubmit = async (formData: PostFormData) => {
    try {
      if (!selectedCommunityId) {
        setErrorMessage("Please select a community before creating the post.");
        return Promise.reject("invalid credentials");
      }
      setErrorMessage("");
      await createPostMutation.mutateAsync(formData);
      navigate("/posts");
    } catch (error) {
      console.error("Error creating a post:", error);
    }
  };

  const [selectedCommunityId, setSelectedCommunityId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <div>
      <div className="option-area">
        <select
          className="select"
          value={selectedCommunityId}
          onChange={(e) => setSelectedCommunityId(e.target.value)}
        >
          <option value="">Select a community</option>
          {communities.map((community) => (
            <option key={community.id} value={community.id}>
              {community.name}
            </option>
          ))}
        </select>
        <div className="select-icon">
          <OptionIcon />
        </div>
      </div>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <PostForm
        isLoading={createPostMutation.isLoading}
        isError={createPostMutation.isError}
        autoFocus={true}
        onSubmit={(formData) => handlePostSubmit(formData)}
      />
    </div>
  );
};

export default CreatePost;
