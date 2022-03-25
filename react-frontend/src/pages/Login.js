import React, { useState, useEffect } from "react";
import "./Login.css";
import logo from "../assets/boxlogo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

//const API_BASE_URL = 'http://localhost:5000';
const API_BASE_URL = "https://simply-rented-backend.herokuapp.com";

async function loginUser(credentials) {
  try {
    const response = await axios.post(API_BASE_URL + "/login", credentials);
    return response;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export default function Login(props) {
  const navigate = useNavigate();

  // redirect to profile if logged in
  useEffect(() => {
    if (props.getUser()) {
      navigate("/profile");
    }
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalid, showInvalid] = useState("");

  const handleSubmit = async (e) => {
    showInvalid(false);
    e.preventDefault();
    const response = await loginUser({
      email,
      password,
    });
    if (response && response.status === 200) {
      props.setUser(email);
      navigate("/profile");
    } else {
      showInvalid(true);
    }
  };

  return (
    <div className="text-center">
      <main className="form-signin">
        <form data-bitwarden-watching="1" onSubmit={handleSubmit}>
          <img className="mb-4" src={logo} alt="" width="176" height="169" />
          <h1 className="h3 mb-3 fw-normal">Welcome back!</h1>

          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <div className="checkbox mb-3" hidden>
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div>
          {invalid ? (
            <div style={{ color: "red" }} className="mb-3">
              <i className="bi bi-exclamation-triangle-fill"> </i>
              Email or password incorrect
            </div>
          ) : null}
          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Sign in
          </button>
          <p className="mt-5 mb-3 text-muted" hidden>
            © 2017–2021
          </p>
        </form>
      </main>
    </div>
  );
}
