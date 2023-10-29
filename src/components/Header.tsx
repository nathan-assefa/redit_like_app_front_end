import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { usePostList } from "../contexts/PostListContext";
import HomeIcon from "../icons/HomeIcon";
import OptionIcon from "../icons/OptionIcon";
import ProfileListIcon from "../icons/ProfileListIcon";
import Magnifier from "../icons/Magnifier";
import CreatePost from "../icons/CreatePost";
import GroupIcon from "../icons/GroupIcon";
import { AiOutlineBell } from "react-icons/ai";
import { AiOutlineMessage } from "react-icons/ai";
import IconBtn from "../IconButtons/HeaderIconBtn";
import { getUserProfile } from "../utils/userProfile";
import { Profile } from "../types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useCommunity from "../hooks/useCommunity";
import RecentMessages from "../services/RecentMessages";
import AllUserProfile from "../services/AllUserProfiles";

import Modal from "../components/Modal";

import { ClearNotificationCount } from "../utils/notifications";
import { ClearMessageCount } from "../utils/messages";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Header = () => {
  const [clearNotification, setClearNotification] = useState(false);
  const [clearMessage, setClearMessage] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);

  const queryClient = useQueryClient();

  const clearMessageCountMutation = useMutation(() => {
    return ClearMessageCount().then(() => setClearMessage((prev) => !prev));
  });

  const onClearMessageCount = async (): Promise<void> => {
    try {
      await clearMessageCountMutation.mutateAsync();
      queryClient.invalidateQueries(["profile"]);
    } catch (error) {
      Promise.reject(error);
    }
  };

  const clearNotificationCountMutation = useMutation(() => {
    return ClearNotificationCount().then(() =>
      setClearNotification((prev) => !prev)
    );
  });

  const onClearNotificationCount = async (): Promise<void> => {
    try {
      await clearNotificationCountMutation.mutateAsync();
      queryClient.invalidateQueries(["profile"]);
    } catch (error) {
      Promise.reject(error);
    }
  };

  const { data: profile } = useQuery<Profile | undefined>(
    ["profile"],
    () => getUserProfile(),
    {
      initialData: undefined,
    }
  );

  const { allCommunitis, topCommunity } = useCommunity();

  const { username, logOutUser } = useAuth();
  const [homeOption, setHomeOption] = useState(false);
  const [popular, setPopular] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { search, setSearch } = usePostList();

  return (
    <>
      <header>
        {username && (
          <div className="user-auth">
            <div className="profile-info">
              {username && <p>@{username}</p>}
              {profileMenu &&
                (username ? (
                  <div className="user-setting">
                    <Link
                      onClick={() => setProfileMenu(false)}
                      to="/update_profile"
                    >
                      <p>Profile</p>
                    </Link>
                    <Link
                      onClick={() => setProfileMenu(false)}
                      to="/create_community"
                    >
                      <p>Create Community</p>
                    </Link>
                    <Link
                      onClick={() => setProfileMenu(false)}
                      to="/create_post"
                    >
                      <p>Create Post</p>
                    </Link>
                    <p className="logout" onClick={logOutUser}>
                      Logout
                    </p>
                  </div>
                ) : (
                  <Link className="login" to="/login">
                    Login
                  </Link>
                ))}
            </div>
            <div></div>
            <Link to="update_profile">
              <div
                style={{
                  backgroundImage: `url(${profile?.profile_picture})`,
                }}
                className="profile-picuture"
              ></div>
            </Link>
            <div className="option-icon pf-op-icon">
              <p onClick={() => setProfileMenu((prev) => !prev)}>
                <ProfileListIcon />
              </p>
            </div>
          </div>
        )}
        {homeOption && (
          <div className="home-drop-down">
            <p className="your-communities">Your communities</p>
            <Link
              to="/create_community"
              onClick={() => setHomeOption((prev) => !prev)}
            >
              <p className="create-community">
                <div className="plus">+</div>Create community
              </p>
            </Link>
            <div className="all-communities">
              {allCommunitis.map((community) => (
                <div key={community.id}>
                  <Link
                    to={`/communities/${community.id}`}
                    className="community"
                    onClick={() => setHomeOption((prev) => !prev)}
                  >
                    {community.name}
                  </Link>
                </div>
              ))}
            </div>
            <div className="feeds">
              <p className="feed">feeds</p>
              <div
                onClick={() => setHomeOption((prev) => !prev)}
                className="homie"
              >
                <div className="home-menu-icon">
                  <HomeIcon />
                </div>
                <Link to="/posts">
                  <p className="home">Home</p>
                </Link>
              </div>
              <p
                onClick={() => setPopular((prev) => !prev)}
                className="popular"
              >
                Popular
              </p>
              {popular && (
                <div className="popular-community">
                  {topCommunity.map((community) => (
                    <div key={community.id}>
                      <Link
                        to={`/communities/${community.id}`}
                        className="community"
                        onClick={() => setHomeOption((prev) => !prev)}
                      >
                        {community.name}
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
        <div className="container">
          <Link to="/posts" className="logo">
            Opinion<span>Sphere</span>
          </Link>
          {username && (
            <div className="home-menu">
              <div className="home-menu-icon">
                <HomeIcon />
              </div>
              <Link to="/posts">
                <p className="home">Home</p>
              </Link>

              <div className="option-icon">
                <p onClick={() => setHomeOption((prev) => !prev)}>
                  <OptionIcon />
                </p>
              </div>
            </div>
          )}
          {username && (
            <div className="search-header">
              <div className="magnifier">
                <Magnifier />
              </div>
              <input
                className="search"
                placeholder="Search Posts by Title"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          )}
          {username && (
            <div className="header-icons">
              <div className="icon-wrapper">
                <div className="icon create-post-icon">
                  <Link to="create_post">
                    <CreatePost />
                  </Link>
                </div>
              </div>
              <div className="icon-wrapper">
                <Link to="notifications">
                  <div className="icon notification-icon">
                    <IconBtn
                      onClick={onClearNotificationCount}
                      isActive={clearNotification}
                      Icon={AiOutlineBell}
                      aria-label="notification"
                    >
                      {profile?.unread_notifications_count ? (
                        <p>{profile?.unread_notifications_count}</p>
                      ) : (
                        ""
                      )}
                    </IconBtn>
                  </div>
                </Link>
              </div>
              <div
                onClick={() => setShowMessages((prev) => !prev)}
                className="icon-wrapper"
              >
                <div className="icon message-icon">
                  <IconBtn
                    onClick={onClearMessageCount}
                    isActive={clearMessage}
                    Icon={AiOutlineMessage}
                    aria-label="message"
                  >
                    {profile?.unread_messages_count ? (
                      <p>{profile?.unread_messages_count}</p>
                    ) : (
                      ""
                    )}
                  </IconBtn>
                </div>
              </div>
              {showMessages && (
                <div
                  onClick={() => setShowMessages(false)}
                  className="message-notification"
                >
                  <RecentMessages />
                </div>
              )}
              <div onClick={() => setIsOpen(true)} className="icon-wrapper">
                <div className="icon setting-icon">
                  <GroupIcon />
                </div>
              </div>
              <div className="pop-up">
                <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                  <AllUserProfile onClose={() => setIsOpen(false)} />
                </Modal>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
