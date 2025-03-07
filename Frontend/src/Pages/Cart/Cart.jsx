

import React, { useContext } from "react";
import { StoreContext } from "../../Context/Context";
import "../../Pages/Cart/Cart.css";
import { useNavigate } from "react-router-dom";

export default function Cart({ login }) {
  const {
    cartItems,
    food_list,
    removeCartItem,
    getSubTotal,
    getDelivery,
    getTotal,
    IMAGEURL,
  } = useContext(StoreContext);
  const navigate = useNavigate();

  const delivery = getDelivery();
  const subTotal = getSubTotal();
  const total = getTotal();

  return (
    <>
      {login ? ( // Show cart when logged in (login = true)
        <div className="cart">
          <div className="cart-item">
            <div className="cart-item-head">
              <p className="stay">Items</p>
              <p>Title</p>
              <p className="stay">Price</p>
              <p>Quantity</p>
              <p>Total</p>
              <p className="stay">Remove</p>
            </div>
            <br />
            <hr />
            <div className="cart-list-items">
              {food_list.map((el) => {
                if (cartItems[el._id] > 0) {
                  const sum = el.price * Number(cartItems[el._id]);
                  return (
                    <div key={el._id} className="cart-list">
                      <img
                        src={IMAGEURL + "/images/" + el.image}
                        alt={el.name}
                      />
                      <p>{el.name}</p>
                      <p className="price">{el.price}</p>
                      <p>{cartItems[el._id]}</p>
                      <p>{sum}</p>
                      <button onClick={() => removeCartItem(el._id)}>x</button>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
          <div className="cart-total">
            <div className="total">
              <div className="cart-sub-total">
                <h2>Cart Totals</h2>
                <div className="sub-total-detail">
                  <span>Subtotals</span>
                  <span>${subTotal}</span>
                </div>
                <hr />
                <div className="cart-delivery">
                  <span>Delivery Fee</span>
                  <span>${delivery}</span>
                </div>
                <hr />
                <div className="cart-items-total">
                  <span>Total</span>
                  <span>${total}</span>
                </div>
                <button onClick={() => navigate("/order")}>
                  Proceed to CheckOut
                </button>
              </div>
              <div className="cart-promo">
                <p>If you have promo code get discount</p>
                <div className="prome-code-input">
                  <input type="number" placeholder="Enter promo code..." />
                  <button>Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Please login to view your cart</p> // Show message when not logged in
      )}
    </>
  );
}
