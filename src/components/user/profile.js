import { useEffect, useState } from "react";
import { getCurrentUserDetail, getUser } from "../auth/checklogin";
import pro from "../user/OIP.jpg";
import { Card, CardBody, Table, Button, Modal, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { updateUser } from "../auth/checklogin";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const user = getCurrentUserDetail();
  const userId = user ? user.id : null;

  useEffect(() => {
    if (userId) {
      getUser(userId)
        .then((data) => {
          setUserData({ ...data });
          // console.log(data);
        });
    }
  }, []);


  const handleShowModal = () => {
    setShowModal(true);
  };


  const handleCloseModal = () => {
    setShowModal(false);
  };

  const [formData, setFormData] = useState({
    name:"",
    number:"",
    address:""
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
        ...prevState,
        [name]: value
    }));
};

  const handleSubmit = async e => {
    e.preventDefault();

    console.log(formData)

    try {
      await updateUser(userData.id, formData);
      handleCloseModal();
      window.location.reload();
      toast.success("Profile updated successfully!");
  } catch (error) {
      toast.error("Failed to update profile. Please try again.");
      console.error("Error updating profile:", error);
  }

};


  return (
    <div>
      <div className="profile-container" style={{ color: "black" }}>
        <div className="profile-header">
          <img src={pro} alt="Profile" className="profile-image" />
          <h1>
            <b style={{ color: "red" }}>Welcome!! </b> {userData && userData.name}
          </h1>
          <button className="edit-profile-button" onClick={handleShowModal}>Edit Profile</button>
        </div>
        <div>
          {userData && (
            <Card style={{ marginTop: "3rem", marginLeft: "5rem", border: "0rem solid white" }}>
              <CardBody>
                <Table striped>
                  <tbody>
                    <tr style={{ fontWeight: "bold", border: "1px solid black", textAlign: "center" }}>
                      <td style={{ fontSize: "1.5rem" }}>Email</td>
                      <td style={{ border: "1px solid black" }}>{userData.email}</td>
                    </tr>
                    <tr style={{ fontWeight: "bold", border: "1px solid black", textAlign: "center" }}>
                      <td style={{ fontSize: "1.5rem" }}>Phone</td>
                      <td style={{ border: "1px solid black" }}>{userData.number}</td>
                    </tr>
                    <tr style={{ fontWeight: "bold", border: "1px solid black", textAlign: "center" }}>
                      <td style={{ fontSize: "1.5rem" }}>Role</td>
                      <td style={{ border: "1px solid black" }}>{userData.roles}</td>
                    </tr>
                    <tr style={{ fontWeight: "bold", border: "1px solid black", textAlign: "center" }}>
                      <td style={{ fontSize: "1.5rem" }}>Address</td>
                      <td style={{ border: "1px solid black" }}>{userData.address}</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          )}
        </div>
      </div>

      {/* Modal for editing profile */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>

            <Form.Label style={{marginTop:"1rem", fontWeight:"bold"}}>Name</Form.Label>
            <Form.Control name="name"  type="text" placeholder="Enter name" defaultValue={userData ? userData.name : ""} minLength={3} value={formData.name} onChange={handleChange}  required/>


           

            <Form.Label style={{marginTop:"1rem", fontWeight:"bold"}}>Phone Number</Form.Label>
            <Form.Control name="number" type="text" placeholder="Enter phone number" defaultValue={userData ? userData.number : ""} minLength={10} maxLength={10} value={formData.number} onChange={handleChange} required/>

            <Form.Label style={{marginTop:"1rem", fontWeight:"bold"}} >Address</Form.Label>
            <Form.Control name="address" type="text" placeholder="Enter address" defaultValue={userData ? userData.address : ""} minLength={3} value={formData.address} onChange={handleChange} required/>

            <Button style={{ marginTop: "2rem", marginLeft: "7rem" }} variant="primary" type="submit">Save changes</Button>
            <Button style={{ marginTop: "2rem", marginLeft: "1rem" }} variant="danger" onClick={handleCloseModal}>Close</Button>

          </Form>

        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Profile;
