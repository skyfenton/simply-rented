import ItemCard from "./ItemCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

async function getItems(query) {
  try {
    const response = await axios.get(
      "http://localhost:5000/searchItems?query=" + query
    );
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default function ItemList() {
  let { query } = useParams();
  const [itemData, setItems] = useState("");

  useEffect(() => {
    getItems(query).then((res) => {
      if (res.data.result.length > 0) {
        setItems(res.data.result);
        console.log(res);
      }
      else {
        console.log("no items");
        setItems(["No items found with query", query].join(": "));
      }
    });
  }, []);

  console.log(itemData);
  // if (typeof itemData == "string") {
  //   var items = itemData;
  // }
  // else {
  //   items = JSON.stringify(itemData);
  // }

  const items = itemData
    ? itemData.map((data, i) => {
        return <ItemCard key={i} title={data.itemName} />;
      })
    : null;

  // console.log(items);
  
  return (
    <div className="container-lg">
      <div className="row">
        {items}
      </div>
    </div>
  );
}
