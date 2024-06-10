import { useEffect, useState } from "react";
import swal from "sweetalert";

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
  const [status, setStatus] = useState<boolean>(false);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const infor = await fetch("http://localhost:3800/Items");
        const data: Items[] = await infor.json();
        setItems(data);
      } catch (error) {
        console.log("lỗi");
      }
    };
    fetchItems();
  }, [status]);

  const handleDelete = (id: number) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this item!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch(`http://localhost:3800/Items/${id}`, {
          method: "DELETE",
        }).then((response) => {
          if (response.ok) {
            setStatus((prevStatus) => !prevStatus);
            swal("Deleted!", "Your item has been deleted.", "success");
          } else {
            swal("Failed!", "There was an issue deleting the item.", "error");
          }
        });
      } else {
        swal("Your item is safe!");
      }
    });
  };

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
            <button onClick={() => handleDelete(item.id)}>Xóa</button>
          </td>
        </tr>
      ))}
    </tbody>
  );
}
