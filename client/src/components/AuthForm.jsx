import { useState } from "react";

const AuthForm = ({ setToken }) => {
  const [alert, setAlert] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSignIn, setIsSignIn] = useState(true)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await fetch("/auth/signIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await result.json();

    if (data.token) {
      setAlert("");
      setToken(data.token);
    } else {
      setAlert(<p>Invalid Login</p>);
    }
  };

  return (
    <>
      <p>
        Sign in to see trains or <a href="#" onClick={() => setIsSignIn(!isSignIn)}>Register as a new user</a>
        </p>
      {alert}
      <form onSubmit={handleSubmit}>
      <label hidden={isSignIn}>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label hidden={isSignIn}>
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default AuthForm;
