import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import HomeIcon from "../icons/HomeIcon";
import OptionIcon from "../icons/OptionIcon";
import Magnifier from "../icons/Magnifier";
import CreatePost from "../icons/CreatePost";
import Notification from "../icons/Notification";
import Setting from "../icons/Setting";
import { AiOutlineMessage } from "react-icons/ai";
import IconBtn from "../services/IconBtn";

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
          <Link to="#" className="log">
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
            <Magnifier />
          </div>
          <div className="header-icons">
            <div className="icon create-post-icon">
              <IconBtn Icon={CreatePost} aria-label="post" />
            </div>
            <div className="icon notification-icon">
              <IconBtn Icon={Notification} aria-label="notification">
                2
              </IconBtn>
            </div>
            <div className="icon message-icon">
              <IconBtn Icon={AiOutlineMessage} aria-label="message">
                2
              </IconBtn>
            </div>
            <div className="icon setting-icon">
              <IconBtn Icon={Setting} aria-label="setting" />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
