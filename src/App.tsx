import { CommunityProvider } from './contexts/CommuniyContext'
import { CommunityList } from './services/CommunityList'
import { PostList } from './services/PostList'
import { PostProvider } from './contexts/PostContext'
import { CommentProvider } from './contexts/CommentContext'
import { CommentList } from './services/CommentList'


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import Header from './components/Header'
import PrivateRoutes from './utils/PrivateRoute';
import { AuthProvider } from './contexts/AuthContext'

function App() {
  return (
    <Router>
      <AuthProvider>
        <CommunityProvider>
          <PostProvider>
            <CommentProvider>
              <Header />
              <Routes>
                <Route element={<PrivateRoutes />}>
                  <Route path='/' element={<HomePage />} />
                  <Route path='/communities' element={<CommunityList />} />
                  <Route path='/posts' element={<PostList />}/>
                  <Route path='/comments' element={<CommentList />}/>
                </Route>
                <Route path='/login' element={<LoginPage />} />
              </Routes>
            </CommentProvider>
          </PostProvider>
        </CommunityProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;




// function App() {
//   return (
//     <div>
//       <CommunityProvider>
//         <CommunityList />
//       </CommunityProvider>
//     </div>
//   )
// }

// export default App;