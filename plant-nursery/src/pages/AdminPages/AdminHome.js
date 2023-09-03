import React, { useEffect, useState } from "react";
import "../../styles/AdminHome.css";
import "../../styles/AdminAddStaffModal.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../Loader";
import ScrollToTop from "../../ScrollToTop";

const AdminHome = () => {
  const [staffList, setStaffList] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleModalClose = () => {
    setShowAddModal(false);
    setShowDeleteModal(false);
    setSelectedStaff(null);
  };

  useEffect(() => {
    async function fetchStaffList() {
      try {
        const response = await fetch(
          "http://13.50.185.10:8080/admin/showStaffUsersForAdmin"
        );
        if (response.ok) {
          const staffData = await response.json();
          setStaffList(staffData);
        } else {
          console.error("Failed to fetch staff list");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }

    fetchStaffList();
  }, [staffList]);

  const handleAddStaff = async (event) => {
    event.preventDefault();

    const staffData = { userName, email };

    try {
      setIsLoading(true);

      const response = await fetch(
        "http://13.50.185.10:8080/admin/registerStaff",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(staffData),
        }
      );

      setIsLoading(false);
      setShowAddModal(false);
      if (response.ok) {
        // Fetch updated staff list and perform any necessary actions...
        const newStaff = { id: response.id, userName, email }; // Assuming response includes the newly added staff's id
        setStaffList([...staffList, newStaff]);
        toast.success("👥 Staff added successfully!");

        setUserName("");
        setEmail("");
      } else {
        console.error("Failed to add staff");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setIsLoading(false);
    }
  };

  const handleDeleteStaff = (staff) => {
    setSelectedStaff(staff);
    setShowDeleteModal(true);
  };

  console.log("hereee aboveee--->", selectedStaff);

  const confirmDeleteStaff = async (selectedStaff) => {
    console.log("from selected staff----->", selectedStaff);
    if (selectedStaff !== null) {
      try {
        const response = await fetch(
          `http://13.50.185.10:8080/admin/deleteStaffById/${selectedStaff}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          // Update staff list and perform any necessary actions
          const updatedStaffList = staffList.filter(
            (staff) => staff.id !== selectedStaff
          );
          setStaffList(updatedStaffList);
          toast.success("👥 Staff deleted successfully!");
        } else {
          console.error("Failed to delete staff");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
    handleModalClose();
  };

  return (
    <div className="admin-home-container">
      <ScrollToTop />
      <ToastContainer theme="light" autoClose={2900} hideProgressBar />
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <img
          src="https://cdn-icons-png.flaticon.com/128/3281/3281869.png"
          width={60}
        />
        <h2 className="admin-home-title">Staff List</h2>
      </div>
      <div className="admin-actions">
        <button className="add-button" onClick={() => setShowAddModal(true)}>
          Add New Staff
        </button>
      </div>
      <div className="admin-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {staffList.map((staff) => (
              <tr key={staff.id}>
                <td>{staff.userName}</td>
                <td>{staff.email}</td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteStaff(staff.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <div
          className="modal-container"
          style={{ display: showAddModal ? "flex" : "none" }}
        >
          {isLoading && <Loader />}
          <div className="modal-content">
            <h2 className="modal-title">Add Staff</h2>
            <form onSubmit={handleAddStaff}>
              <div className="input-container">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Username"
                  required
                />
              </div>
              <div className="input-container">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                />
              </div>
              <div className="button-container">
                <button type="submit" className="submit-button">
                  Add
                </button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={handleModalClose}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showDeleteModal && (
        <div className="modal-container">
          <div className="modal-content">
            <p className="modal-text">Are you sure you want to delete ?</p>
            <div className="button-container">
              <button
                className="delete-button"
                onClick={() => confirmDeleteStaff(selectedStaff)}
              >
                OK
              </button>
              <button
                className="cancell-button"
                style={{ backgroundColor: "#00773b" }}
                onClick={handleModalClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminHome;
