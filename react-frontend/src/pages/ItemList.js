import ItemCard from "./ItemCard";
import { useEffect, useState } from "react";

export default function ItemList(props) {
  const [items, setItems] = useState(null);

  useEffect(() => {
    props.getResponse.then(
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
