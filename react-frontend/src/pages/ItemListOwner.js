import ItemCard from "./ItemCardOwner";
import { useEffect, useState } from "react";

export default function ItemList(props) {
  const [items, setItems] = useState(null);

  useEffect(() => {
    props.getResponse.then(
      (res) => {
        if (res.data && res.data.result.length > 0) {
          setItems(res.data.result);
          //console.log(items);
        } else {
          setItems(null);
        }
      },
      (error) => {
        console.error("onRejected function called: " + error.message);
      }
    );
  });

  console.log(props);
  return items !== null ? (
    items.map((data, i) => {
      return (
        <ItemCard
          key={i}
          user={props.owner}
          title={data.itemName}
          image={data.image}
          id={data._id}
        />
      );
    })
  ) : (
    <h2 text-align="center">{props.error}</h2>
  );
}
