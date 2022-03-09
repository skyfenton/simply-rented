import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./NavBar.css";
import badge from "./assets/logo32.png";

export default function NavBar(props) {
  const navigate = useNavigate();

  function removeUser(e) {
    e.preventDefault();
    if (props.removeUser()) {
      navigate("/");
    }
  }

  return (
    <>
      <div className="container">
        <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
          <Link
            to="/"
            className="d-flex align-items-center me-auto mb-2 mb-md-0 text-dark text-decoration-none"
          >
            <img
              src={badge}
              className="bi me-3"
              width="32"
              height="32"
              aria-label="Bootstrap"
            />
            <h4 style={{
              background: "-webkit-linear-gradient(315deg, #da8eff 0%, #8909d8 100%)",
              "-webkit-background-clip": "text",
              "-webkit-text-fill-color": "transparent"}}>
            Simply Rented
            </h4>
          </Link>

          <div className="col-md-3 text-end">
            {props.isLoggedIn ? (
              <div class="dropdown">
                <button
                  class="btn btn-outline-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuLink"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {props.getUser()}
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <li>
                    <Link to="/" class="dropdown-item">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="profile" class="dropdown-item">
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="rentals" class="dropdown-item">
                      My Rentals
                    </Link>
                  </li>
                  <li>
                    <Link to="listings" class="dropdown-item">
                      My Listings
                    </Link>
                  </li>
                  <li>
                    <button
                      id="dropdownLogout"
                      className="dropdown-item"
                      onClick={removeUser}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  role="button"
                  className="btn btn-outline-primary me-2"
                >
                  Login
                </Link>
                <Link to="/signup" role="button" className="btn btn-primary">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </header>
      </div>
      <Outlet />
    </>
  );
}
