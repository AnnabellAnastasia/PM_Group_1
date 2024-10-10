import React from 'react';
import './Login.css'; // We'll add styles here

function Login() {
  return (
    <div className="login-page">

      <div className="login-box">
        <h2>Sign in</h2>
        <p>
          New to Niner Network? <a href="/signup">Sign up here!</a>
        </p>
        <form>
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
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