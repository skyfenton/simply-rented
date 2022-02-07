import './Login.css';
import logo from '../assets/logo.png';

export default function Login() {
  return (<div class="text-center">
<main class="form-signin">
  <form data-bitwarden-watching="1">
    <img class="mb-4" src={logo} alt="" width="176" height="169"/>
    <h1 class="h3 mb-3 fw-normal">Welcome back!</h1>

    <div class="form-floating">
      <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"/>
      <label for="floatingInput">Email address</label>
    </div>
    <div class="form-floating">
      <input type="password" class="form-control" id="floatingPassword" placeholder="Password"/>
      <label for="floatingPassword">Password</label>
    </div>

    <div class="checkbox mb-3">
      <label>
        <input type="checkbox" value="remember-me"/> Remember me
      </label>
    </div>
    <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
    {/* <p class="mt-5 mb-3 text-muted">© 2017–2021</p> */}
  </form>
</main>

</div>);
}