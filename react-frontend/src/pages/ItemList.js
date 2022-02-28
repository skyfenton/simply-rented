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
      if (res) {
        setItems(res.data.result[0]);
        console.log(res.data.result[0].values);
      }
    });
  }, []);

  var items = JSON.stringify(itemData)
  
  console.log(items);
  // const items = itemData
    // ? itemData.map((data, i) => {
    //     return <ItemCard key={i} title={data.item} />;
    //   })
    // : null;
  
  console.log(items);
  return (
    <div className="container-lg">
      <div className="row">
        {console.log(itemData)}
        {items}
      </div>
    </div>
  );
}
