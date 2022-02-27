import { React, Component } from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";

class App extends Component {
  // const [isAuthenticated, changeAuth] = useState("");
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: this.getUser() !== undefined,
    };
  }

  setUser = (email) => {
    sessionStorage.setItem("user", JSON.stringify(email));
    this.setState({ isAuthenticated: true });
  };

  getUser = () => {
    const userJson = sessionStorage.getItem("user");
    const userData = JSON.parse(userJson);
    return userData;
  };

  removeUser = () => {
    if (this.getUser()) {
      console.log("removing user from session");
      sessionStorage.removeItem("user");
      this.setState({ isAuthenticated: false });
      return true;
    }
    console.log("session user does not exist");
    return false;
  };

  render() {
    const { isAuthenticated } = this.state;

    return (
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <NavBar
                isLoggedIn={isAuthenticated}
                getUser={this.getUser}
                removeUser={this.removeUser}
              />
            }
          >
            <Route index element={<Home />} />
            <Route
              path="/login"
              element={
                <Login
                  setUser={this.setUser}
                  getUser={this.getUser}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  getUser={this.getUser}
                  removeUser={this.removeUser}
                />
              }
            />
            <Route path="/signup" element={<Signup getUser={this.getUser} />} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Route>
        </Routes>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
