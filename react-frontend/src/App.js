import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet
} from "react-router-dom";
import Home from "./pages/Home";
import Users from "./pages/Users";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}/>
          <Route path="/users" element={<Users />}/>
          <Route path="*" element={<h1>404 Not Found</h1>}/>
        </Route>
      </Routes>
    </Router>
  );
}

function Layout() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  )
}
