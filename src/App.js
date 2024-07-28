import React from "react";
import { useLocation, Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/headerhome";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import User from "./components/user/user";
import Admin from "./components/admin/admin"
import UserDashBoard from "./components/user/headeruser";
import AdminDashboard from "./components/admin/headeradmin";
import { getCurrentUserDetail, isLoggedIn } from "./components/auth/checklogin";

function App() {
  const location = useLocation();
  const hideHeaderOnRestrictedPages = location.pathname.startsWith("/user") || location.pathname.startsWith("/admin");


  return (

    <div className="App">
      <ToastContainer />
      {!hideHeaderOnRestrictedPages && <Header />}
      <Routes>

        <Route  path="/user" element={<User />} >

          <Route path="dashboard" element={<UserDashBoard />} />

        </Route>


        <Route exact path="/admin" element={<Admin />} >

          <Route path="dashboard" element={<AdminDashboard />} />

        </Route>

      </Routes>




    </div>


  );
}

export default App;
