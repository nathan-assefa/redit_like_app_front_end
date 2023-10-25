import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { usePostList } from "../contexts/PostListContext";
import HomeIcon from "../icons/HomeIcon";
import OptionIcon from "../icons/OptionIcon";
import ProfileListIcon from "../icons/ProfileListIcon";
import Magnifier from "../icons/Magnifier";
import CreatePost from "../icons/CreatePost";
import { AiOutlineBell } from "react-icons/ai";
import Setting from "../icons/Setting";
import { AiOutlineMessage } from "react-icons/ai";
import IconBtn from "../IconButtons/HeaderIconBtn";
import { getUserProfile } from "../utils/userProfile";
import { Profile } from "../types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useCommunity from "../components/useCommunity";
// import Modal from "../components/Modal";
// import CreateCommunity from "../pages/CreateCommunity";
// import TopCommunities from "../services/TopCommunities";

import { ClearNotificationCount } from "../utils/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useEffect, useState } from "react";

const Header = () => {
  const [clearNotification, setClearNotification] = useState(false);
  const [showMessages, setShowMessages] = useState(false);

  const queryClient = useQueryClient();

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
  // const [isOpen, setIsOpen] = useState(false);

  const { search, setSearch } = usePostList();

  return (
    <>
      <header>
        <div className="user-auth">
          {/* <Link to="/communities">Community</Link> */}
          <div className="profile-info">
            {username && <p>@{username}</p>}
            {username ? (
              <p className="logout" onClick={logOutUser}>
                Logout
              </p>
            ) : (
              <Link className="login" to="/login">
                Login
              </Link>
            )}
          </div>
          <Link to="update_profile">
            <div className="profile-picture"></div>
          </Link>
          <div className="option-icon pf-op-icon">
            <p onClick={() => setHomeOption((prev) => !prev)}>
              <ProfileListIcon />
            </p>
          </div>
        </div>
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
            Opinion sphere
          </Link>
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
                <IconBtn Icon={AiOutlineMessage} aria-label="message">
                  {profile?.unread_messages_count ? (
                    <p>{profile?.unread_messages_count}</p>
                  ) : (
                    ""
                  )}
                </IconBtn>
              </div>
            </div>
            {showMessages && <div className="message-notification"></div>}
            <div className="icon-wrapper">
              <div className="icon setting-icon">
                <Setting />
              </div>
            </div>
            {/* <button onClick={() => setIsOpen(true)}>toggle</button>
            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
              <CreateCommunity />
            </Modal> */}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
