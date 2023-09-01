import React from 'react';
import { Route, Routes } from "react-router-dom";
import AdminHome from '../pages/AdminPages/AdminHome';
import AdminNavbar from '../pages/AdminPages/AdminNavbar';

const AdminRoutes = ({setRole}) => {

  const userData = JSON.parse(localStorage.getItem("userData"));

  return (
    <div>
      {userData && (
        <AdminNavbar
        setRole={setRole}
        />
      )}
      <div style={{paddingTop:'55px'}}>
      <Routes>
        <Route path="/adminHome" element={<AdminHome />}/>
      </Routes>
      </div>
    </div>
  )
}

export default AdminRoutes
