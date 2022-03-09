import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Profile(props) {
  const navigate = useNavigate();
  const user = props.getUser();

  function removeUser(e) {
    e.preventDefault();
    if (props.removeUser()) {
      navigate("/");
    }
  }

  async function deleteUser(e) {
    const id = {
      email: user,
    };
    console.log(id);
    try {
      const response = await axios.post("http://localhost:5000/delete", id);
      e.preventDefault();
      if (props.removeUser()) {
        navigate("/");
      }
      return response;
    } catch (error) {
      console.log(error);
      return false;
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
            <button className="btn btn-lg btn-secondary" onClick={newListing}>
              Create a new listing
            </button>
          </div>
          <br></br>
          <h2 className="pb-3">My Rentals</h2>
          <div className="d-grid gap-2">
            <button className="btn btn-lg btn-danger" onClick={removeUser}>
              Log out
            </button>
            <button
              className="btn btn-lg btn-outline-danger"
              onClick={deleteUser}
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
