import React, { useState, useEffect } from "react";
import "./Signup.css";
import logo from "../assets/boxlogo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//const API_BASE_URL = 'http://localhost:5000';
const API_BASE_URL = "https://simply-rented-backend.herokuapp.com";

async function createUser(credentials) {
  try {
    const response = await axios.post(API_BASE_URL + "/signup", credentials);
    return response;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export function Signup(props) {
  const navigate = useNavigate();

  // redirect to profile if logged in
  useEffect(() => {
    if (props.getUser()) {
      navigate("/profile");
    }
  });

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const listings = {};
  const rentals = {};

  const handleSubmit = async (e) => {
    setError(null);
    e.preventDefault();
    const response = await createUser({
      firstName,
      lastName,
      email,
      username,
      password,
      listings,
      rentals,
    });
    if (response) {
      if (response.status === 201) {
        // props.setUser(email);
        navigate("/login");
      } else if (response.status === 200 && response.data === "email exists") {
        setError("An account with this email already exists");
      } else {
        setError("Something bad happened, try again");
      }
    }
  };

  return (
    <div class="text-center">
      <main class="form-signup">
        <form onSubmit={handleSubmit}>
          <img class="mb-4" src={logo} alt="" width="176" height="169" />
          <h1 class="h3 mb-3 fw-normal">Create a new account</h1>

          <div class="form-floating">
            <input
              type="text"
              class="form-control"
              id="floatingInput"
              placeholder=""
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <label for="floatingInput">First Name</label>
          </div>
          <div class="form-floating">
            <input
              type="text"
              class="form-control"
              id="floatingInput"
              placeholder=""
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <label for="floatingInput">Last Name</label>
          </div>
          <div class="form-floating">
            <input
              type="email"
              class="form-control"
              id="floatingInput"
              placeholder=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label for="floatingInput">Email address</label>
          </div>
          <div class="form-floating" hidden>
            <input
              type="text"
              class="form-control"
              id="floatingPassword"
              placeholder=""
              value={username}
              onChange={(e) => setUser(e.target.value)}
            />
            <label for="floatingPassword">Username</label>
          </div>
          <div class="form-floating">
            <input
              type="password"
              class="form-control"
              id="floatingPassword"
              placeholder=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label for="floatingPassword">Password</label>
          </div>
          {error ? (
            <div style={{ color: "red" }} className="mw-100 text-center mb-3">
              <i className="bi bi-exclamation-triangle-fill"> </i>
              {error}
            </div>
          ) : null}
          <button class="w-100 btn btn-lg btn-primary" type="submit">
            Sign Up
          </button>
          <p class="mt-5 mb-3 text-muted" hidden>
            © 2017–2021
          </p>
        </form>
      </main>
    </div>
  );
}
export default Signup;
