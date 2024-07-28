import { useEffect, useState } from "react";
import { deleteVehicle, getAllVehicle } from "../auth/checklogin";
import { toast } from "react-toastify";
import { Modal } from 'react-bootstrap';


const TotalVehicle = () => {

  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  useEffect(() => {
    getAllVehicle()
      .then(vehicles => {
        setVehicles(vehicles);
      })
      .catch(error => {
        console.error("Error fetching vehicles:", error.message);
      });
  }, []);

  const handleDetailsClick = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const handleDeleteVehicle = (vehicle) => {
    deleteVehicle(vehicle);
    window.location.reload();
    toast.success("Vehicle Delete Success")
  };


  return (
    <div >

      <div style={{ color: "black", display: "flex" }}>
        <h1>EXISTING VEHICLES</h1>
      </div>

      <div style={{ color: "black", marginTop: "1rem", height: "500px", overflowY: "scroll" }}>
        <div className="row">
          {vehicles.map(vehicle => (
            <div key={vehicle.id} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body ">
                  <h5 className="card-title">{vehicle.category} - {vehicle.plateNumber}</h5>
                  <button className="btn btn-primary ml-44 mr-8" onClick={() => handleDetailsClick(vehicle)}>Details</button>
                  <button className="btn btn-danger" onClick={() => handleDeleteVehicle(vehicle.id)} >Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <Modal show={selectedVehicle !== null} onHide={() => setSelectedVehicle(null)} style={{ marginTop: "2rem" }}>
        <Modal.Header closeButton>
          <Modal.Title>Vehicle Details</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          {selectedVehicle &&  (
            <div>
              <table style={{ width: "28rem", height: "25rem" }}>
                <tbody>
                  <tr style={{ fontWeight: "bold", border: "1px solid black", textAlign: "center" }}>
                    <td style={{ fontSize: "1.5rem" }}><strong>Category:</strong></td>
                    <td style={{ border: "1px solid black" }}>{selectedVehicle.category}</td>
                  </tr>
                  <tr style={{ fontWeight: "bold", border: "1px solid black", textAlign: "center" }}>
                    <td style={{ fontSize: "1.5rem" }}><strong>Plate Number:</strong></td>
                    <td style={{ border: "1px solid black" }}>{selectedVehicle.plateNumber}</td>
                  </tr>
                  <tr style={{ fontWeight: "bold", border: "1px solid black", textAlign: "center" }}>
                    <td style={{ fontSize: "1.5rem" }}><strong>Company:</strong></td>
                    <td style={{ border: "1px solid black" }}>{selectedVehicle.company}</td>
                  </tr>
                  <tr style={{ fontWeight: "bold", border: "1px solid black", textAlign: "center" }}>
                    <td style={{ fontSize: "1.5rem" }}><strong>Registration Date:</strong></td>
                    <td style={{ border: "1px solid black" }}>{selectedVehicle.registrationDate}</td>
                  </tr>

                  <tr style={{ fontWeight: "bold", border: "1px solid black", textAlign: "center" }}>
                    <td style={{ fontSize: "1.5rem" }}><strong>Insurance:</strong></td>
                    <td style={{ border: "1px solid black" }}>{selectedVehicle.insurance}</td>
                  </tr>
                </tbody>
              </table>

            </div>
          )}

        </Modal.Body>
      </Modal>

    </div>
  );
};

export default TotalVehicle;
