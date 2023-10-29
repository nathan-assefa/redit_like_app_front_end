import { Link } from "react-router-dom";
import { usePostList } from "../contexts/PostListContext";
import DateIcon from "../icons/DateIcon";
import UserCommunities from "../services/UserCommunity";
import SinglePostInCommunity from "../services/SinglePostInCommunity";
import { useUserProfile } from "../contexts/UserProfileContext";
import FollowOrUnfollowUser from "./FollowOrUnfollow";
import MessageIcon from "../icons/MessageIcon";
import BookMarks from "./BookMarks";
import { useState } from "react";

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
});

const UserProfile = () => {
  const { post } = usePostList();
  const { profile, isLoading, isError } = useUserProfile();
  const [seeProfileDetail, setSeeProfileDtail] = useState(false);

  const filteredPosts = post.filter((p) => p.author.id === profile?.user.id);
  const postsUserParticipates = post.filter((post) =>
    post.community.members.some((member) => member.id === profile?.user.id)
  );

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
            <UserCommunities userName={profile?.user.first_name!} />
          </div>
        </div>
        <div className="middle-part">
          <div className="p-header">
            <div
              className="profile-picuture"
              style={
                profile?.profile_picture
                  ? { backgroundImage: `url(${profile.profile_picture})` }
                  : {}
              }
            ></div>
            <div className="user-name">{profile?.user.first_name}</div>
            <div className="follow-info">
              <div className="follow followers">
                <span>{profile?.followers_count}</span> followers
              </div>
              <span className="divider"> . </span>
              <div className="follow following">
                <span>{profile?.following_count}</span> following
              </div>
            </div>
            <div className="fol-msg">
              <div className="fol-btn">
                <FollowOrUnfollowUser userId={profile?.id.toString()!} />
              </div>
              <Link
                to={`/messages/${profile?.user.id}`}
                className="messaging-icon"
              >
                <MessageIcon />
              </Link>
            </div>
          </div>
          <button
            className="see-user-info"
            onClick={() => setSeeProfileDtail((prev) => !prev)}
          >
            See more about {profile?.user.first_name}
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
          <h3 className="more-info user-participation">
            {`See what ${profile?.user.first_name}'s communities are discussing.`}
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

export default UserProfile;
