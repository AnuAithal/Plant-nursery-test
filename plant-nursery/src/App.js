import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/App.css";
import "./styles/Navbar.css";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import AppRouter from "./AppRouter";
import Navbar from "./Navbar";
import Plants from "./Plants";
import PlantDetails from "./PlantDetails";

function App() {
  const [userRole, setUserRole] = useState(null);

  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData")) || null
  );

  // useEffect(() => {
  // const userData = JSON.parse(localStorage.getItem("userData"));
  //   if (userData) {
  //     setUserRole(userData.role);
  //   }
  // }, []);

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    if (storedUserData) {
      setUserData(storedUserData);
      setUserRole(storedUserData.role);
    }
  }, []);

  console.log("from homeeeee---->", userData);

  return (
    <div className="App">
      <BrowserRouter>
        {/* {!userData && <Navbar />} */}

        {userRole === null && <Navbar />}

        {/* <div style={{paddingTop:'55px'}}> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setRole={setUserRole} />} />
          <Route
            path="/register"
            element={<Register setRole={setUserRole} />}
          />
          <Route path="/plants" element={<Plants />} />
          <Route path="/plantDetails/:id" element={<PlantDetails />} />
        </Routes>

        {/* </div> */}

        {userRole !== null && (
          <AppRouter userRole={userRole} setRole={setUserRole} />
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
