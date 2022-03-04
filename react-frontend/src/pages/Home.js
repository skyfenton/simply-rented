import React from "react";
// import axios from "axios";
import { Navigate } from "react-router-dom";
import "./Home.css"; 

function startRotating(curr, prev) {
    console.log(curr);
    var flipNow = setTimeout(function(){
        curr.previousElementSibling.classList.add("top");
        curr.classList.add("normal");
    }, 500);
    
    var t = setTimeout(function(){
        if(curr.nextElementSibling){
          startRotating(curr.nextElementSibling);
        } else {
          clearTimeout(t);
        }
    },1500);
}

export default class Home extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      searchText: null,
      submit: false
    }
    this.cubeRef = React.createRef();
  }

  handleSearch = async (e) => {
    e.preventDefault();
    this.setState({submit: true});
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
          <div class="cube" ref={this.cubeRef}>
            <div class="initialpanel normal"><span>1st Panel</span></div>
            <div><span>2nd Panel</span></div>
            <div><span>3rd Panel</span></div>
            <div><span>4th Panel</span></div>
            <div><span>5th Panel</span></div>
          </div>
          <h1>
            <i>Home</i>
          </h1>
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
                onChange={(t) => this.searchText = t.target.value}
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
