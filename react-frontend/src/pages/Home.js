import React from "react";
// import axios from "axios";
import { Navigate } from "react-router-dom";
import "./Home.css";

const splashWords = [
  "anything",
  "surfboards",
  "projectors",
  "people",
  "tents",
  "chairs",
  "grills",
  "dust",
  "deez",
];

function startRotating(curr, prev) {
  console.log(curr);
  setTimeout(function () {
    curr.previousElementSibling.classList.add("bot");
    curr.classList.add("normal");
  }, 500);

  var t = setTimeout(function () {
    startRotating(curr.nextElementSibling);
  }, 1500);
}

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: null,
      submit: false,
    };
    this.cubeRef = React.createRef();
  }

  handleSearch = async (e) => {
    e.preventDefault();
    this.setState({ submit: true });
  };

  componentDidMount() {
    startRotating(this.cubeRef.current.children[1]);
  }

  render() {
    // startRotating(cube);
    let { submit } = this.state;
    return (
      <>
        {submit && <Navigate to={`/list/${this.searchText}`} />}
        <div className="container position-relative">
          <div className="row justify-content-center align-items-center">
            <div className="col-sm-auto splash-header ">
              <h1 class="display-1">Rent</h1>
            </div>
            <div class="col-sm-4 cube" ref={this.cubeRef}>
              <div class="normal">
                <span>1st Panel</span>
              </div>
              <div>
                <span>2nd Panel</span>
              </div>
            </div>
          </div>
          <form
            class="input-group row mt-5 justify-content-md-center gx-0"
            onSubmit={this.handleSearch}
          >
            <div class="w-50">
              <input
                type="text"
                id="form1"
                className="form-control form-control-lg"
                placeholder="Search"
                aria-label="Search"
                onChange={(t) => (this.searchText = t.target.value)}
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
}
