import React from 'react';
import { Route, Routes } from "react-router-dom";
import StaffHome from '../pages/StaffPages/StaffHome';
import StaffNavbar from '../pages/StaffPages/StaffNavbar';
import StaffOrders from '../pages/StaffPages/StaffOrders';
import StaffQueries from '../pages/StaffPages/StaffQueries';


const StaffRoutes = ({setRole}) => {
  const userData = JSON.parse(localStorage.getItem("userData"));

  return (
    <div>
      {userData && (
        <StaffNavbar
        setRole={setRole}
        />
      )}
      <div style={{paddingTop:'55px'}}>
      <Routes>
        <Route path="/staffHome" element={<StaffHome />}/>
        <Route path="/staffOrders" element={<StaffOrders />}/>
        <Route path="/staffQueries" element={<StaffQueries />}/>


      </Routes>
      </div>
    </div>
  )
}

export default StaffRoutes
