import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  create_at: string;
}

export default function Item() {
  const [item, setItem] = useState<Product | undefined>(undefined);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3300/products/${id}`)
        .then((response) => response.json())
        .then((data) => setItem(data))
        .catch((error) => alert("không tìm thấy"));
    }
  }, [id]);

  return (
    <div>
      {item ? (
        <div>
          <h1>{item.name}</h1>
          <p>Price: ${item.price}</p>
          <img src={item.image} alt={item.name} />
          <p>Quantity: {item.quantity}</p>
          <p>Created at: {item.create_at}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
