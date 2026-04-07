import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    if (email === "" || password === "") {
      alert("Please enter Email and Password");
      return;
    }

    alert("Login successful");
    navigate("/dashboard");
  }

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>ERP Login</h1>

      <input
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      <button
        onClick={handleLogin}
        style={{ padding: "10px 20px" }}
      >
        Login
      </button>
    </div>
  );
}

export default Login;