import axios from "axios";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ItemList from "./ItemList";

async function getItems(query) {
  try {
    //console.log(query);
    const response = await axios.get(
      "http://localhost:5000/searchItems?query=" + query
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
    if(searchText)
      navigate(`/list/${searchText}`);
  };


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
            onChange={(t) => (setSearch(t.target.value))}
            value = {searchText}
            required
          />
        </div>
        <button type="submit" class="btn btn-primary col-1">
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
