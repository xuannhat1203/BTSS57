import { useEffect, useState } from "react";

interface Items {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  create_at: string;
}

export default function ListItems() {
  const [items, setItems] = useState<Items[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const infor = await fetch("http://localhost:3700/Items");
        const data: Items[] = await infor.json();
        setItems(data);
      } catch (error) {
        console.log("lỗi");
      }
    };
    fetchItems();
  }, []);

  return (
    <tbody>
      {items.map((item) => (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>
            <img src={item.image} alt={item.name} style={{ width: "50px" }} />
          </td>
          <td>{item.price}</td>
          <td>{item.quantity}</td>
          <td>{new Date(item.create_at).toLocaleDateString()}</td>
          <td>
            <button>Sửa</button>
            <button>Xóa</button>
          </td>
        </tr>
      ))}
    </tbody>
  );
}
