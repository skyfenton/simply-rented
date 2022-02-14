import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
} from "react-router-dom";
import badge from "./assets/logo32.png";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";

function setUser(email) {
  sessionStorage.setItem("user", JSON.stringify(email));
}

function getUser() {
  const userJson = sessionStorage.getItem("user");
  const userData = JSON.parse(userJson);
  return userData;
}

function removeUser() {
  if (getUser()) {
    console.log("removing user from session");
    sessionStorage.removeItem("user");
    return true;
  }
  console.log("session user does not exist");
  return false;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Home />} />
          <Route
            path="/login"
            element={<Login setUser={setUser} getUser={getUser} />}
          />
          <Route
            path="/profile"
            element={<Profile getUser={getUser} removeUser={removeUser} />}
          />
          <Route path="/signup" element = {<Signup />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Route>
      </Routes>
    </Router>
  );
}

function NavBar() {
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
            <Link
              to="/login"
              role="button"
              className="btn btn-outline-primary me-2"
            >
              Login
            </Link>
            <Link
              to="/signup"
              role="button"
              className="btn btn-outline-primary me-2"
            >
              Sign Up
            </Link>
            <button type="button" className="btn btn-primary" hidden>
              Sign-up
            </button>
          </div>
        </header>
      </div>
      <Outlet />
    </>
  );
}
