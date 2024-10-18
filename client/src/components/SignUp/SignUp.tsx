import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleSignUp } from "../../utils/userAPI";
import "./SignUp.css"; // Import SignUp-specific styles

const SignUp = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="sign-up-page">
      <div className="sign-up-box">
        <h2>Sign up</h2>
        <p>
          Already a member? <a href="/login">Sign in here!</a>
        </p>
        <form
          onSubmit={(event) =>
            handleSignUp(
              event,
              navigate,
              firstName,
              lastName,
              email,
              password
            )
          }
        >
          <input
            type="text"
            placeholder="First Name"
            onChange={(event) => setFirstName(event.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            onChange={(event) => setLastName(event.target.value)}
          />
          <input
            type="email"
            placeholder="UNCC Email"
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
