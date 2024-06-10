import { useState, useEffect } from "react";
import "../App.css";
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  create_at: string;
}
export default function DeleteItem() {
  const [item, setItem] = useState<Product[]>([]);
  useEffect(() => {
    fetch("http://localhost:3400/products")
      .then((response) => response.json())
      .then((data) => setItem(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  return (
    <div className="App">
      <h1>Product List</h1>
      <div className="product-list">
        {item.map((product) => (
          <div key={product.id} className="product">
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>Price: ${product.price}</p>
            <p>Quantity: {product.quantity}</p>
            <p>
              Created at: {new Date(product.create_at).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
