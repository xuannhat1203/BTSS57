import { Route, Routes } from "react-router-dom";
import ListProducts from "./Components/ListProducts";
import Update from "./Components/Update";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/products" element={<ListProducts />} />
        <Route path="/products/update" element={<Update />} />
      </Routes>
    </>
  );
}
