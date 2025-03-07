import React from "react";
import "./../../Components/MenuList/MenuList.css";
import { assets, menu_list } from "../../asset/assets";

export default function MenuList({ category, setCategory }) {
  return (
    <div className="explore-menu">
      <h1>Explore Our Menu</h1>
      <p>Choose from our best menu</p>
      <div className="explore-menu-list">
        {menu_list.map((el, index) => (
          <div
            onClick={() =>
              setCategory((prev) =>
                prev === el.menu_name ? "All" : el.menu_name
              )
            }
            className="menu-list-item"
            key={index}
          >
            <img className={category === el.menu_name ? 'active':''}src={el.menu_image} alt={el.menu_name} />
            <p>{el.menu_name}</p>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
}
