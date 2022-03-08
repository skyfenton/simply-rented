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
  let { query } = useParams();
  let { id } = useParams();
  const user = props.getUser();
  var edit = "false";
  console.log(query);
  console.log(id);
  console.log(user);

  const [itemData, setItem] = useState("");
  const [state, setState] = useState("false");

  useEffect(() => {
    getItem(id).then((res) => {
      console.log(res.data.items_list);
      if (res.data.items_list) {
        setItem(res.data.items_list);
      } else {
        console.log("no items");
        setItem(["No items found with query", query].join(": "));
      }
    });
  }, []);

  async function updateItem(
    newName = itemData.itemName,
    newRate = itemData.itemRate,
    newDesc = itemData.itemDescription,
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
    const button = document.getElementById("Action");

    if (itemData.renter == user) {
      label = "Return";
    } else if (itemData.owner == user) {
      if (state == "true") {
        console.log("hey");
        label = "Save";
      } else {
        label = "Edit";
      }
    } else if (itemData.renter == "N/A") {
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

  async function takeAction(e) {
    e.preventDefault();
    const button = document.getElementById("Action");
    if (itemData.owner == user && buttonLabel() == "Edit") {
      console.log(edit);
      setState("true");
    } else if (itemData.owner == user && buttonLabel() == "Save") {
      var descText = document.getElementById("desc").innerHTML;
      var nameText = document.getElementById("name").innerHTML;
      var rateText = document.getElementById("rate").innerHTML;
      await updateItem(nameText, rateText, descText);
      setState("false");
    } else if (itemData.renter == "N/A" || buttonLabel() == "Return") {
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
    <div class="container">
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
              <ol class="carousel-indicators">
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to="0"
                  class="active"
                ></li>
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to="1"
                ></li>
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to="2"
                ></li>
              </ol>
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <img
                    class="d-block w-100"
                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffreesvg.org%2Fimg%2FPlaceholder.png&f=1&nofb=1"
                    alt="First slide"
                  ></img>
                </div>
                <div class="carousel-item">
                  <img
                    class="d-block w-100"
                    src="https://www.webfx.com/wp-content/uploads/2021/10/generic-image-placeholder.png"
                    alt="Second slide"
                  ></img>
                </div>
                <div class="carousel-item">
                  <img
                    class="d-block w-100"
                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffreesvg.org%2Fimg%2FPlaceholder.png&f=1&nofb=1"
                    alt="Third slide"
                  ></img>
                </div>
              </div>
              <a
                class="carousel-control-prev"
                href="#carouselExampleIndicators"
                role="button"
                data-slide="prev"
              >
                <span
                  class="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span class="sr-only">Previous</span>
              </a>
              <a
                class="carousel-control-next"
                href="#carouselExampleIndicators"
                role="button"
                data-slide="next"
              >
                <span
                  class="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span class="sr-only">Next</span>
              </a>
              <br></br>
              <div class="card">
                <div class="card-body">
                  <h3 class="card-title">Item Description</h3>
                  <p class="card-text" id="desc" contentEditable={state}>
                    {itemData.itemDescription}
                  </p>
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
        </div>
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
                <p class="card-text" style={{ fontSize: 20 }}>
                  Owned by {itemData.owner}
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
    </div>
  );
}
