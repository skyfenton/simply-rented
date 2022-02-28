import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";


export function MyListings(props) {
  const navigate = useNavigate();
  const userEmail = props.getUser();
  const [itemData, setItems] = useState("");

  async function getItemsByUser(userEmail) {
    const id = {
        email: userEmail,
      }
    try {
      const response = await axios.post(
        "http://localhost:5000/listings",
        id
      );
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  useEffect(() => {
    getItemsByUser(userEmail).then((res) => {
      if (res) {
        console.log(res)
        setItems(res.data.result[0]);
        console.log(res.data.result[0].values);
      }
    });
  }, []);

  var items = JSON.stringify(itemData)


  return (
    <div className="container">
      {userEmail ? (
        <>
          <h1 className="pb-3">My Listings</h1>
            <div className="row">
                {console.log(itemData)}
                {items}
            </div>
        </>
      ) : (
        <h2>You're not logged in!</h2>
      )}
    </div>
  );
}
export default MyListings;
