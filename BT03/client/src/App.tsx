import { Route, Routes } from "react-router-dom";
import ListProducts from "./Components/ListProducts";
import Item from "./Components/Item";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/products" element={<ListProducts></ListProducts>}></Route>
        <Route path="/products/:id" element={<Item></Item>}></Route>
      </Routes>
    </>
  );
}
