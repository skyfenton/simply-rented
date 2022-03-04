import React from "react";
// import axios from "axios";
import "./Home.css"; 

function startRotating(obj) {
    var current = obj,
        next = current.next(),
        prev = current.prev();
    var flipNow = setTimeout(function(){
        prev.addClass("top");
        current.addClass("normal");
    }, 500);
    
    var t = setTimeout(function(){
        if(current.index() == 4){
            clearTimeout(t);
        } else {
            startRotating(next);
        }
    },1500);
}

export default class Home extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      searchText: null 
    }
    this.cubeRef = React.createRef();
  }

  handleSearch = async (e) => {
    e.preventDefault();
    navigate("/list/"+this.searchText);
  };

  render() {
    startRotating(cube);
    return (
      <>
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
}
