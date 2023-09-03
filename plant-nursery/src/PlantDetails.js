import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "./ScrollToTop";

const PlantDetails = () => {
  const { id } = useParams();
  const [plant, setPlant] = useState();
  const [quantity, setQuantity] = useState(1);

  console.log("the iddddd", id);

  useEffect(() => {
    fetch(`http://13.50.185.10:8080/getProductById/${id}`)
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

  const handlePleaseLogin = () => {
    toast.info("🪴Please login to order plant");
  };

  return (
    <div style={{ paddingTop: "55px" }}>
      <ScrollToTop />
      <ToastContainer theme="light" autoClose={2900} hideProgressBar />
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
            <p className="plant-details-rating">4.9⭐</p>
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
              onClick={handlePleaseLogin}
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
    </div>
  );
};

export default PlantDetails;
