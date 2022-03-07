import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const navigate = useNavigate();
  const [searchText, setSearch] = useState();

  const handleSearch = async (e) => {
    e.preventDefault();
    navigate("/list/" + searchText);
  };

  return (
    <>
      <div className="container position-relative">
        <h1>
          <i>Home</i>
        </h1>
        <form
          class="input-group row mt-5 justify-content-md-center gx-0"
          onSubmit={handleSearch}
        >
          <div class="w-50">
            <input
              type="text"
              id="form1"
              className="form-control form-control-lg"
              placeholder="Search"
              aria-label="Search"
              onChange={(t) => setSearch(t.target.value)}
            />
          </div>
          <button type="submit" class="btn btn-primary col-1">
            <i class="bi bi-search"></i>
          </button>
        </form>
      </div>
    </>
  );
}
