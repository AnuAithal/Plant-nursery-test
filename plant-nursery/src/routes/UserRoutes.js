import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import UserHome from "../pages/UserPages/UserHome";
import UserPlants from "../pages/UserPages/UserPlants";
import UserProfilePage from "../pages/UserPages/UserProfilePage";
import UserPlantDetails from "../pages/UserPages/UserPlantDetails";
import UserNavbar from "../pages/UserPages/UserNavbar";

const UserRoutes = ({setRole}) => {
  // const initialCartItemCount = parseInt(localStorage.getItem("cartItemCount")) || 0;
  const [cartItemCount, setCartItemCount] = useState(0);
  const [cartVisible, setCardVisible] = useState(false);



  const userData = JSON.parse(localStorage.getItem("userData"));
  // const userId = userData.id;

  useEffect(() => {
    localStorage.setItem("cartItemCount", cartItemCount.toString());
  }, [cartItemCount]);

  const handleCartIconClick = () => {
    setCardVisible(!cartVisible);
  };

  const handleCartClose = () => {
    setCardVisible(false);
  };

  return (
    <div>
      {userData && (
        <UserNavbar
          cartItemCount={cartItemCount}
          onCartIconClick={handleCartIconClick}
        />
      )}

      <div className="content-container" style={{ paddingTop: "55px" }}>
        <Routes>
          <Route
            path="/userHome"
            element={
              <UserHome
                setCartItemCount={setCartItemCount}
                cartVisible={cartVisible}
                cartItemCount={cartItemCount}
                onClose={handleCartClose}
              />
            }
          />
          <Route
            path="/userPlants"
            element={
              <UserPlants
                setCartItemCount={setCartItemCount}
                cartVisible={cartVisible}
                cartItemCount={cartItemCount}
                onClose={handleCartClose}
              />
            }
          />
          <Route
            path="/userProfile"
            element={
              <UserProfilePage
                setCartItemCount={setCartItemCount}
                cartVisible={cartVisible}
                cartItemCount={cartItemCount}
                onClose={handleCartClose}
                setRole={setRole}
              />
            }
          />
          <Route
            path="/userPlantDetails/:id"
            element={
              <UserPlantDetails
                setCartItemCount={setCartItemCount}
                cartVisible={cartVisible}
                cartItemCount={cartItemCount}
                onClose={handleCartClose}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default UserRoutes;
