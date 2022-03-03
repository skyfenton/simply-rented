import "./DetailedView.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

async function getItem(id) {
  try {
    const response = await axios.get("http://localhost:5000/items/" + id);
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default function DetailedView() {
  let { query } = useParams();
  let { id } = useParams();
  console.log(query);
  console.log(id);

  const [itemData, setItem] = useState("");

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
    <div class="article-container">
      <div class="article">
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
                  src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffreesvg.org%2Fimg%2FPlaceholder.png&f=1&nofb=1"
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
      <div class="article">
        <div class="card border-light mb-3" style={{ alignSelf: "flex-end" }}>
          <div class="card-header">Owner: {itemData.owner}</div>
          <div class="card-body">
            <h5 class="card-title">Contact Owner</h5>
            <p class="card-text">[display contact]</p>
          </div>
        </div>
      </div>
      <div class="article">
        <div class="card border-light mb-3" style={{ width: "38rem" }}>
          <div class="card-header">{itemData.itemName}</div>
          <div class="card-body">
            <h5 class="card-title">Description</h5>
            <p class="card-text">{itemData.itemDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
