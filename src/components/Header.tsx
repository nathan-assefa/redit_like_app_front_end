import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import HomeIcon from "../icons/HomeIcon";
import OptionIcon from "../icons/OptionIcon";
import Magnifier from "../icons/Magnifier";
import CreatePost from "../icons/CreatePost";
// import Notification from "../icons/Notification";
import { AiOutlineBell } from "react-icons/ai";
import Setting from "../icons/Setting";
import { AiOutlineMessage } from "react-icons/ai";
import IconBtn from "../services/HeaderIconBtn";

const Header = () => {
  const { username, logOutUser } = useAuth();
  return (
    // <div>
    //   <Link to="/">Home</Link>
    //   <span> | </span>
    //   <Link to="/communities">Community</Link>
    //   <span> | </span>
    //   <Link to="/posts">Post</Link>
    //   <span> | </span>
    //   <Link to="/create_community">Create Community</Link>
    //   <span> | </span>
    //   <Link to="/create_post">Create Post</Link>
    //   <span></span>
    //   <span> | </span>
    //   {username ? (
    //     <p onClick={logOutUser}>Logout</p>
    //   ) : (
    //     <Link to="/login">Login</Link>
    //   )}
    //   {username && <p>{username}</p>}
    // </div>
    <>
      <div>
        <Link to="/">Home</Link>
        <span> | </span>
        <Link to="/communities">Community</Link>
        <span> | </span>
        <Link to="/posts">Post</Link>
        <span> | </span>
        <Link to="/create_community">Create Community</Link>
        <span> | </span>
        <Link to="/create_post">Create Post</Link>
        <span></span>
        <span> | </span>
        {username ? (
          <p onClick={logOutUser}>Logout</p>
        ) : (
          <Link to="/login">Login</Link>
        )}
        {username && <p>{username}</p>}
      </div>
      <header>
        <div className="container">
          <Link to="#" className="logo">
            Opinion sphere
          </Link>
          <div className="home-menu">
            <div className="home-menu-icon">
              <HomeIcon />
            </div>
            <p className="home">Home</p>
            <div className="option-icon">
              <OptionIcon />
            </div>
          </div>
          <div className="search-header">
            <div className="magnifier">
              <Magnifier />
            </div>
          </div>
          <div className="header-icons">
            <div className="icon-wrapper">
              <div className="icon create-post-icon">
                <CreatePost />
              </div>
            </div>
            <div className="icon-wrapper">
              <div className="icon notification-icon">
                <IconBtn Icon={AiOutlineBell} aria-label="notification">
                  <p>2</p>
                </IconBtn>
              </div>
            </div>
            <div className="icon-wrapper">
              <div className="icon message-icon">
                <IconBtn Icon={AiOutlineMessage} aria-label="message">
                  <p>2</p>
                </IconBtn>
              </div>
            </div>
            <div className="icon-wrapper">
              <div className="icon setting-icon">
                <Setting />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
