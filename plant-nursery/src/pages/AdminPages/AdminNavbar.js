import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/AdminNavbar.css";

const AdminNavbar = ({setRole}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userData");
    setIsDropdownOpen(false);
    setRole(null);
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar navbar-fixed ">
        <div className="container-fluid">
          <div className="d-flex align-items-center">
            <img
              src="https://see.fontimg.com/api/renderfont4/BXew/eyJyIjoiZnMiLCJoIjoxMTcsInciOjE1MDAsImZzIjo3OCwiZmdjIjoiIzBFOUYyQiIsImJnYyI6IiNGRkZGRkYiLCJ0IjoxfQ/cHJha3JpdGk/samarkan-oblique.png"
              width={120}
            />
          </div>
          <div className="d-flex align-items-center profile-image">
            <img
              src="https://cdn-icons-png.flaticon.com/128/5582/5582872.png"
              style={{ width: "30px", cursor: "pointer" }}
              alt="Profile Icon"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            />
            {isDropdownOpen && (
              <div className="dropdown">
                <button className="dropdown-item" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default AdminNavbar;
