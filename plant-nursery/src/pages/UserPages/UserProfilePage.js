import React, { useEffect, useState } from "react";
import "../../styles/UserProfilePage.css";
import { useNavigate } from "react-router-dom";
import UserCart from "./UserCart";
import ScrollToTop from "../../ScrollToTop";

const UserProfilePage = ({
  setCartItemCount,
  cartVisible,
  cartItemCount,
  onClose,
  setRole
}) => {
  const [selectedTab, setSelectedTab] = useState("profile");
  const [orders, setOrders] = useState([]);

  const userData = JSON.parse(localStorage.getItem("userData"));

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userData");
    setRole(null);
    navigate("/login");
  };

  const renderProfileContent = () => {
    return (
      <div className="profile-container">
        <div>
          <h1
            style={{
              fontSize: "1.8em",
              fontWeight: "bold",
              marginBottom: "30px",
            }}
          >
            Profile
          </h1>
          <div className="profile-table">
            <div className="helo-profile">
              <img
                src="https://cdn-icons-png.flaticon.com/128/1326/1326377.png"
                width={60}
                alt="Profile Avatar"
                className="profile-avatar"
              />

              <p>Hello {userData.userName}!</p>
            </div>
            <div className="profile-details">
              <div className="details-container">
                <p>Name</p>
                <h2>{userData.userName}</h2>
              </div>
              <div className="details-container">
                <p>Email</p>
                <h2>{userData.email}</h2>
              </div>
              <div className="details-container">
                <p>Role</p>
                <h2>You are a {userData.role}.</h2>
              </div>
            </div>
          </div>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    );
  };

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch(
          `http://13.50.136.16:8080/customer/getOrders/${userData.id}`
        );
        if (response.ok) {
          const ordersData = await response.json();
          setOrders(ordersData);
        } else {
          console.error("Failed to fetch orders");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }

    if (userData) {
      fetchOrders();
    }
  }, [userData]);

  const renderOrdersContent = () => {
    return (
      <div>
        <h1
          style={{
            fontSize: "1.8em",
            fontWeight: "bold",
            marginBottom: "30px",
          }}
        >
          Your Orders
        </h1>
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-image">
                <img src={order.product.imageUrl} alt="Product" />
              </div>
              <div className="order-details">
                <p className="order-product-name">
                  {order.product.productName}
                </p>
                <div style={{ display: "flex", gap: "60px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <p className="order-label">Price: </p>
                    <span className="order-value">₹{order.product.price}</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <p className="order-label">Quantity: </p>
                    <span className="order-value">{order.quantity}</span>
                  </div>
                </div>
                <p className="order-label">Type of Delivery: </p>
                <span className="order-value">{order.type}</span>
                <p className="order-label">Order Status: </p>
                <span className="order-value">{order.orderStatus} . . .</span>
                {order.address && (
                  <>
                    <p className="order-label">Address: </p>
                    <span className="order-value">{order.address}</span>
                  </>
                )}
                {order.dateAndTime && (
                  <>
                    <p className="order-label">Date and Time: </p>
                    <span className="order-value">{order.dateAndTime}</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const [newQuery, setNewQuery] = useState("");
  const [resQueries, setResQueries] = useState([]);
  const [unresQueries, setUnresQueries] = useState([]);

  const [queryType, setQueryType] = useState("unresolved");

  useEffect(() => {
    async function fetchUserResQueries() {
      try {
        const response = await fetch(
          `http://13.50.136.16:8080/customer/getUserQueries/true/${userData.id}`
        );
        if (response.ok) {
          const queriesData = await response.json();
          setResQueries(queriesData);
        } else {
          console.error("Failed to fetch queries");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
    if (userData) {
      fetchUserResQueries();
    }

    async function fetchUserUnresQueries() {
      try {
        const response = await fetch(
          `http://13.50.136.16:8080/customer/getUserQueries/false/${userData.id}`
        );
        if (response.ok) {
          const queriesData = await response.json();
          setUnresQueries(queriesData);
        } else {
          console.error("Failed to fetch queries");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
    if (userData) {
      fetchUserUnresQueries();
    }
  }, [userData]);

  const handleQuerySubmit = async () => {
    if (newQuery.trim() === "") {
      return;
    }

    try {
      const response = await fetch("http://13.50.136.16:8080/customer/postQuery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userData.id,
          queryDesc: newQuery,
        }),
      });

      if (response.ok) {
        // Successfully posted query
        // Clear the text area
        setNewQuery("");
        console.log("Query submitted successfully");
      } else {
        console.error("Failed to submit query");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleQueryCancel = () => {
    setNewQuery("");
  };

  const renderQueriesContent = () => {
    return (
      <div className="queries-container">
        <h1
          style={{
            fontSize: "1.8em",
            fontWeight: "bold",
            marginBottom: "30px",
          }}
        >
          Your Queries
        </h1>
        <textarea
          className="query-textarea"
          value={newQuery}
          onChange={(e) => setNewQuery(e.target.value)}
          placeholder="Type your query here..."
        />
        <div className="query-buttons">
          <button className="submit-button" onClick={handleQuerySubmit}>
            Submit
          </button>
          <button className="cancel-button" onClick={handleQueryCancel}>
            Cancel
          </button>
        </div>

        <div className="query-dropdown">
          <select
            value={queryType}
            onChange={(e) => setQueryType(e.target.value)}
            className="query-dropdown-select"
          >
            <option value="unresolved">Unresolved</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        {queryType === "resolved" ? (
          <div className="queries-list">
            {resQueries.map((query, index) => (
              <div key={query.id} className="query-card">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <p className="query-desc">{query.queryDesc}</p>
                  </div>
                  <div>
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/1838/1838326.png"
                      width={40}
                    />
                  </div>
                </div>
                <p className="query-answer">{query.queryAnswer}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="queries-list">
            {unresQueries.map((query, index) => (
              <div key={query.id} className="query-card">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <p className="query-desc">{query.queryDesc}</p>
                  </div>
                  <div>
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/3286/3286253.png"
                      width={40}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <ScrollToTop/>
      <div className="page-container">
        <div className="side-navbar">
          <table>
            <tbody>
              <tr>
                <td
                  className={selectedTab === "profile" ? "selected" : ""}
                  onClick={() => setSelectedTab("profile")}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "20px",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/2105/2105556.png"
                      style={{ width: "40px" }}
                    />
                    <p style={{ fontWeight: "bold", fontSize: "16px" }}>
                      Profile
                    </p>
                  </div>
                </td>
              </tr>
              <tr>
                <td
                  className={selectedTab === "orders" ? "selected" : ""}
                  onClick={() => setSelectedTab("orders")}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "20px",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/9280/9280764.png"
                      style={{ width: "40px" }}
                    />
                    <p style={{ fontWeight: "bold", fontSize: "16px" }}>
                      Your Orders
                    </p>
                  </div>
                </td>
              </tr>
              <tr>
                <td
                  className={selectedTab === "queries" ? "selected" : ""}
                  onClick={() => setSelectedTab("queries")}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "20px",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/8090/8090725.png"
                      style={{ width: "40px" }}
                    />
                    <p style={{ fontWeight: "bold", fontSize: "16px" }}>
                      Your Queries
                    </p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="content">
          {selectedTab === "profile" ? renderProfileContent() : null}
          {selectedTab === "orders" ? renderOrdersContent() : null}
          {selectedTab === "queries" ? renderQueriesContent() : null}
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

export default UserProfilePage;
