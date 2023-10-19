import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
// import "./App.css";
import "./styles/Header.css";
import "./styles/Post.css";
import "./styles/CreatePost.css";
import "./styles/Form.css";
import "./styles/CreateCommunity.css";
import "./styles/Community.css";
import "./styles/Notification.css";
// import "./styles/Comment.css";
// import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
