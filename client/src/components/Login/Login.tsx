import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleLogInSubmit } from '../../utils/userAPI';
import './Login.css'; // We'll add styles here

function Login() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Sign in</h2>
        <p>
          New to Niner Network? <a href="/signup">Sign up here!</a>
        </p>
        <form onSubmit={(event) => handleLogInSubmit(event, navigate, email, password)}>
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