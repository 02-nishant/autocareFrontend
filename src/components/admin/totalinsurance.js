import { useEffect, useState } from "react";
import { getAllInsurance, deleteInsurance, addInsurance } from "../auth/checklogin";
import { toast } from "react-toastify";
import { Button, Form, Modal } from "react-bootstrap";


const TotalInsurance = () => {

    const [insurances, setInsurances] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        getAllInsurance()
          .then(insurances => {
            setInsurances(insurances);
          })
          .catch(error => {
            console.error("Error fetching insurances:", error.message);
          });
      }, []);


     
    
      const handleDeleteInsurance = (insurance) => {
        deleteInsurance(insurance);
        window.location.reload();
        toast.success("insurance Delete Success")
      };

      const handleShowModal = () => {
        setShowModal(true);
      };
    
    
      const handleCloseModal = () => {
        setShowModal(false);
      };

      const [formData, setFormData] = useState({
        insuranceProvider:""
      });
    
      const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

      const handleSubmit =  e => {
        e.preventDefault();
    
        // console.log(formData)

        try {
          addInsurance(formData);
          handleCloseModal();
          window.location.reload();
          toast.success("Insurance Added successfully!");
      } catch (error) {
          toast.error("Failed to Add. Please try again.");
          console.error("Error In Adding:", error);
      }
    
    };
    

    return (
        <div className="adminWall">

<div style={{ color: "black", display: "flex" }}>
        <h1>EXISTING Insurance</h1>
        <button className="btn btn-primary w-30" style={{ marginLeft: "50rem", fontWeight: "bold" }} onClick={handleShowModal}>Add Insurance</button>
      </div>

      <div style={{ color: "black", marginTop: "1rem", height: "500px", overflowY: "scroll" }}>
        <div className="row">
          {insurances.map(insurance => (
            <div key={insurance.id} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body ">
                 <h4>Provider Name :- {insurance.insuranceProvider}</h4>
                 <h5>Insurance Number :- {insurance.insuranceNumber}</h5>
                  
                  <button className="btn btn-danger ml-32 mt-2" onClick={() => handleDeleteInsurance(insurance.id)} >Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

       {/* Modal for Adding insurance */}
       <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Insurance</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>

            <Form.Label style={{marginTop:"1rem", fontWeight:"bold"}}>Insurance Provider</Form.Label>
            <Form.Control name="insuranceProvider" type="text" placeholder="Enter insurance provider name" value={formData.insuranceProvider} onChange={handleChange} required/>


            <Button style={{ marginTop: "2rem", marginLeft: "7rem" }} variant="primary" type="submit">Added</Button>
            <Button style={{ marginTop: "2rem", marginLeft: "1rem" }} variant="danger" onClick={handleCloseModal}>Close</Button>

          </Form>

        </Modal.Body>
      </Modal>

  
        </div>
    );
};

export default TotalInsurance;
