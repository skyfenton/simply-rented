import axios from "axios";
import { useParams } from "react-router-dom";
import ItemList from "./ItemList";

async function getItems(query) {
  try {
    const response = await axios.get(
      "http://localhost:5000/searchItems?query=" + query
    );
    if (response.status === 200) {
      console.log("RESPONSE");
      console.log(response);
      return response;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
}

export default function SearchResults() {
  let { query } = useParams();
  console.log(query);

  return (
    <div className="container">
      <div className="row">
        <ItemList
          getResponse={getItems(query)}
          error={`"${query}" not found`}
        />
      </div>
    </div>
  );
}
