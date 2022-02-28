import { useNavigate } from "react-router-dom";

export default function Profile(props) {
  const navigate = useNavigate();
  const user = props.getUser();

  function removeUser(e) {
    e.preventDefault();
    if (props.removeUser()) {
      navigate("/");
    }
  }

  return (
    <div className="container">
      {user ? (
        <>
          <h2 className="pb-3">{user}</h2>
          <div className="d-grid gap-2">
            <button
              className="btn btn-lg btn-outline-danger"
              onClick={removeUser}
            >
              Log out
            </button>
            <button
              className="btn btn-lg btn-outline-danger"
              onClick={removeUser}
            >
              Delete Profile
            </button>
          </div>
        </>
      ) : (
        <h2>You're not logged in!</h2>
      )}
    </div>
  );
}
