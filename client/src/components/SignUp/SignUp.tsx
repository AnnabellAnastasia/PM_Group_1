import React from 'react';
import './SignUp.css';  // Import SignUp-specific styles

const SignUp = () => {
  return (
    <div className="sign-up-page">
      <div className="sign-up-box">
        <h2>Sign up</h2>
        <p>
          Already a member? <a href="/login">Sign in here!</a>
        </p>
        <form>
          <input type="email" placeholder="UNCC Email" />
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
