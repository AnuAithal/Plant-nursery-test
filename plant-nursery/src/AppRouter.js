import React from "react";
import { Routes, Route } from "react-router-dom";
import UserRoutes from "./routes/UserRoutes";
import StaffRoutes from "./routes/StaffRoutes";
import AdminRoutes from "./routes/AdminRoutes";

const AppRouter = ({ userRole, setRole }) => {
  // const userData = JSON.parse(localStorage.getItem("userData"));
  // const userRole = userData ? userData.role : null;

  if (userRole === "user") {
    return (
      <Routes>
        <Route path="/*" element={<UserRoutes setRole={setRole}/>} />
      </Routes>
    );
  } else if (userRole === "staff") {
    return (
      <Routes>
        <Route path="/*" element={<StaffRoutes setRole={setRole}/>} />
      </Routes>
    );
  } else if (userRole === "admin") {
    return (
      <Routes>
        <Route path="/*" element={<AdminRoutes setRole={setRole}/>} />
      </Routes>
    );
  } else {
    return <div>Error: Invalid role or not logged in.</div>;
  }
};

export default AppRouter;
