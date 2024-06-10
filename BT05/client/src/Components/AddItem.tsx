import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  create_at: string;
}

export default function AddItem() {
  const [item, setItem] = useState<Product>();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3500/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: 6,
            name: "Product 6",
            price: 400,
            image: "https://via.placeholder.com/150",
            quantity: 40,
            create_at: "2024-01-04T10:00:00Z",
          }),
        });

        if (response.ok) {
          const data: Product = await response.json();
          setItem(data);
        } else {
          console.error("Thêm sản phẩm không thành công");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchProducts();
  }, []);
  if (item) {
    return <Navigate to="/products" />;
  }
  return <></>;
}
