import React, { useEffect, useState } from "react";
import "../../styles/Navbar.css";
import { useLocation, useNavigate } from "react-router-dom";

const UserNavbar = ({ onCartIconClick }) => {
  // const [cartItemsData, setCartItemsData] = useState([]);
  // const userData = JSON.parse(localStorage.getItem("userData"));
  // const userId = userData.id;

  const navigate = useNavigate();
  const location = useLocation();


  return (
    <div>
      <nav className="navbar navbar-fixed ">
        <div className="container-fluid">
          <div className="d-flex align-items-center">
            <img
              src="https://see.fontimg.com/api/renderfont4/BXew/eyJyIjoiZnMiLCJoIjoxMTcsInciOjE1MDAsImZzIjo3OCwiZmdjIjoiIzBFOUYyQiIsImJnYyI6IiNGRkZGRkYiLCJ0IjoxfQ/cHJha3JpdGk/samarkan-oblique.png"
              width={120}
            />

            <div className="navBar-nav">
              <a
                className={`nav-link ${location.pathname === "/userHome" ? "active" : ""}`}
                aria-current="page"
                href="/userHome"
              >
                Home
              </a>
              <a className={`nav-link ${location.pathname === "/userPlants" ? "active" : ""}`} href="/userPlants">
                Plants
              </a>
            </div>
          </div>
          <div className="d-flex align-items-center ">
            <img
            className="profile-image"
              src="https://cdn-icons-png.flaticon.com/128/5582/5582872.png"
              style={{ width: "30px", cursor: "pointer" }}
              alt="Profile Icon"
              onClick={() => {
                navigate("/userProfile");
              }}
            />
            <div className="cart-icon ">
              <img
              className="cart-image"
                src="https://cdn-icons-png.flaticon.com/128/9485/9485826.png"
                style={{ width: "30px", cursor: "pointer" }}
                alt="Cart Icon"
                onClick={onCartIconClick}
              />
              
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default UserNavbar;
