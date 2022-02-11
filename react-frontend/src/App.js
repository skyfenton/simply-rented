import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

let token = null;

function setToken(userToken) {
  // sessionStorage.setItem('token', JSON.stringify(userToken));
  token = userToken;
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
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="/login"
            element={
              !token ? (
                <Login setToken={setToken} />
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

function Layout() {
  return (
    <>
      <div class="container">
        <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
          {/* <a href="/" class="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
          <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"></svg>
        </a> */}

          <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
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
