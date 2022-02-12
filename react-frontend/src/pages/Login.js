import React, { useState } from "react";
import "./Login.css";
import logo from "../assets/logo.png";
import axios from 'axios';
import {useNavigate,} from "react-router-dom";
// import { Link } from "react-router-dom";

async function loginUser(credentials) {
  try{
    const response = await axios.post('http://localhost:5000/login', credentials);
    return response;
  }
  catch (error) {
    console.log(error);
    return false;
  }
}

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      email,
      password
    });
    if(token && token.status === 200){
      props.setToken(token);
      navigate("/profile");
    }
  }
  
  return (
    <div class="text-center">
      <main class="form-signin">
        <form data-bitwarden-watching="1" onSubmit={handleSubmit}>
          <img class="mb-4" src={logo} alt="" width="176" height="169" />
          <h1 class="h3 mb-3 fw-normal">Welcome back!</h1>

          <div class="form-floating">
            <input
              type="email"
              class="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label for="floatingInput">Email address</label>
          </div>
          <div class="form-floating">
            <input
              type="password"
              class="form-control"
              id="floatingPassword"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label for="floatingPassword">Password</label>
          </div>

          <div class="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div>
          <button class="w-100 btn btn-lg btn-primary" type="submit">
            Sign in
          </button>
          {/* <p class="mt-5 mb-3 text-muted">© 2017–2021</p> */}
        </form>
      </main>
    </div>
  );
}