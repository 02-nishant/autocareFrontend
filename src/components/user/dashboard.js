import vehicle from "../admin/vehicle.jpg"
import insurance from "../admin/insurance.jpg"
import Card from "./card";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

  const navigate = useNavigate();

  const navigateToVehicle = () => {

        navigate('/vehicle');
    };

    const navigateToInsurance = () => {

        navigate('/insurance');
    };

  return (
    <div className="userDash">
      <div className="grid grid-cols-3 gap-15 mt-3">

        <button onClick={navigateToVehicle} ><Card src={vehicle} title="Vehicle"  /></button>
        <button onClick={navigateToInsurance} ><Card src={insurance} title="Insurance" /></button>

      </div>
    </div>
  );
};

export default Dashboard;



