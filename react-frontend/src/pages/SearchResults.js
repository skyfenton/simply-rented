import ItemCard from "./ItemCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
          queryResponse={getItems(query)}
          error={`"${query}" not found`}
        />
      </div>
    </div>
  );
}

function ItemList(props) {
  const [items, setItems] = useState(null);

  useEffect(() => {
    props.promise.then(
      (res) => {
        if (res.data && res.data.result.length > 0) {
          setItems(res.data.result);
          console.log(items);
        } else {
          setItems(null);
        }
      },
      (error) => {
        console.error("onRejected function called: " + error.message);
      }
    );
  });

  // console.log(props.items);
  return items !== null ? (
    items.map((data, i) => {
      return <ItemCard key={i} title={data.itemName} />;
    })
  ) : (
    <h2 text-align="center">{props.error}</h2>
  );
}
