import axios from "axios";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ItemList from "./ItemList";

//const API_BASE_URL = 'http://localhost:5000';
const API_BASE_URL = "https://simply-rented-backend.herokuapp.com";

async function getItems(query) {
  try {
    //console.log(query);
    const response = await axios.get(
      API_BASE_URL + "/searchItems?query=" + query
    );
    if (response.status === 200) {
      console.log("RESPONSE");
      //console.log(response);
      return response;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
}

export default function SearchResults() {
  let { query } = useParams();
  //console.log(query);
  const navigate = useNavigate();
  const [searchText, setSearch] = useState(query);
  // const [submitState, setSubmit] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    navigate(`/list/${searchText}`);
  };

  function checkSearch(text) {
    if (text == "undefined") {
      return "";
    } else {
      return searchText;
    }
  }

  return (
    <div className="container">
      {/* {submitState && <Navigate to={`/list/${searchText}`}/>} */}
      <form
        class="input-group row mt-3 mt-md-5 justify-content-center gx-0 sticky-top"
        noValidate
        onSubmit={handleSearch}
      >
        <div class="col-7">
          <input
            type="text"
            id="form1"
            className="form-control form-control-lg"
            placeholder="Search"
            aria-label="Search"
            onChange={(t) => setSearch(t.target.value)}
            value={checkSearch(searchText)}
            optional="true"
          />
        </div>
        <button type="submit" class="btn btn-primary col-1 gx-100">
          <i class="bi bi-search"></i>
        </button>
      </form>
      <div className="row mt-5">
        <ItemList
          getResponse={getItems(query)}
          error={`"${query}" not found`}
        />
      </div>
    </div>
  );
}
