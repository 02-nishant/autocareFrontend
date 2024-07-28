import React, { useState } from 'react';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { signUp } from '../helper/userservice';
import { toast } from 'react-toastify';

const Register = () => {
    const initialFormData = {
        name: '',
        email: '',
        number: '',
        password: '',
        address: ''
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

       
        
        console.log(formData);
        

        signUp(formData).then((resp) =>{
            console.log(resp);
            console.log("success log");
            toast.success("User is register successfully");
            handleReset(initialFormData);
        }).catch((error)=>{
            console.log(error);

            toast.error("Registration Failed...Duplicate email !!")

        })

       
    };

    const handleReset = () => {
        setFormData(initialFormData);
    };

    return (
        <div className='register'>

        <Container style={{ color: "black", marginTop: "1rem",maxWidth: "600px"}} >
            <h2><u>Register !!</u></h2>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="name" style={{fontWeight:"bold"}} >Name</Label>
                    <Input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        minLength={3}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="email" style={{fontWeight:"bold"}} >Email</Label>
                    <Input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required

                    />
                </FormGroup>


                <FormGroup>
                    <Label for="number" style={{fontWeight:"bold"}} >Phone Number</Label>
                    <Input
                        type="tel"
                        name="number"
                        id="number"
                        placeholder="Enter your phone number"
                        value={formData.number}
                        onChange={handleChange}
                        required
                        minLength={10}
                        maxLength={10}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="password" style={{fontWeight:"bold"}} >Password</Label>
                    <Input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="address" style={{fontWeight:"bold"}} >Address</Label>
                    <Input
                        type="textarea"
                        name="address"
                        id="address"
                        placeholder="Enter your address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        
                        minLength={3}
                    />
                </FormGroup>
                <Button type="submit" color="primary">Register</Button>
                <Button style={{marginLeft:"1rem"}} type="button" color="danger" onClick={handleReset}>Reset</Button>
            </Form>
        </Container>

        </div>
    );
};

export default Register;
