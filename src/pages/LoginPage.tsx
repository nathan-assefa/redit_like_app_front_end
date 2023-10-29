import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const { loginUser } = useAuth();
  return (
    <div className="auth-form-wrapper">
      <div className="auth-form">
        <form onSubmit={loginUser}>
          <label className="auth-label username-label" htmlFor="username">
            Username:
          </label>
          <input
            className="auth-input user-username-input"
            type="text"
            id="username"
            name="username"
            placeholder="Insert your username"
          />

          <label className="auth-label password-label" htmlFor="password">
            Password:
          </label>
          <input
            className="auth-input user-password-input"
            type="password"
            id="password"
            name="password"
            placeholder="Insert your password"
          />

          {/* <input className="auth-submit" type="submit" /> */}
          <button className="auth-submit">Login</button>
          <p className="prompt-user-to-register">
            not registered yet?{" "}
            <Link className="register-user" to="/register">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
