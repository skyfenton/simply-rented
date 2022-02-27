import React from "react";
import {
  Link,
  Outlet,
} from "react-router-dom";
import badge from "./assets/logo32.png";

export default function NavBar(props) {
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
              className="bi me-2"
              width="32"
              height="32"
              aria-label="Bootstrap"
            />
          </Link>

          <ul
            className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0"
            hidden
          >
            <li>
              <Link to="/" className="nav-link px-2 link-secondary">
                Home
              </Link>
            </li>
            <li>
              <a href="/about" className="nav-link px-2 link-dark">
                About
              </a>
            </li>
          </ul>

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
                    <a class="dropdown-item" href="#">
                      My Rentals
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      My Listings
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Logout
                    </a>
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
