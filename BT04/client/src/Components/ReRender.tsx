import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../App.css";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  create_at: string;
}

export default function ReRender() {
  const [item, setItem] = useState<Product[]>([]);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const deleteProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3400/products/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          alert("Xóa thành công");
          navigate("/product");
        } else {
          alert("Không tìm thấy sản phẩm");
        }
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    };
    deleteProduct();
  }, [id, navigate]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3400/products");
        const data = await response.json();
        setItem(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProducts();
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
