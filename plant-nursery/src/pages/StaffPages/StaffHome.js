import React, { useEffect, useState } from "react";
import "../../styles/StaffHome.scss";
import Loader from "../../Loader";
import ScrollToTop from "../../ScrollToTop";

const StaffHome = () => {
  const [plantData, setPlantData] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [price, setPrice] = useState("");
  const [stockStatus, setStockStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPlant, setNewPlant] = useState({
    productName: "",
    imageUrl: "",
    price: "",
    stockStatus: "",
    description: "",
    rating: "0",
  });

  useEffect(() => {
    fetch("http://13.50.136.16:8080/getAllProducts")
      .then((response) => response.json())
      .then((data) => setPlantData(data))
      .catch((error) => console.error("Error fetching plant data:", error));
  }, []);

  console.log("from stafffff", plantData);

  const openUpdateModal = (plant) => {
    setSelectedPlant(plant);
    setPrice(plant.price);
    setStockStatus(plant.stockStatus);
    setShowUpdateModal(true);
  };

  const closeUpdateModal = () => {
    setShowUpdateModal(false);
    setSelectedPlant(null);
    setPrice("");
    setStockStatus("");
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    if (selectedPlant) {
      const updateData = {
        id: selectedPlant.id,
        price: parseInt(price),
        stockStatus: stockStatus === "true",
      };

      try {
        const response = await fetch(
          `http://13.50.136.16:8080/staff/updateProduct`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updateData),
          }
        );

        if (response.ok) {
          // Update the plantData with the updated information
          const updatedPlantData = plantData.map((plant) => {
            if (plant.id === selectedPlant.id) {
              return {
                ...plant,
                price: updateData.price,
                stockStatus: updateData.stockStatus,
              };
            }
            return plant;
          });

          setPlantData(updatedPlantData);
          closeUpdateModal();
        } else {
          console.error("Failed to update plant data");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  };

  const openAddModal = () => {
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
    setNewPlant({
      productName: "",
      imageUrl: "",
      price: "",
      stockStatus: "",
      description: "",
      rating: "",
    });
  };

  const handleAddPlant = async (event) => {
    event.preventDefault();

    

    try {
      setIsLoading(true);

      const response = await fetch("http://13.50.136.16:8080/staff/addProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPlant),
      });

      setIsLoading(false);

      if (response.ok) {
        // Update the plantData with the new plant
        setPlantData([...plantData, newPlant]);
        closeAddModal();
      } else {
        console.error("Failed to add plant");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <ScrollToTop/>
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
            src="https://cdn-icons-png.flaticon.com/128/628/628324.png"
            width={60}
          />
          <h2 className="admin-home-title">Plant List</h2>
        </div>
        <div className="admin-actions" style={{ marginRight: "28px" }}>
          <button className="add-button" onClick={openAddModal}>
            Add New Plant
          </button>
        </div>
        <div className="staffPlant-row">
          {plantData.map((plant, index) => (
            <div
              className="card  col-6"
              key={plant?.id}
              // onClick={() => {
              //   handleClick(plant);
              // }}
            >
              <div
                className="bg-image hover-overlay ripple"
                data-mdb-ripple-color="light"
              >
                <img
                  src={plant?.imageUrl}
                  className="img-fluid"
                  alt={plant?.productName}
                />
                <button
                  className="update-icon-button"
                  onClick={() => openUpdateModal(plant)}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/3112/3112565.png"
                    alt="Update"
                    width={35}
                  />
                </button>
              </div>
              <div className="card-plant-body">
                <h2 className="plant-title">{plant?.productName}</h2>
                <p className="plant-rating">4.9⭐</p>
                <h5 className="plant-price">{`₹${plant?.price}`}</h5>
                {/* <p className="card-text">{plant.description}</p> */}
              </div>
            </div>
          ))}
        </div>
      </div>

      {showUpdateModal && (
        <div className="modal-container">
          <div className="modal-content">
            <h2 className="modal-title">Update Plant</h2>
            <form onSubmit={handleUpdate}>
              <div className="input-container">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Price"
                  required
                />
              </div>
              <div className="input-container">
                <label htmlFor="stockStatus">Stock Status</label>
                <select
                  id="stockStatus"
                  value={stockStatus}
                  onChange={(e) => setStockStatus(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                >
                  <option value="true">In Stock</option>
                  <option value="false">Out of Stock</option>
                </select>
              </div>
              <div className="button-container">
                <button type="submit" className="submit-button">
                  Update
                </button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={closeUpdateModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showAddModal && (
        <div className="modal-container">
          <div
            className="modal-content modal-scroll"
            style={{ maxHeight: "80vh", overflowY: "auto" }}
          >
            {isLoading && <Loader />}
            <h2 className="modal-title">Add Plant</h2>
            <form onSubmit={handleAddPlant}>
              <div className="input-container">
                <label htmlFor="productName">Product Name</label>
                <input
                  type="text"
                  id="productName"
                  value={newPlant.productName}
                  onChange={(e) =>
                    setNewPlant({ ...newPlant, productName: e.target.value })
                  }
                  placeholder="Product Name"
                  required
                />
              </div>
              <div className="input-container">
                <label htmlFor="imageUrl">Image URL</label>
                <input
                  type="text"
                  id="imageUrl"
                  value={newPlant.imageUrl}
                  onChange={(e) =>
                    setNewPlant({ ...newPlant, imageUrl: e.target.value })
                  }
                  placeholder="Image URL"
                  required
                />
              </div>
              <div className="input-container">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  id="price"
                  value={newPlant.price}
                  onChange={(e) =>
                    setNewPlant({ ...newPlant, price: e.target.value })
                  }
                  placeholder="Price"
                  required
                />
              </div>
              <div className="input-container">
                <label htmlFor="stockStatus">Stock Status</label>
                <select
                  id="stockStatus"
                  value={newPlant.stockStatus}
                  onChange={(e) =>
                    setNewPlant({ ...newPlant, stockStatus: e.target.value })
                  }
                  required
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                >
                  <option value="" disabled>
                    Select stock status
                  </option>
                  <option value="true">In Stock</option>
                  <option value="false">Out of Stock</option>
                </select>
              </div>
              <div className="input-container">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  value={newPlant.description}
                  onChange={(e) =>
                    setNewPlant({ ...newPlant, description: e.target.value })
                  }
                  placeholder="Description"
                  rows={4}
                  required
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    padding: "8px",
                  }}
                />
              </div>
              <div className="input-container">
                <label htmlFor="rating">Rating</label>
                <p
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    padding: "8px",
                    width:'60px'
                  }}
                >
                  {newPlant.rating}
                </p>
                <input
                  type="range"
                  id="rating"
                  value={newPlant.rating}
                  onChange={(e) =>
                    setNewPlant({ ...newPlant, rating: e.target.value })
                  }
                  placeholder="Rating"
                  required
                  min="0"
                  max="5"
                  step="0.1"
                />
              </div>
              <div className="button-container">
                <button type="submit" className="submit-button">
                  Add
                </button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={closeAddModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffHome;
