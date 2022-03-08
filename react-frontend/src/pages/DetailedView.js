import "./DetailedView.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  console.log(id);
  console.log(user);

  const [itemData, setItem] = useState("");

  useEffect(() => {
    getItem(id).then((res) => {
      console.log(res.data.items_list);
      if (res.data.items_list) {
        setItem(res.data.items_list);
      } else {
        console.log("no item");
        setItem(null);
      }
    });
  }, []);

  async function updateItem() {
    var id = {};
    if (buttonLabel() == "Return") {
      id = {
        itemId: itemData._id,
        renter: "N/A",
      };
    } else {
      id = {
        itemId: itemData._id,
        renter: user,
      };
    }
    console.log(id);
    try {
      const response = await axios.post(
        "http://localhost:5000/updateItemById",
        id
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

  function buttonLabel() {
    var label = "";
    const button = document.getElementById("Action");

    if (itemData.renter == user) {
      label = "Return";
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

  function buttonStatus() {
    const button = document.getElementById("Action");

    if (button.innerText === "Unavailable") {
      button.style.visibility = "hidden";
      return true;
    } else {
      return false;
    }
  }

  function takeAction(e, userEmail) {
    e.preventDefault();
    if (itemData.renter == "N/A" || buttonLabel() == "Return") {
      updateItem();
      navigate("/rentals");
    } else {
      navigate("/error");
    }
  }

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
              </div>
            </div>
          </div>
          <div className="col-6">
            <div class="col-12 article">
              <div class="card border-light mb-3">
                <h3 class="card-header">Owner: {itemData.owner}</h3>
                <div class="card-body">
                  <a href="#" class="card-text">
                    (123) 456-7890
                  </a>
                </div>
              </div>
            </div>
            <div class="col-12 article">
              <div class="card border-light mb-3">
                <h3 class="card-header">{itemData.itemName}</h3>
                <div class="card-body">
                  <p class="card-text">{itemData.itemDescription}</p>
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
