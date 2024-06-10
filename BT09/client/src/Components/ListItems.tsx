import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import AddItemModal from "./AddItemModal";

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
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

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
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this item!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3800/Items/${id}`, {
          method: "DELETE",
        }).then((response) => {
          if (response.ok) {
            setStatus((prevStatus) => !prevStatus);
            Swal.fire("Deleted!", "Your item has been deleted.", "success");
          } else {
            Swal.fire(
              "Failed!",
              "There was an issue deleting the item.",
              "error"
            );
          }
        });
      }
    });
  };

  const handleAddItem = async (item: Items) => {
    try {
      const response = await fetch("http://localhost:3800/Items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });
      if (response.ok) {
        setStatus((prevStatus) => !prevStatus);
      } else {
        console.log("Error adding item");
      }
    } catch (error) {
      console.log("Error adding item:", error);
    }
  };

  return (
    <>
      <button onClick={() => setModalIsOpen(true)}>Thêm sản phẩm mới</button>
      <AddItemModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        onAddItem={handleAddItem}
      />
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Tên sản phẩm</th>
            <th>Hình ảnh</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Ngày thêm</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: "50px" }}
                />
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
      </table>
    </>
  );
}
