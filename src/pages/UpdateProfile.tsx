import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import ProfileForm from "../services/ProfileForm";
import useProfile from "../components/useProfile";
import axios from "axios";
import AuthToken from "../utils/AuthToken";
import { useAuth } from "../contexts/AuthContext";
import { usePostList } from "../contexts/PostListContext";
import jwt_decode from "jwt-decode";
import DateIcon from "../icons/DateIcon";
import UserCommunities from "../services/UserCommunity";
import SinglePostInCommunity from "../services/SinglePostInCommunity";
import { useState } from "react";

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
});

const UpdateProfile = () => {
  const { profile, isLoading, isError } = useProfile();
  let { username } = useAuth();
  const { post } = usePostList();
  const accessToken = AuthToken();

  const [isEditing, setIsEditing] = useState(false);

  const queryClient = useQueryClient();

  const decodedToken: { user_id: string | null } = jwt_decode(accessToken);
  const userId = decodedToken.user_id;

  const filteredPosts = post.filter((p) => p.author.id === userId);
  const postsUserParticipates = post.filter((post) =>
    post.community.members.some((member) => member.id === userId)
  );

  interface UpdatedProfile {
    bio?: string;
    website?: string;
    location?: string;
    birthdate?: string;
    phone_number?: string;
  }
  const apiUrl: string = "http://localhost:8000/api";

  const updateProfileMutation = useMutation(
    async (updatedPost: UpdatedProfile) => {
      const { bio, website, location, birthdate, phone_number } = updatedPost;
      const url = `${apiUrl}/update-profile/`;
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(accessToken),
      };
      const data = { bio, website, location, birthdate, phone_number };

      try {
        const response = await axios.patch(url, data, { headers });
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["profile"]);
      },
    }
  );

  const onProfileUpdate = async (formData: {
    bio: string;
    website: string;
    location: string;
    birthdate: string;
    phone_number: string;
  }): Promise<void> => {
    try {
      await updateProfileMutation.mutateAsync({
        bio: formData.bio,
        website: formData.website,
        location: formData.location,
        birthdate: formData.birthdate,
        phone_number: formData.phone_number,
      });
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (isError) {
    return <div>Can't fetch user profile</div>;
  }

  return (
    <div className="all-about-user">
      <div className="profile-wrapper">
        <div></div>
        <div className="profile-left-column">
          <div className="user-c-lists">
            <UserCommunities userName={username!} />
          </div>
        </div>
        <div className="middle-part">
          <div className="p-header">
            <div className="profile-picture pro-picture pro-top"></div>
            <div className="user-name">{username ? username : ""}</div>
            <div className="follow-info">
              <div className="follow followers">
                <span>{profile?.followers_count}</span> followers
              </div>
              <span className="divider"> . </span>
              <div className="follow following">
                <span>{profile?.following_count}</span> following
              </div>
            </div>
          </div>
          <h3 className=" more-info user-bio-title">Bio</h3>
          <p className="more-info u-bio">
            {profile?.bio ? profile?.bio : "No Bio yet"}
          </p>
          <button
            onClick={() => setIsEditing((prev) => !prev)}
            className="edit-user-profile"
          >
            Edit Profile
          </button>
          {isEditing && (
            <ProfileForm
              isLoading={updateProfileMutation.isLoading}
              isError={updateProfileMutation.isError}
              autoFocus={true}
              onSubmit={onProfileUpdate}
              initialValue={{
                bio: profile?.bio || "",
                website: profile?.website || "",
                location: profile?.location || "",
                birthdate: profile?.birthdate || "",
                phone_number: profile?.phone_number || "",
              }}
            />
          )}
          <h3 className="more-info user-participation">
            See what your communities are discussing.
          </h3>

          <div className="posts-list">
            {postsUserParticipates.map((p) => (
              <div className="single-post user-single-post" key={p.id}>
                <SinglePostInCommunity post={p} />
              </div>
            ))}
          </div>
        </div>
        <div className="profile-right-column">
          <div className="recent-articles">{`${profile?.user.first_name}'s Recent Articles`}</div>
          {filteredPosts.length > 0 ? (
            filteredPosts.slice(0, 6).map((post) => (
              <Link
                to={`/posts/${post.id}`}
                className="filtered-post single-post"
                key={post.id}
              >
                <div className="profile-picture pro-picture"></div>
                <div className="user-posts">
                  <p className="p-u-name">@{post.author.first_name}</p>
                  <div className="c-date-info p-c-date">
                    <div className="date-icon">
                      <DateIcon />
                    </div>
                    <span className="date">
                      {dateFormatter.format(Date.parse(post?.created_at))}
                    </span>
                  </div>
                  <p className="p-c-title">
                    {post.title.length >= 40
                      ? post.title.slice(0, 40) + "..."
                      : post.title}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p className="no-post">
              There are currently no posts from this user.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
