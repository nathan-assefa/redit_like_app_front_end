import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import ProfileForm from "../services/ProfileForm";
import useProfile from "../hooks/useProfile";
import axios from "axios";
import AuthToken from "../utils/AuthToken";
import { useAuth } from "../contexts/AuthContext";
import { usePostList } from "../contexts/PostListContext";
import jwt_decode from "jwt-decode";
import DateIcon from "../icons/DateIcon";
import UserCommunities from "../services/UserCommunity";
import SinglePostInCommunity from "../services/SinglePostInCommunity";
import { useState } from "react";
import BookMarks from "../services/BookMarks";

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
});

const UpdateProfile = () => {
  const { profile, isLoading, isError } = useProfile();
  let { username } = useAuth();
  const { post } = usePostList();
  const accessToken = AuthToken();

  const [isEditing, setIsEditing] = useState(false);
  const [seeProfileDetail, setSeeProfileDtail] = useState(false);

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
    phone_number?: string;
    profile_picture?: File | null;
  }

  const apiUrl: string = "http://localhost:8000/api";

  const updateProfileMutation = useMutation(
    async (updatedPost: UpdatedProfile) => {
      const { bio, website, location, phone_number, profile_picture } =
        updatedPost;
      const url = `${apiUrl}/update-profile/`;
      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + String(accessToken),
      };
      const data = {
        bio: bio || "",
        website: website || "",
        location: location || "",
        phone_number: phone_number || "",
        profile_picture: profile_picture || null,
      };

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
    phone_number: string;
    profile_picture: File | null;
  }): Promise<void> => {
    try {
      const updatedData: any = {
        bio: formData.bio,
        website: formData.website,
        location: formData.location,
        phone_number: formData.phone_number,
      };

      // If a new profile_picture was selected, add it to the updatedData
      if (formData.profile_picture) {
        updatedData.profile_picture = formData.profile_picture;
      }

      await updateProfileMutation.mutateAsync(updatedData);
      setIsEditing((prev) => !prev);
    } catch (error) {
      Promise.reject(error);
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
            <div className="user-bookmarks">
              {profile?.bookmarks ? (
                <BookMarks bookMarks={profile?.bookmarks} />
              ) : (
                <p>No bookmarks available.</p>
              )}
            </div>
          </div>
        </div>
        <div className="middle-part">
          <div className="p-header">
            <div
              style={{
                backgroundImage: `url(${profile?.profile_picture})`,
              }}
              className="profile-picture pro-picture pro-top"
            ></div>

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
          <button
            className="see-user-info"
            onClick={() => setSeeProfileDtail((prev) => !prev)}
          >
            See more about yourself
          </button>
          {seeProfileDetail && (
            <div className="user-pro-related-info">
              <h3 className=" more-info user-profile-info user-bio-title">
                Bio
              </h3>
              <p className="more-info user-p-con u-bio">
                {profile?.bio ? profile?.bio : "No Bio yet"}
              </p>
              <h3 className=" more-info user-profile-info user-bio-title">
                Website
              </h3>
              <p className="more-info user-p-con u-bio">
                {profile?.website
                  ? profile?.website
                  : "Social media data not provided."}
              </p>
              <h3 className=" more-info user-profile-info user-bio-title">
                Location
              </h3>
              <p className="more-info user-p-con u-bio">
                {profile?.location
                  ? profile?.location
                  : "Location details not yet provided."}
              </p>
              <h3 className=" more-info user-profile-info user-bio-title">
                Phone Number
              </h3>
              <p className="more-info user-p-con u-bio">
                {profile?.phone_number
                  ? profile?.phone_number
                  : "No phone number information available."}
              </p>
            </div>
          )}
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
                phone_number: profile?.phone_number || "",
                profile_picture: null,
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

/*
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import ProfileForm from "../services/ProfileForm";
import useProfile from "../hooks/useProfile";
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
  const [seeProfileDetail, setSeeProfileDtail] = useState(false);

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
    phone_number?: string;
  }
  const apiUrl: string = "http://localhost:8000/api";

  const updateProfileMutation = useMutation(
    async (updatedPost: UpdatedProfile) => {
      const { bio, website, location, phone_number } = updatedPost;
      const url = `${apiUrl}/update-profile/`;
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(accessToken),
      };
      const data = { bio, website, location, phone_number };

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
    phone_number: string;
  }): Promise<void> => {
    try {
      await updateProfileMutation.mutateAsync({
        bio: formData.bio,
        website: formData.website,
        location: formData.location,
        phone_number: formData.phone_number,
      });
      setIsEditing((prev) => !prev);
    } catch (error) {
      Promise.reject(error);
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
          <button
            className="see-user-info"
            onClick={() => setSeeProfileDtail((prev) => !prev)}
          >
            See more about yourself
          </button>
          {seeProfileDetail && (
            <div className="user-pro-related-info">
              <h3 className=" more-info user-profile-info user-bio-title">
                Bio
              </h3>
              <p className="more-info user-p-con u-bio">
                {profile?.bio ? profile?.bio : "No Bio yet"}
              </p>
              <h3 className=" more-info user-profile-info user-bio-title">
                Website
              </h3>
              <p className="more-info user-p-con u-bio">
                {profile?.website
                  ? profile?.website
                  : "Social media data not provided."}
              </p>
              <h3 className=" more-info user-profile-info user-bio-title">
                Location
              </h3>
              <p className="more-info user-p-con u-bio">
                {profile?.location
                  ? profile?.location
                  : "Location details not yet provided."}
              </p>
              <h3 className=" more-info user-profile-info user-bio-title">
                Phone Number
              </h3>
              <p className="more-info user-p-con u-bio">
                {profile?.phone_number
                  ? profile?.phone_number
                  : "No phone number information available."}
              </p>
            </div>
          )}
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


*/
