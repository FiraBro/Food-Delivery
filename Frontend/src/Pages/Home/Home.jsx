import React, { useState } from "react";
import Header from "../../Components/Header/Header";
import MenuList from "../../Components/MenuList/MenuList";
import Foodisplay from "../../Components/Foodisplay/Foodisplay";
export default function Home() {
  const [category, setCategory] = useState("All");
  return (
    <div className="home">
      <Header />
      <MenuList category={category} setCategory={setCategory} />
      <Foodisplay category={category} />
    </div>
  );
}
