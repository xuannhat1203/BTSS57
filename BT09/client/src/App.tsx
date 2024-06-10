import React from "react";
import AddItemModal from "./Components/AddItemModal";
import ListItems from "./Components/ListItems";

export default function App() {
  return (
    <div className="App">
      <table>
        <ListItems />
      </table>
    </div>
  );
}
