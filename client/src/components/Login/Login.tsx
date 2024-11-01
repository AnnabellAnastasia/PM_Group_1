import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleLogIn } from '../../utils/userAPI';
import { UserContext, AlertContext } from '../ContextWrapper';
import './Login.css';

function Login() {
	const navigate = useNavigate();
	const { setUser } = useContext(UserContext);
	const { setPageAlert } = useContext(AlertContext);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

  return (
    <div className="login-page d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="login-box bg-white p-4 rounded shadow text-center">
        <h2 className="mb-3">Sign in</h2>
        <p>
          New to Niner Network? <a href="/signup" className="text-decoration-none">Sign up here!</a>
        </p>
        <form onSubmit={(event) => handleLogIn(event, email, password, navigate, setUser, setPageAlert)}>
          <div className="form-group mb-3">
            <input 
              type="text" 
              placeholder="Email" 
              className="form-control"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <input 
              type="password" 
              placeholder="Password" 
              className="form-control"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="forgot-password text-end mb-3">
            <a href="/forgot-password" className="text-decoration-none text-muted">Forgot Password?</a>
          </div>
          <button type="submit" className="btn btn-success w-100">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
