import { Route, Routes } from "react-router-dom";
import ListProduct from "./Components/ListProduct";
import AddItem from "./Components/AddItem";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/products" element={<ListProduct></ListProduct>}></Route>
        <Route path="/create" element={<AddItem></AddItem>}></Route>
      </Routes>
    </>
  );
}
