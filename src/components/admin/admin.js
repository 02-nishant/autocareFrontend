import { Outlet , Navigate } from "react-router-dom";
import { isLoggedIn } from "../auth/checklogin";


const Admin = () => {
    if (isLoggedIn()) {
        return <Outlet />
    } else {
        return <Navigate to={"/login"} />
    }
};

export default Admin;