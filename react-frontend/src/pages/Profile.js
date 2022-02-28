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

  function newListing(e) {
    e.preventDefault();
    navigate("/create-listing");
  }

  return (
    <div className="container">
      {user ? (
        <>
          <h1 className="pb-3">My Profile</h1>
          <h2 className="pb-3">Contact Information</h2>
          <h3 className="pb-3">Email: {user}</h3>
          <br></br>
          <h2 className="pb-3">My Listings</h2>
          <div className="d-grid gap-2">
            <button
              className="btn btn-lg btn-secondary"
              onClick={newListing}
            >
              Create a new listing
            </button>
          </div>
          <br></br>
          <h2 className="pb-3">My Rentals</h2>
          <div className="d-grid gap-2">
            <button
              className="btn btn-lg btn-danger"
              onClick={removeUser}
            >
              Log out
            </button>
          </div>
        </>
      ) : (
        <h2>You're not logged in!</h2>
      )}
    </div>
  );
}
