import {Link} from "react-router-dom";

export default function Card(props){
  return(
    <div class="col-md-auto">
      <Link to="/" class="card" style={{width: "12rem"}}>
        <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffreesvg.org%2Fimg%2FPlaceholder.png&f=1&nofb=1" class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">{props.title}</h5>
        </div>
      </Link>
    </div>
  );
}