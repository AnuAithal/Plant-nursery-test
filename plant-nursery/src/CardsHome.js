import React from "react";
import "./styles/CardsHome.css";
import plantsData from "./plantsData";
import { useNavigate } from "react-router-dom";

const CardsHome = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="intro-section">
        <h2 className="section-heading">Welcome to Plant Nursery</h2>
        <h1
          style={{ fontWeight: "bold", fontSize: "1.44em", color: "#1D965A" }}
        >
          "Experience the magic of growing plants"
        </h1>
        <p className="section-text">
          Explore our wide range of plants, flowers, and gardening supplies.
          Whether you're an experienced gardener or just starting out, we have
          everything you need to bring life and color to your outdoor space.
        </p>
      </div>
      <div className="card-row-heading">
        <img
          src="https://www.ugaoo.com/cdn/shop/files/New-Plants_2x_d5110dfd-b698-4342-ba8d-9aa908711a32_small.png"
          alt="icon"
          width={40}
        />
        <h1 style={{ fontWeight: "bold", fontSize: "35px" }}>
          Featured Plants
        </h1>
      </div>
      <div className="card-row">
        {plantsData.map((plant, index) => (
          <div class="card" key={index}>
            <img src={plant.image} class="card-img-top" alt={plant.name} />
            <div class="card-body">
              <h5 class="card-title">{plant.name}</h5>
              <p class="card-text">{plant.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div>
        <div className="gif-div">
          <img src="https://www.ugaoo.com/cdn/shop/files/Subscription_Stop_Motion.gif?v=1666090774&width=500" />
          <div className="gif-items">
            <p className="gif-text">
              Shop now and explore our collection of plants and gardening tools.
            </p>
            <button
              className="gif-button"
              onClick={() => {
                navigate("/plants");
              }}
            >
              SHOP NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardsHome;
