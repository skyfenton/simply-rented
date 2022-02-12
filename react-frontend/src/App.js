import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
  Navigate
} from "react-router-dom";
import badge from "./assets/logo32.png";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

let user = null;

function setUser(email) {
  // sessionStorage.setItem('token', JSON.stringify(userToken));
  user = email;
}

function getToken() {
  // const tokenString = sessionStorage.getItem('token');
  // const userToken = JSON.parse(tokenString);
  // return userToken?.token
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Home />} />
          <Route
            path="/login"
            element={
              !user ? (
                <Login setUser={setUser} />
              ) : (
                <Navigate replace to="/user" />
              )
            }
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Route>
      </Routes>
    </Router>
  );
}

function NavBar() {
  return (
    <>
      <div class="container">
        <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
          <Link
            to="/"
            class="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none"
          >
            <img
              src = {badge}
              class="bi me-2"
              width="32"
              height="32"
              aria-label="Bootstrap"
            />
          </Link>

          <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0" hidden>
            <li>
              <Link to="/" class="nav-link px-2 link-secondary">
                Home
              </Link>
            </li>
            <li>
              <a href="#" class="nav-link px-2 link-dark">
                About
              </a>
            </li>
          </ul>

          <div class="col-md-3 text-end">
            <Link
              to="/login"
              role="button"
              class="btn btn-outline-primary me-2"
            >
              Login
            </Link>
            <button type="button" class="btn btn-primary" hidden>
              Sign-up
            </button>
          </div>
        </header>
      </div>
      <Outlet />
    </>
  );
}
