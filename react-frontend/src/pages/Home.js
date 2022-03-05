import React from "react";
// import axios from "axios";
import { Navigate } from "react-router-dom";
import "./Home.css";

const splashWords = [
  "Anything",
  "Surfboards",
  "Projectors",
  "People",
  "Tents",
  "Chairs",
  "Grills",
  "Dust",
  "Deez",
];

function startRotating(cube) {
  console.log(cube);
  setTimeout(function () {
    cube.children[0].classList.add("bot");
    cube.children[1].classList.add("normal");
  }, 500);

  // var t = setTimeout(function () {
  //   startRotating(children[1]);
  // }, 1500);
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
    startRotating(this.cubeRef.current);
  }

  render() {
    // startRotating(cube);
    let { submit } = this.state;
    return (
      <>
        {submit && <Navigate to={`/list/${this.searchText}`} />}
        <div className="d-flex justify-content-center">
          <div className="pe-4 splash-header">
            <h1 class="display-1">Rent</h1>
          </div>
          <div className="align-self-end cube" ref={this.cubeRef}>
            <div className="normal">
              <span>
              <h1 class="display-1">Anything</h1>
              </span>
            </div>
            <div>
              <span>
              <h1 class="display-1">More</h1>
              </span>
            </div>
          </div>
        </div>
        <div classname="d-flex justify-content-center">
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
