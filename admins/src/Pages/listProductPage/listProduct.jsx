import axios from "axios";
import React, { useEffect, useState, useCallback } from "react"; // Import useCallback
import { toast } from "react-toastify";
import "./ListProduct.css";

export default function ListProduct() {
  const [list, setList] = useState([]);
  const API_URL_LIST = "http://localhost:3000/api/v1/food/list";

  // Wrap fetchList with useCallback
  const fetchList = useCallback(async () => {
    try {
      const response = await axios.get(API_URL_LIST);
      console.log(response);
      if (response.data.status) {
        setList(response.data.data);
      }
    } catch (error) {
      toast.error("An error occurred while fetching data");
    }
  }, []);

  const removeItem = async (foodID) => {
    const response = await axios.post(
      "http://localhost:3000/api/v1/food/remove",
      { id: foodID }
    );
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, [fetchList]);
  return (
    <div className="list add flex-col">
      <p>All Food</p>
      <div className="list-table">
        <div className="list-table-format tittle">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div className="list-table-format" key={index}>
              <img
                src={`http://localhost:3000/images/${item.image}`}
                alt={item.name}
              />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}</p>
              <button onClick={() => removeItem(item._id)} className="cursor">
                x
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
