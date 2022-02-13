import React, {useState} from 'react';
import "./Signup.css";
import logo from "../assets/boxlogo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

async function createUser(credentials) {
    try {
      const response = await axios.post(
        "http://localhost:5000/signup",
        credentials
      );
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

export function Signup(props) {
//   const [person, setPerson] = useState(
//      {
//         firstName: "",
//         lastName: "",
//         email: "",
//         username: "",
//         password: ""
//      }
//   );

// function handleChange(event) {
//     const { name, value } = event.target;
//     if (name === "firstName") 
//     setPerson(
//         {firstName: value, lastName: person.lastName, email: person.email, username: person.username, password: person.password}
//     );
//     else if (name === "lastName")
//     setPerson(
//         {firstName: person.firstName, lastName: value, email: person.email, username: person.username, password: person.password}
//     );
//     else if (name === "email")
//     setPerson(
//         {firstName: person.firstName, lastName: person.lastName, email: value, username: person.username, password: person.password}
//     );
//     else if (name === "username")
//     setPerson(
//         {firstName: person.firstName, lastName: person.lastName, email: person.email, username: value, password: person.password}
//     );
//     else     
//     setPerson(
//         {firstName: person.firstName, lastName: person.lastName, email: person.email, username: person.username, password: value} 
//     );
//     }



// function submitForm() {
//     props.handleSubmit(person);
//     setPerson({firstName: '', lastName: '', email: '', username: '', password: ''});
// }

// return (
//     <form>
//       <label htmlFor="firstName">First Name</label>
//       <input
//         type="text"
//         name="firstName"
//         id="firstName"
//         value={person.firstName}
//         onChange={handleChange} />
//     <label htmlFor="lastName">Last Name</label>
//       <input
//         type="text"
//         name="lastName"
//         id="lastName"
//         value={person.lastName}
//         onChange={handleChange} />
//     <label htmlFor="email">E-mail</label>
//       <input
//         type="email"
//         name="email"
//         id="email"
//         value={person.email}
//         onChange={handleChange} />
//       <label htmlFor="username">Username</label>
//       <input
//         type="text"
//         name="username"
//         id="username"
//         value={person.username}
//         onChange={handleChange} />
//       <label htmlFor="password">Password</label>
//       <input
//         type="password"
//         name="password"
//         id="password"
//         value={person.password}
//         onChange={handleChange} />
//       <input 
//         type="button" 
//         value="Submit" 
//         onClick={submitForm} />
//     </form>
// );

    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUser] = useState("");
    const [password, setPassword] = useState("");
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const response = await createUser({
        firstName,
        lastName,
        email,
        username,
        password,
      });
      if (response && response.status === 200) {
        props.setUser(email);
        navigate("/profile");
      }
    };
  
    return (
      <div class="text-center">
        <main class="form-signup">
          <form data-bitwarden-watching="1" onSubmit={handleSubmit}>
            <img class="mb-4" src={logo} alt="" width="176" height="169" />
            <h1 class="h3 mb-3 fw-normal">Create an Account!</h1>
  
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
            <div class="form-floating">
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