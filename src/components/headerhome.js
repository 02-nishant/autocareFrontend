import "../index.css"
import logo from "../assests/image/logo1.png";
import { useNavigate, Link, Routes, Route } from "react-router-dom";
import About from "./homepage/about";
import Home from "./homepage/home";
import Contact from "./homepage/contact";
import Login from "./homepage/login";
import Register from "./homepage/register";
import { isLoggedIn, doLogout, getCurrentUserDetail } from "./auth/checklogin";
import Profile from "./user/profile";
import Dashboard from "./user/dashboard";
import Vehicle from "./user/vehicle"
import Insurance from "./user/insurance";
import AdminDashboard from "./admin/dashboard";
import TotalUser from "./admin/totaluser";
import TotalInsurance from "./admin/totalinsurance";
import TotalVehicle from "./admin/totalvehicle";



const Header = () => {

    const handleLogout = () => {
        doLogout(() => {
            navigate('/');
        })
    }

    const currUser = getCurrentUserDetail();

    const navigate = useNavigate();

    const navigateToAdminDashboard = () => {

        navigate('/adashboard');
    };

    const navigateToDashboard = () => {

        navigate('/dashboard');
    };

    // const navigateToVehicle = () => {

    //     navigate('/vehicle');
    // };

    // const navigateToInsurance = () => {

    //     navigate('/insurance');
    // };

    const navigateToProfile = () => {

        navigate('/profile');
    };

    const navigateToRegister = () => {

        navigate('/register');
    };

    const navigateToLogin = () => {

        navigate('/login');
    };

    const navigateToContact = () => {

        navigate('/contact');
    };

    const navigateToAbout = () => {

        navigate('/about');
    };


    const navigateHome = () => {

        navigate('/');
    };

    return (

        <div className="header">

            <div style={{ display: "flex" }}>
                <div style={{ display: "flex" }}>
                    <h1 className="text-3xl font-bold mt-2 ml-4">AUTOCARE</h1>
                    <img className=" ml-4" src={logo} style={{ height: "4rem" }} />
                </div>

                {isLoggedIn() ? (
                    currUser.role === 'ROLE_USER' ? (
                        <div style={{ marginLeft: "2rem", marginTop: "0.7rem", fontSize: "1.2rem" }}>
                            <div style={{ display: "flex" }}>
                                <button style={{ marginLeft: "10rem" }} onClick={navigateHome}>Home</button>
                                <button style={{ marginLeft: "2rem" }} onClick={navigateToAbout}>About</button>
                                <button style={{ marginLeft: "2rem" }} onClick={navigateToDashboard}>Dashboard</button>
                                <button style={{ marginLeft: "2rem" }} onClick={navigateToContact}>ContactUs</button>
                            </div>
                        </div>
                    ) : (
                        <div style={{ marginLeft: "7rem", marginTop: "0.7rem", fontSize: "1.2rem", marginRight: "10rem" }}>
                            <div style={{ display: "flex" }}>
                                <button style={{ marginLeft: "10rem" }} onClick={navigateHome}>Home</button>
                                <button style={{ marginLeft: "2rem" }} onClick={navigateToAbout}>About</button>
                                <button style={{ marginLeft: "2rem" }} onClick={navigateToAdminDashboard}>Dashboard</button>
                            </div>
                        </div>
                    )

                ) : (
                    <div style={{ marginLeft: "7rem", marginTop: "0.5rem", fontSize: "1.5rem" }}>
                        <div style={{ display: "flex" }}>
                            <button style={{ marginLeft: "10rem" }} onClick={navigateHome}>Home</button>
                            <button style={{ marginLeft: "2rem" }} onClick={navigateToAbout}>About</button>
                            <button style={{ marginLeft: "2rem" }} onClick={navigateToContact}>ContactUs</button>
                        </div>
                    </div>
                )}

                {isLoggedIn() ? (

                    <div className="mt-2 text-2xl">
                        <div style={{ display: "flex" }}>
                            <b style={{ marginLeft: "11rem", fontSize: "1.2rem" }}> {currUser.name}</b>
                            <button style={{ marginLeft: "1rem", fontSize: "1.2rem" }} onClick={navigateToProfile}>Profile</button>
                            <button style={{ marginLeft: "1rem", fontSize: "1.2rem" }} onClick={handleLogout}>Logout</button>
                        </div>
                    </div>
                ) : (



                    <div className="mt-2 text-2xl">
                        <div style={{ display: "flex" }}>
                            <button style={{ marginLeft: "15rem" }} className="nav-link" onClick={navigateToLogin}>Login</button>
                            <button style={{ marginLeft: "2rem" }} className="nav-link" onClick={navigateToRegister}>Register</button>
                        </div>
                    </div>
                )}


            </div>

            <div >
                <Routes>
                    <Route path="/totalInsurance" element={<TotalInsurance />} />
                    <Route path="/totalVehicle" element={<TotalVehicle />} />
                    <Route path="/totalUser" element={<TotalUser />} />
                    <Route path="/adashboard" element={<AdminDashboard />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/vehicle" element={<Vehicle />} />
                    <Route path="/insurance" element={<Insurance />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/" element={<Home />} />
                </Routes>

            </div>

        </div>

    );
};
export default Header;