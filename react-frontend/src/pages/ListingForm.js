import React, { useState, useEffect } from "react";
import "./ListingForm.css";
import logo from "../assets/boxlogo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function ListingForm(props) {
  const navigate = useNavigate();
  const userEmail = props.getUser();

  // redirect to profile if logged in
  // useEffect(() => {
  //   if(props.getUser()){
  //     navigate("/profile");
  //   }
  // });

  async function createListing(credentials) {
    try {
      const response = await axios.post(
        "http://localhost:5000/create-listing",
        credentials
      );
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  const [itemName, setItemName] = useState("");
  const [itemRate, setItemRate] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  // const [availability, setAvailability] = useState("");
  const availability = "yes";
  const rating = 5.0;
  const owner = userEmail;
  const renter = "N/A";
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    setError(null);
    e.preventDefault();

    if (image == "" || image == null || image == undefined) {
      setImage(
        "https://wtwp.com/wp-content/uploads/2015/06/placeholder-image.png"
      );
    }

    const response = await createListing({
      itemName,
      itemRate,
      itemDescription,
      availability,
      rating,
      owner,
      renter,
      image,
    });
    if (response) {
      if (response.status === 201) {
        console.log(response);
        // props.setUser(email);
        navigate("/listings");
      } else {
        setError("Something bad happened, try again");
      }
    }
  };

  return (
    <div className="text-center">
      <main className="form-listing">
        <form onSubmit={handleSubmit}>
          <img className="mb-4" src={logo} alt="" width="176" height="169" />
          <h1 className="h3 mb-3 fw-normal">Create a new listing</h1>

          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder=""
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              required
            />
            <label htmlFor="floatingInput">Item Name</label>
          </div>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder=""
              value={itemRate}
              onChange={(e) => setItemRate(e.target.value)}
              required
            />
            <label htmlFor="floatingInput">Item Rate (Per Day)</label>
          </div>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder=""
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
              required
            />
            <label htmlFor="floatingInput">Item Description</label>
          </div>
          {/* <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder=""
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              required
            />
            <label htmlFor="floatingInput">Availability</label>
          </div> */}
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder=""
              value={image}
              onChange={(e) => setImage(e.target.value)}
              optional="true"
            />
            <label htmlFor="floatingInput">Item Image URL</label>
          </div>
          {error ? (
            <div style={{ color: "red" }} className="mw-100 text-center mb-3">
              <i className="bi bi-exclamation-triangle-fill"> </i>
              {error}
            </div>
          ) : null}
          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Create Listing
          </button>
          <p className="mt-5 mb-3 text-muted" hidden>
            © 2017–2021
          </p>
        </form>
      </main>
    </div>
  );
}
export default ListingForm;
