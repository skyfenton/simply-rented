import { Link } from "react-router-dom";
import DetailedView from "./DetailedView";
import axios from "axios";
import baby from "../stockImages/baby.png";
//import surfboard from ".."

async function handleClick(props) {
  try {
    const response = await axios.get("http://localhost:5000/items/" + props.id);
    console.log("happy");
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default function ItemCard(props) {
  var path = "/item/" + props.id;
  console.log("tires");
  console.log(props.id);
  return (
    <div className="col-6 col-sm-4 col-md-3 col-xl-2">
      <Link
        to={path}
        onClick={handleClick(props)}
        component={
          <DetailedView
            title={props.title}
            descrip={props.descrip}
            rate={props.rate}
            avail={props.avail}
            id={props.id}
          />
        }
        className="card mb-5 box-shadow"
      >
        <img
          src={baby}
          //src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffreesvg.org%2Fimg%2FPlaceholder.png&f=1&nofb=1"
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
        </div>
      </Link>
    </div>
  );
}
