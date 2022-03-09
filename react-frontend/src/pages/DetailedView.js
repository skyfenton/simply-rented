import "./DetailedView.css";
import axios from "axios";
import { renderMatches, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { rawListeners } from "../../../expressjs-backend/models/user";
// import { updateItemById } from "../../../expressjs-backend/models/item-services";

async function getItem(id) {
  try {
    const response = await axios.get("http://localhost:5000/items/" + id);
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default function DetailedView(props) {
  const navigate = useNavigate();
  let { id } = useParams();
  const user = props.getUser();

  const [itemData, setItem] = useState("");
  const [state, setState] = useState("false");

  const [userData, setUser] = useState("");

  async function getUser(email) {
    try {
      const response = await axios.get("http://localhost:5000/users/" + email);
      console.log(user);
      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  useEffect(() => {
    getItem(id).then((res) => {
      console.log(res.data.items_list);
      if (res.data.items_list) {
        setItem(res.data.items_list);
        getUser(res.data.items_list.owner).then((res) => {
          // console.log(itemData)
          console.log(res.data.users_list);
          if (res.data.users_list) {
            console.log(res.data.users_list.renter);
            setUser(res.data.users_list[0]);
          } else {
            setUser("N/A");
          }
        });
      } else {
        console.log("no item");
        setItem(null);
      }
    });
  }, []);

  // useEffect(() => {
  //   getUser(itemData.owner).then((res) => {
  //     console.log(itemData)
  //     console.log(res.data.users_list);
  //     if (res.data.users_list) {
  //       setUser(res.data.users_list[0]);
  //     } else {
  //       setUser("null");
  //     }
  //   });
  // }, []);

  async function updateItem(
    newName = itemData.itemName,
    newRate = itemData.itemRate,
    newDesc = itemData.itemDescription,
    newImage = itemData.image,
    avail = itemData.availability,
    newRating = itemData.rating,
    theOwner = itemData.owner,
    theRenter = itemData.renter
  ) {
    var newItem = {};
    if (buttonLabel() == "Return") {
      theRenter = "N/A";
    } else if (buttonLabel() == "Rent") {
      theRenter = user;
    }

    newItem = {
      itemId: itemData._id,
      itemName: newName,
      itemRate: newRate,
      itemDescription: newDesc,
      availability: avail,
      rating: newRating,
      owner: theOwner,
      renter: theRenter,
      image: newImage,
    };
    console.log(newItem);
    try {
      const response = await axios.post(
        "http://localhost:5000/updateItemById",
        newItem
      );
      console.log(response);
      if (response.status === 200) {
        return response;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  function buttonLabel(label = "") {
    if (itemData.renter == user) {
      label = "Return";
    } else if (itemData.owner == user) {
      if (state == "true") {
        console.log("hey");
        label = "Save";
      } else {
        label = "Edit";
      }
    } else if (
      itemData.renter == "N/A" ||
      itemData.renter == null ||
      itemData.renter == undefined
    ) {
      label = "Rent";
    } else {
      label = "Unavailable";
      if (document.getElementById("Action") != null) {
        document.getElementById("Action").disabled = true;
      }
      // document.addEventListener("DOMContentLoaded", function(event) {
      //     button.disabled = true;
      // });
    }
    return label;
  }

  function checkImage() {
    if (itemData.image == "" || itemData.image == null) {
      return "https://wtwp.com/wp-content/uploads/2015/06/placeholder-image.png";
    } else {
      return itemData.image;
    }
  }

  async function takeAction(e) {
    e.preventDefault();
    const button = document.getElementById("Action");
    if (itemData.owner == user && buttonLabel() == "Edit") {
      setState("true");
    } else if (itemData.owner == user && buttonLabel() == "Save") {
      var descText = document.getElementById("desc").innerHTML;
      var nameText = document.getElementById("name").innerHTML;
      var rateText = document.getElementById("rate").innerHTML;
      var imgUrl = document.getElementById("image").innerHTML;
      if (imgUrl == "") {
        imgUrl = itemData.image;
      }
      await updateItem(nameText, rateText, descText, imgUrl);
      setState("false");
      window.location.reload(false);
    } else if (
      itemData.renter == "N/A" ||
      itemData.renter == null ||
      itemData.renter == undefined ||
      buttonLabel() == "Return"
    ) {
      await updateItem();
      navigate("/rentals");
    } else {
      navigate("/error");
    }
  }

  // function handleChange(e) {
  //   console.log(e.target);
  // }

  console.log(itemData);

  return (
    // <div className="col-6 col-sm-4 col-md-3 col-xl-2">

    //     <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffreesvg.org%2Fimg%2FPlaceholder.png&f=1&nofb=1" className="card-img-top" alt="..." />
    //     <div className="card-body">
    //       <h5 className="card-title">Item Name: {itemData.itemName}</h5>
    //     </div>
    //     <div className="card-body">
    //       <h5 className="card-title">Item Description: {itemData.itemDescription}</h5>
    //     </div>
    // </div>
    <div id="gradient-bg" class="container">
      {!itemData ? (
        <h2>Item not found with id: {id}</h2>
      ) : (
        <div className="row">
          <div class="col-6 article">
            <div
              class="card border-light mb-3"
              style={{ flex: 1, flexDirection: "row" }}
            >
              <div
                id="carouselExampleIndicators"
                class="carousel slide"
                data-ride="carousel"
              >
                <div class="card mb-3">
                  <img class="card-img-top" src={checkImage()} />
                  <p class="card-text" id="image" contentEditable={state}></p>
                </div>
                <br></br>
                <div class="card">
                  <div class="card-body">
                    <h3 class="card-title">Item Description</h3>
                    <p class="card-text" id="desc" contentEditable={state}>
                      {itemData.itemDescription}
                    </p>
                  </div>
                </div>
              </div>
              {/* </div> */}
            </div>
            {/* <div class="col-12 article">
              <div class="card" >
                <div class="card-body">
                  <h3 class="card-title">Item Description</h3>
                  <p class="card-text" id="desc" contentEditable={state}>{itemData.itemDescription}</p>
                </div>
              </div>
            </div> */}
          </div>
          {/* </div> */}
          <div className="col-6">
            {/* <div class="col-12 article">
            <div class="card border-light mb-3">
              <h3 class="card-header">Owned by {itemData.owner}</h3>
              <div class="card-body">
                <a href="#" class="card-text">
                  (123) 456-7890
                </a>
              </div>
            </div>
          </div> */}
            <div class="col-12 article">
              {/* <div class="card border-light mb-3">
              <h3 class="card-header" id="name" contentEditable={state}>{itemData.itemName}</h3>
              <div class="card-body">
                <h2 class="card-body" id="rate" contentEditable={state}><em>${itemData.itemRate}/day</em></h2>
              </div>
            </div> */}
              <div class="card">
                <div class="card-body">
                  <h3 class="card-title" id="name" contentEditable={state}>
                    {itemData.itemName}
                  </h3>
                  <br></br>
                  <h2
                    class="card-subtitle mb-2 text-muted"
                    style={{ display: "inline" }}
                  >
                    {" "}
                    $
                    <h2
                      class="card-subtitle mb-2 text-muted"
                      id="rate"
                      style={{ display: "inline" }}
                      contentEditable={state}
                    >
                      {itemData.itemRate}
                    </h2>
                    /day
                  </h2>
                  <br></br>
                  <br></br>
                  <p class="card-text" style={{ fontSize: 20 }}>
                    Owned by {userData.firstName} {userData.lastName}
                  </p>
                  {/* <a href="#" class="card-link">Add to favorites</a>
                <a href="#" class="card-link">Contact owner</a> */}
                </div>
              </div>
            </div>
            <div className="d-grid gap-2">
              <button
                className="btn btn-lg btn-secondary"
                id="Action"
                onClick={takeAction}
              >
                {buttonLabel()}
              </button>
            </div>
          </div>
        </div>
      )}{" "}
    </div>
  );
}
