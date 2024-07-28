import { useState } from 'react';
import { addVehicle, deleteVehicleByUser, doLogout, getCurrentUserDetail } from '../auth/checklogin';
import { Button, Form, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Vehicle = () => {


  const currUser = getCurrentUserDetail();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
    plateNumber: "",
    company: "",
    registrationDate: "",
  });


  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get currently logged-in user
    const currUser = getCurrentUserDetail();

    // Add user information to the formData
    const formDataWithUser = {
      ...formData,
      user: currUser
    };

    try {
      await addVehicle(formDataWithUser);
      handleCloseModal();

      doLogout(() => {
        navigate('/');
      })


      toast.success("Vehicle Added successfully! Please login again to see changes");
    } catch (error) {
      toast.error("Failed to Add. Same Vehicle Number Exist.. Please Try With New Number.");
      console.error("Error In Adding:", error);
    }
  };

  const handleShowModal = () => {
    setShowModal(true);
  };


  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDeleteVehicle = async (vehicle) => {

    try{
       deleteVehicleByUser(vehicle, currUser.id);

    doLogout(() => {
      navigate('/');
    })

    toast.success("Insurance Delete Success Please login again to see changes")
    }catch{
      toast.error("Failed to Delete. Please try again.");
      
    }
   

  };

  return (
    <div className='userDash'>
      <div style={{ color: "black", display: "flex", marginTop: "1rem" }}>
        <h1>Your Registered Vehicle</h1>
        <button className="btn btn-primary w-30" style={{ marginLeft: "40rem", fontWeight: "bold" }} onClick={handleShowModal}>Add New Vehicle</button>
      </div>

      <div style={{ color: "black", marginTop: "1rem", height: "500px", overflowY: "scroll", marginTop: "1rem" }}>
        <div className="row" >
          <ol>
            {currUser.vehicle.map((vehicle) => (
              <div key={vehicle.id} style={{ marginTop: "2rem", marginLeft: "20rem", marginRight: "20rem" }} >
                <div class=" UV">
                  <div class="info">
                    <span class="label">Vehicle Category:</span>
                    <span class="value">{vehicle.category}</span>
                  </div>
                  <div class="info">
                    <span class="label">Vehicle Company:</span>
                    <span class="value">{vehicle.company}</span>
                  </div>
                  <div class="info">
                    <span class="label">Vehicle Number:</span>
                    <span class="value">{vehicle.plateNumber}</span>
                  </div>
                  <div class="info">
                    <span class="label">Registration Date:</span>
                    <span class="value">{vehicle.registrationDate}</span>
                  </div>

                  <button className="btn btn-danger ml-64" onClick={() => handleDeleteVehicle(vehicle.id)} >Delete</button>

                </div>

              </div>

            ))}
          </ol>
        </div>
      </div>


      {/* Modal for Adding insurance */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Vehilce</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>

            <Form.Label style={{ marginTop: "1rem", fontWeight: "bold" }}>Vehicle Category</Form.Label>
            <Form.Select name="category" onChange={handleChange} value={formData.category} required>
              <option value="">Select Vehicle Category</option>
              <option value="Two Wheeler">Two Wheeler</option>
              <option value="Four Wheeler">Four Wheeler</option>
            </Form.Select>

            <Form.Label style={{ marginTop: "1rem", fontWeight: "bold" }}>Vehicle Number</Form.Label>
            <Form.Control name="plateNumber" type="text" placeholder="Enter Vehicle Number" value={formData.plateNumber} onChange={handleChange} required />

            <Form.Label style={{ marginTop: "1rem", fontWeight: "bold" }}>Vehicle Company</Form.Label>
            <Form.Control name="company" type="text" placeholder="Enter Comapny Name" value={formData.company} onChange={handleChange} required />

            <Form.Label style={{ marginTop: "1rem", fontWeight: "bold" }}>Registration Date </Form.Label>
            <Form.Control name="registrationDate" type="date" value={formData.registrationDate} onChange={handleChange} required />


            <Button style={{ marginTop: "2rem", marginLeft: "7rem" }} variant="primary" type="submit">Added</Button>
            <Button style={{ marginTop: "2rem", marginLeft: "1rem" }} variant="danger" onClick={handleCloseModal}>Close</Button>

          </Form>

        </Modal.Body>
      </Modal>

    </div>
  );
};

export default Vehicle;



