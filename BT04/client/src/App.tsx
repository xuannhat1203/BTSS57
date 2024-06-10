import { Route, Routes } from "react-router-dom";
import DeleteItem from "./Components/DeleteItem";
import ReRender from "./Components/ReRender";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/products" element={<DeleteItem></DeleteItem>}></Route>
        <Route path="/products/:id" element={<ReRender></ReRender>}></Route>
      </Routes>
    </>
  );
}
