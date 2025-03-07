import React, { useContext } from "react";
import "../../Components/FoodItem/FoodItem.css";
import { assets } from "../../asset/assets";
import { StoreContext } from "../../Context/Context";
export default function FoodItem({ el }) {
  const { cartItems, addCartItem, removeCartItem,IMAGEURL } = useContext(StoreContext);
  // const IMAGEURL = 'http://localhost:3000'
  return (
    <div className="foodisplay">
      <div className="food-item-image-container">
        <img className="food-item-image" src={IMAGEURL+"/images/"+el.image} alt="" />
        {!cartItems[el._id] ? (
          <img
            className="add"
            onClick={() => addCartItem(el._id)}
            src={assets.add_icon_white}
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => removeCartItem(el._id)}
              src={assets.remove_icon_red}
              alt=""
            />
            <p>{cartItems[el._id]}</p>
            <img
              onClick={() => addCartItem(el._id)}
              src={assets.add_icon_green}
              alt=""
            />
          </div>
        )}
      </div>
      <div className="item-list-info">
        <div className="food-item-name-rating">
          <p>{el.name}</p>
        </div>
      </div>
      <p className="food-item-desc">{el.description}</p>
      <p className="food-item-price">${el.price}</p>
    </div>
  );
}
