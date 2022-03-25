import { useNavigate } from "react-router-dom";
import axios from "axios";
import ItemList from "./ItemListOwner";

//const API_BASE_URL = 'http://localhost:5000';
const API_BASE_URL = "https://simply-rented-backend.herokuapp.com";

async function getItemsByUser(userEmail) {
  const id = {
    email: userEmail,
  };
  try {
    // backend request that finds item by owner
    const response = await axios.post(API_BASE_URL + "/listings", id);
    //console.log(response);
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

export function MyListings(props) {
  const navigate = useNavigate();
  const user = props.getUser();

  function newListing(e) {
    e.preventDefault();
    navigate("/create-listing");
  }

  return (
    <div className="container">
      {user ? (
        <>
          <h1 className="pb-3">My Listings</h1>
          <div className="row">
            <ItemList
              owner={user}
              getResponse={getItemsByUser(user)}
              error="You currently have no listings!"
            />
          </div>
          <br></br>
          <div className="d-grid gap-2">
            <button className="btn btn-lg btn-secondary" onClick={newListing}>
              Create a new listing
            </button>
          </div>
        </>
      ) : (
        <h2>You're not logged in!</h2>
      )}
    </div>
  );
}

export default MyListings;
