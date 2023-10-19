import { Community } from "./services/Community";
import { PostProvider } from "./contexts/PostContext";
import { PostListProvider } from "./contexts/PostListContext";
import { PostList } from "./services/PostList";
import { Post } from "./services/Post";
import { CommunityProvider } from "./contexts/CommunityContext";
import Notifications from "./services/Notifications";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const queryClient = new QueryClient();

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import PrivateRoutes from "./utils/PrivateRoute";
import { AuthProvider } from "./contexts/AuthContext";
import CreateCommunity from "./pages/CreateCommunity";
import CreatePost from "./pages/CreatePost";

function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <PostListProvider>
            <Header />
            <Routes>
              <Route element={<PrivateRoutes />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/posts" element={<PostList />} />
                <Route path="/create_community" element={<CreateCommunity />} />
                <Route path="/create_post" element={<CreatePost />} />
                <Route
                  path="/communities/:id"
                  element={
                    <CommunityProvider>
                      <Community />
                    </CommunityProvider>
                  }
                />
                <Route
                  path="/posts/:id"
                  element={
                    <PostProvider>
                      <Post />
                    </PostProvider>
                  }
                />
              </Route>
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </PostListProvider>
        </AuthProvider>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
