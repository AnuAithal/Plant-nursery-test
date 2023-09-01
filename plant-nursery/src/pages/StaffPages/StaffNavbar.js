import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/AdminNavbar.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StaffNavbar = ({ setRole }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [resetPassword, setResetPassword] = useState("");
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] =
    useState(false);
  const [isResetPasswordLoading, setIsResetPasswordLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("userData");
    setIsDropdownOpen(false);
    setRole(null);
    navigate("/login");
  };

  const handleResetPassword = () => {
    setIsDropdownOpen(false);
    setIsResetPasswordModalOpen(true);
  };

  const handleResetPasswordSubmit = async () => {
    setIsResetPasswordLoading(true);

    const userData = JSON.parse(localStorage.getItem("userData"));
    const userId = userData.id;
    console.log("usererrriddd", userId);

    const resetPasswordData = {
      id: userId,
      password: resetPassword,
    };

    try {
      const response = await fetch(
        "http://13.50.136.16:8080/staff/resetPassword",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(resetPasswordData),
        }
      );

      if (response.ok) {
        toast.success("Password reset successfully!");
        setResetPassword("");
        setIsResetPasswordModalOpen(false);
      } else {
        console.error("Failed to add plant");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }

    setIsResetPasswordLoading(false);
  };

  return (
    <div>
      <ToastContainer theme="light" autoClose={2900} hideProgressBar />
      <nav className="navbar navbar-fixed ">
        <div className="container-fluid">
          <div className="d-flex align-items-center">
            <img
              src="https://see.fontimg.com/api/renderfont4/BXew/eyJyIjoiZnMiLCJoIjoxMTcsInciOjE1MDAsImZzIjo3OCwiZmdjIjoiIzBFOUYyQiIsImJnYyI6IiNGRkZGRkYiLCJ0IjoxfQ/cHJha3JpdGk/samarkan-oblique.png"
              width={120}
            />
            <div className="navBar-nav">
              <a
                className={`nav-link ${location.pathname === "/staffHome" ? "active" : ""}`}
                aria-current="page"
                href="/staffHome"
              >
                Plants
              </a>
              <a className={`nav-link ${location.pathname === "/staffOrders" ? "active" : ""}`} href="/staffOrders">
                Orders
              </a>
              <a className={`nav-link ${location.pathname === "/staffQueries" ? "active" : ""}`} href="/staffQueries">
                Queries
              </a>
            </div>
          </div>
          <div className="d-flex align-items-center ">
            <img
            className="profile-image"
              src="https://cdn-icons-png.flaticon.com/128/5582/5582872.png"
              style={{ width: "30px", cursor: "pointer" }}
              alt="Profile Icon"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            />
            {isDropdownOpen && (
              <div className="dropdown">
                <button className="dropdown-item" onClick={handleResetPassword}>
                  Reset Password
                </button>
                <button className="dropdown-item" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}

            {isResetPasswordModalOpen && (
              <div className="modal-container">
                <div className="modal-content">
                  <h2 className="modal-title">Reset Password</h2>
                  <form>
                    <div className="input-container">
                      <label htmlFor="resetPassword">New Password</label>
                      <input
                        type="password"
                        id="resetPassword"
                        value={resetPassword}
                        onChange={(e) => setResetPassword(e.target.value)}
                        placeholder="Enter new password"
                        required
                      />
                    </div>
                    <div className="button-container">
                      <button
                        type="button"
                        className="submit-button"
                        onClick={handleResetPasswordSubmit}
                      >
                        Ok
                      </button>
                      <button
                        type="button"
                        className="cancel-button"
                        onClick={() => setIsResetPasswordModalOpen(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default StaffNavbar;
