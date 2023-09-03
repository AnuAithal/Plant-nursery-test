import React, { useEffect, useState } from "react";
import "../../styles/StaffOrders.css";
import ScrollToTop from "../../ScrollToTop";

const orderStatusMapping = {
  PROCESSING: 0,
  PACKED: 1,
  DISPATCHED: 2,
  DELIVERED: 3,
  PICKED_UP: 4,
};

const StaffOrders = () => {
  const [orders, setOrders] = useState([]);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(
        `http://13.50.185.10:8080/staff/updateOrderStatus`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: orderId,
            orderStatus: orderStatusMapping[newStatus],
          }),
        }
      );

      if (response.ok) {
        // Update the order status in the state
        const updatedOrders = orders.map((order) =>
          order.id === orderId
            ? { ...order, orderStatus: newStatus, editing: false }
            : order
        );
        setOrders(updatedOrders);
      } else {
        console.error("Failed to update order status");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch(
          `http://13.50.185.10:8080/staff/getAllOrders`
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

    fetchOrders();
  }, []);

  return (
    <div>
      <ScrollToTop />
      <div className="staffPlant-container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginLeft: "20px",
          }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/11458/11458605.png"
            width={60}
          />
          <h2 className="admin-home-title">Orders</h2>
        </div>

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

                <p className="order-label" style={{ fontWeight: "bold" }}>
                  Customer Details:{" "}
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: "60px",
                    borderBottom: "1px solid #ccc",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <p className="order-label">Name: </p>
                    <span className="order-value">{order.user.userName}</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <p className="order-label">Id: </p>
                    <span className="order-value">{order.user.id}</span>
                  </div>
                </div>

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
                {order.address && (
                  <div className="order-address-date">
                    <p className="order-label">Address: </p>
                    <span className="order-value">{order.address}</span>
                  </div>
                )}
                {order.dateAndTime && (
                  <div className="order-address-date">
                    <p className="order-label">Date and Time: </p>
                    <span className="order-value">{order.dateAndTime}</span>
                  </div>
                )}
                <div
                  style={{
                    display: "flex",
                    paddingTop: "10px",
                    justifyContent: "space-between",
                  }}
                >
                  <p className="order-label" style={{ fontWeight: "bold" }}>
                    Order Status:{" "}
                  </p>
                  <button
                    className="edit-button"
                    onClick={() => {
                      const updatedOrders = orders.map((o) =>
                        o.id === order.id
                          ? { ...o, editing: true }
                          : { ...o, editing: false }
                      );
                      setOrders(updatedOrders);
                    }}
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/738/738880.png"
                      alt="Edit"
                      width={35}
                    />
                  </button>
                </div>
                {order.editing ? (
                  <select
                    value={order.orderStatus}
                    onChange={(e) =>
                      updateOrderStatus(order.id, e.target.value)
                    }
                    style={{ cursor: "pointer" }}
                  >
                    {Object.keys(orderStatusMapping).map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                ) : (
                  <>
                    <span className="order-value">{order.orderStatus}</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StaffOrders;
