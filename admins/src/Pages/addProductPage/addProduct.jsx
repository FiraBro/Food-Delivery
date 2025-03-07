import React, { useState } from "react";
import letterU from "./../../assets/letter-us.png";
import axios from "axios";
import "./addProduct.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddProduct() {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const API_URL = "http://localhost:3000/api/v1/food/add";
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("price", Number(data.price));
    formData.append("image", image);

    try {
      const response = await axios.post(API_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("API Response:", response.data);

      if (response.data.success) {
        // Clear the form fields
        setData({
          name: "",
          description: "",
          price: "",
          category: "Salad",
        });
        setImage(null); // Clear the image
        toast.success(response.data.message); // Show success toast
      } else {
        console.error("Failed to add product:", response.data.message);
        toast.error(response.data.message); // Show error toast
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error(response.data.message); // Show error toast
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={handleSubmit}>
        <div className="add-image-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : letterU}
              alt="Product"
              className="letterU"
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            required
            hidden
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            onChange={handleOnChange}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type product name..."
            required
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Add Description</p>
          <textarea
            onChange={handleOnChange}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Type a description..."
            required
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Add Category</p>
            <select
              onChange={handleOnChange}
              name="category"
              id="category"
              value={data.category}
              required
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Dessert">Dessert</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Add Price</p>
            <input
              onChange={handleOnChange}
              value={data.price}
              type="number"
              name="price"
              placeholder="$20"
              required
            />
          </div>
        </div>
        <button type="submit" className="add-btn">
          Add
        </button>
      </form>
    </div>
  );
}
