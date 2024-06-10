import { useEffect, useState } from "react";
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  create_at: string;
}
export default function GetData() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:3200/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  console.log(products);

  return (
    <div className="App">
      <h1>Product List</h1>
      <div className="product-list">
        {products.map((product) => (
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
