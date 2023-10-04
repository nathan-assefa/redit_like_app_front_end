import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Header = () => {
  const {username, logOutUser} = useAuth()
  return (
    <div>
        <Link to='/'>Home</Link>
        <span> | </span>
        <Link to='/communities'>Community</Link>
        <span> | </span>
        <Link to='/posts'>Post</Link>
        <span> | </span>
        <Link to='/comments'>Comment</Link>
        <span> | </span>
        {username ? (
          <p onClick={logOutUser}>Logout</p>
        ) : (
          <Link to='/login'>Login</Link>
        )}
        {username && <p>{username}</p>}
    </div>
  )
}

export default Header