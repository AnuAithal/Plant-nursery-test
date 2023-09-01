import React, { useEffect, useState } from "react";
import "../../styles/UserPlantDetails.css";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserCart from "./UserCart";
import ScrollToTop from "../../ScrollToTop";

const UserPlantDetails = ({
  setCartItemCount,
  cartVisible,
  cartItemCount,
  onClose,
}) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const userId = userData.id;

  console.log("getting data from plant details --->", userData);

  const { id } = useParams();
  const [plant, setPlant] = useState();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch(`http://13.50.136.16:8080/getProductById/${id}`)
      .then((response) => response.json())
      .then((data) => setPlant(data))
      .catch((error) => console.error("Error fetching plant data:", error));
  }, []);

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleAddToCart = async () => {
    const cartData = {
      user: {
        id: userId,
      },
      product: {
        id: plant.id,
      },
      quantity: quantity,
    };

    try {
      const response = await fetch("http://13.50.136.16:8080/customer/addToCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartData),
      });

      if (response.ok) {
        setCartItemCount((prevCount) => prevCount + quantity);
        toast.success("🪴Plant added to cart successfully!");
      } else {
        toast.info("🪴Plant already added to cart!");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div>
      <ScrollToTop/>
      <ToastContainer theme="light" autoClose={2900} hideProgressBar />
      {/* <div className="user-plant-details-container">     */}
      <div className="plant-details-content">
        <div className="image-container">
          <img
            className="plant-details-image"
            src={plant?.imageUrl}
            alt={plant?.productName}
            width={500}
          />
        </div>
        <div className="plant-details">
          <div style={{ margin: "20px", marginTop: "20px" }}>
            <h1 className="plant-details-name">{plant?.productName}</h1>
            <p className="plant-details-rating">{plant?.rating}⭐</p>
            <p className="plant-details-price">₹{plant?.price}</p>

            <div className="quantity-control">
              <div>
                <button
                  className="quantity-button"
                  onClick={handleDecreaseQuantity}
                >
                  -
                </button>
                <span className="quantity">{quantity}</span>
                <button
                  className="quantity-button"
                  onClick={handleIncreaseQuantity}
                >
                  +
                </button>
              </div>

              <div
                className={`stock ${
                  plant?.stockStatus ? "in-stock" : "out-of-stock"
                }`}
              >
                {plant?.stockStatus ? "In Stock" : "Out of Stock"}
              </div>
            </div>

            <button
              className="add-to-cart-button"
              disabled={!plant?.stockStatus}
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <div className="about-container">
        <div className="about-plant-container">
          <div className="about-plant-items">
            <div>
              <h2 className="about-plant-heading">About the Plant</h2>
              <p className="about-plant-text">{plant?.description}</p>
            </div>
          </div>
        </div>
      </div>
      {cartVisible && (
        <UserCart
          cartItemCount={cartItemCount}
          setCartItemCount={setCartItemCount}
          onClose={onClose}
        />
      )}
    </div>
  );
};

export default UserPlantDetails;
