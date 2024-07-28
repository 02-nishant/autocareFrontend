import Card from "./card";
import user from "../admin/user.jpg"
import vehicle from "../admin/vehicle.jpg"
import insurance from "../admin/insurance.jpg"
import React, { useState, useEffect } from "react";
import { getAllInsurance, getAllUser, getAllVehicle } from "../auth/checklogin";
import { Route, Routes, useNavigate } from "react-router-dom";

const AdminDashboard = () => {

  const [users, setUsers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [insurances, setInsurances] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    getAllUser()
      .then(users => {
        setUsers(users);
      })
      .catch(error => {
        console.error("Error fetching users:", error.message);
      });
  }, []);

  useEffect(() => {
    getAllVehicle()
      .then(vehicles => {
        setVehicles(vehicles);
      })
      .catch(error => {
        console.error("Error fetching vehicles:", error.message);
      });
  }, []);

  useEffect(() => {
    getAllInsurance()
      .then(insurances => {
        setInsurances(insurances);
      })
      .catch(error => {
        console.error("Error fetching insurances:", error.message);
      });
  }, []);


  const navigateToTotalUser = () => {
    navigate('/totalUser');
  };

  const navigateToTotalVehicle = () => {
    navigate('/totalVehicle');
  };

  const navigateToTotalInsurance = () => {
    navigate('/totalInsurance');
  };

  return (
    <div className="adminDash">
      <div className="grid grid-cols-3 gap-15 mt-3">

        <button onClick={navigateToTotalUser} > <Card src={user} title="User" num={users.length} />  </button>
        <button onClick={navigateToTotalVehicle} ><Card src={vehicle} title="Vehicle" num={vehicles.length} /></button>
        <button onClick={navigateToTotalInsurance} ><Card src={insurance} title="Insurance" num={insurances.length} /></button>

      </div>


    </div>
  );
};

export default AdminDashboard;



