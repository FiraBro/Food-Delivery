import { createContext, useEffect, useState } from "react";
import axios from "axios";

// Create the context
export const StoreContext = createContext(null);

// Define the provider component
const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [food_list, setFood_list] = useState([]);
  const IMAGEURL = "http://localhost:3000";

  // Add item to cart
  const addCartItem = async (itemID) => {
    setCartItems((prev) => ({
      ...prev,
      [itemID]: (prev[itemID] || 0) + 1,
    }));
    if (token) {
      await axios.post(
        IMAGEURL + "/api/v1/cart/add",
        { itemID },
        { headers: { token } }
      );
    }
  };

  // Remove item from cart
  const removeCartItem = async (itemID) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev, [itemID]: prev[itemID] - 1 };
      if (updatedCart[itemID] <= 0) {
        delete updatedCart[itemID];
      }
      return updatedCart;
    });
    if (token) {
      await axios.post(
        IMAGEURL + "/api/v1/cart/delete",
        { itemID },
        { headers: { token } }
      );
    }
  };

  // Calculate subtotal
  const getSubTotal = () => {
    let subTotal = 0;
    food_list.forEach((el) => {
      if (cartItems[el._id] > 0) {
        subTotal += el.price * Number(cartItems[el._id]);
      }
    });
    return subTotal;
  };

  // Calculate delivery fee (fixed for now)
  const getDelivery = () => {
    return 5; // Fixed delivery fee
  };

  // Calculate total
  const getTotal = () => {
    return getSubTotal() + getDelivery();
  };

  // Fetch food list from the server
  const fetchList = async () => {
    try {
      const url = "http://localhost:3000/api/v1/food/list";
      const response = await axios.get(url);
      setFood_list(response.data.data);
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  };
  const loadCartData = async (token) => {
    const res = await axios.post(
      IMAGEURL + "/api/v1/cart/fetch",
      {},
      { headers: { token } }
    );
    setCartItems(res.data.cartData);
  };

  // Fetch food list when the component mounts
  useEffect(() => {
    async function loadData() {
      await fetchList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  // Context value
  const contextValue = {
    food_list,
    cartItems,
    addCartItem,
    removeCartItem,
    getSubTotal,
    getDelivery,
    getTotal,
    setToken,
    token,
    IMAGEURL,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

// Export the provider component
export default StoreContextProvider;
