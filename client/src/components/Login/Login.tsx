import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleLogIn } from '../../utils/userAPI';
import { UserContext } from '../ContextWrapper';
import './Login.css'; // We'll add styles here

function Login() {
	const navigate = useNavigate();
	const { setUser } = useContext(UserContext);
	const [email, setEmail] = useState("gc@me.me");
	const [password, setPassword] = useState("123123123");

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Sign in</h2>
        <p>
          New to Niner Network? <a href="/signup">Sign up here!</a>
        </p>
        <form onSubmit={(event) => handleLogIn(event, email, password, navigate, setUser)}>
          <input 
						type="text" 
						placeholder="Email" 
						onChange={(event) => setEmail(event.target.value)}
					/>
          <input 
						type="password" 
						placeholder="Password" 
						onChange={(event) => setPassword(event.target.value)}
						/>
          <div className="forgot-password">
            <a href="/forgot-password">Forgot Password?</a>
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;