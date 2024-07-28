import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { login } from '../helper/userservice';
import { toast } from 'react-toastify';
import { doLogin, getCurrentUserDetail } from '../auth/checklogin';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();

    const initialFormData = {
        email: '',
        password: ''
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = e => {
        e.preventDefault();

        

        login(formData).then((response) => {
            console.log("login success");

            doLogin(response, () => {
                console.log("login details save");

                const currUser = getCurrentUserDetail();

                if (currUser && currUser.role === 'ROLE_USER') {
                    navigate("/user/dashboard");
                }else if(currUser && currUser.role === 'ROLE_ADMIN'){
                    navigate("/admin/dashboard");
                }

            });

            toast.success("Login Success")
            handleReset();



        }).catch(error => {
            console.log(error);
            toast.error("Something went wrong on server!!")
        })

    };

    const handleReset = () => {
        setFormData(initialFormData);
    };

    return (
        <div className='login'>
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                  
                            <h3 className="card-title text-center" style={{fontSize:"3rem" }}>Login</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        placeholder="Enter email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        placeholder="Password"
                                        required
                                        value={formData.password.trim()}
                                        onChange={handleChange}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Login</button>
                            </form>
                       
                </div>
            </div>
        </div>

        </div>
    );
};

export default Login;
