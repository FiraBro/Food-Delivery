import React, { useContext } from "react";
import "./Foodisplay.css";
import { StoreContext } from "../../Context/Context";
import FoodItem from "../FoodItem/FoodItem";
export default function Foodisplay({category}) {
  const { food_list } = useContext(StoreContext);
  return (
    <div className="foodisplay" id="foodisplay">
      <h2>Top dishes near you</h2>
      <div className="foodisplay-list">
        {food_list.map((el, index) => {
          if (category === "All" || category === el.category) {
            return <FoodItem el={el} key={index} />;
          }
        })}
      </div>
    </div>
  );
}
