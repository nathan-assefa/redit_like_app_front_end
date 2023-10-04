import { useAuth } from '../contexts/AuthContext'

const LoginPage = () => {

  const { loginUser } = useAuth()
  return (
    <div>
        <form onSubmit={loginUser}>
            <input type='text' name='username' placeholder='insert your username'/>
            <input type='password' name='password' placeholder='insert your password'/>
            <input type='submit'/>
        </form>
    </div>
  )
}

export default LoginPage