import React from "react";
// import axios from "axios";
import { Navigate } from "react-router-dom";
import "./Home.css";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

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

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: null,
      submit: false,
      splashIndex: 0
    };
    // this.rotate = this.rotate.bind(this);
    this.cubeRef = React.createRef();
  }

  rotate = () => {
    let curr_i = this.state.splashIndex;
    setTimeout(() => {
      this.setState({splashIndex: curr_i < splashWords.length - 1 ?
        curr_i+1 : 0});
    }, 3500);
  
    // var t = setTimeout(function () {
    //   startRotating(children[1]);
    // }, 1500);
  }

  handleSearch = async (e) => {
    e.preventDefault();
    this.setState({ submit: true });
  };

  componentDidMount() {
    this.rotate();
  }

  render() {
    let { submit } = this.state;
    return (
      <>
        {submit && <Navigate to={`/list/${this.searchText}`} />}
        <div className="d-flex justify-content-center">
          <div className="pe-3 pe-md-4 splash-text">
            <h1 class="display-1">Rent</h1>
          </div>
          <TransitionGroup className="align-self-end cube" ref={this.cubeRef}>
            <CSSTransition
              key={this.state.splashIndex}
              timeout={500}
              classNames="side"
              onExited={this.rotate}
            >
              <div className="normal splash-text">
                <span>
                <h1 class="display-1">{splashWords[this.state.splashIndex]}</h1>
                </span>
              </div>
            </CSSTransition>
              {/* <div>
                <span>
                <h1 class="display-1">More</h1>
                </span>
              </div>
              <div>
                <span>
                <h1 class="display-1">Something</h1>
                </span>
              </div> */}
          </TransitionGroup>
        </div>
        <div classname="d-flex justify-content-center">
          <form
            class="input-group row mt-3 mt-md-5 justify-content-center gx-0"
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
                required
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
