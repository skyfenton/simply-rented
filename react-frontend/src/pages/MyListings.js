import { useNavigate } from "react-router-dom";
import axios from "axios";
import ItemList from "./ItemList";

async function getItemsByUser(userEmail) {
  const id = {
    email: userEmail,
  };
  try {
    const response = await axios.post("http://localhost:5000/listings", id);
    console.log(response);
    if(response.status === 200){
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

  return (
    <div className="container">
      {user ? (
        <>
          <h1 className="pb-3">My Listings</h1>
          <div className="row">
            <ItemList
              getResponse={getItemsByUser(user)}
              error="Could not retrieve your items"
            />
          </div>
        </>
      ) : (
        <h2>You're not logged in!</h2>
      )}
    </div>
  );
}

export default MyListings;
