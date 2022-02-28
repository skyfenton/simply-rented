import {Link} from "react-router-dom";

export default function ItemCard(props){
  return(
    <div className="col-6 col-sm-4 col-md-3 col-xl-2">
      <Link to="/" className="card mb-5 box-shadow" >
        <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffreesvg.org%2Fimg%2FPlaceholder.png&f=1&nofb=1" className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
        </div>
      </Link>
    </div>
  );
}