import { useEffect, useState } from "react";
import { deleteUser, getAllUser } from "../auth/checklogin";
import { Modal} from "react-bootstrap";
import { toast } from 'react-toastify';

const TotalUser = () => {

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        getAllUser()
            .then(users => {
                setUsers(users);
            })
            .catch(error => {
                console.error("Error fetching users:", error.message);
            });
    }, []);

    const handleDetailsClick = (user) => {
        setSelectedUser(user);
    };

    const handleDeleteUser = (user) => {
        deleteUser(user);
        window.location.reload();
        toast.success("User Delete Success")
    };

    return (
        <div >
            <div style={{ color: "black", display: "flex" }}>
                <h1>EXISTING USERS</h1>
                <button className="btn btn-primary w-30" style={{ marginLeft: "55rem", fontWeight: "bold" }}>Add User</button>
            </div>

            <div style={{ color: "black", marginTop: "1rem", height: "500px", overflowY: "scroll" }}>
                <div className="row">
                    {users.map(user => (
                        <div key={user.id} className="col-md-4 mb-4">
                            <div className="card">
                                <div className="card-body ">
                                    <h5 className="card-title">{user.name}</h5>
                                    <button className="btn btn-primary ml-44 mr-8" onClick={() => handleDetailsClick(user)}>Details</button>
                                    <button className="btn btn-danger" onClick={() => handleDeleteUser(user.id)} >Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            <Modal show={selectedUser !== null} onHide={() => setSelectedUser(null)} style={{ marginTop:"2rem"}}>
                <Modal.Header closeButton>
                    <Modal.Title>User Details</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    {selectedUser && (
                        <div>
                            <table style={{width: "28rem", height:"25rem"}}>
                                <tbody>
                                    <tr style={{ fontWeight: "bold", border: "1px solid black", textAlign: "center" }}>
                                        <td style={{ fontSize: "1.5rem" }}><strong>Name:</strong></td>
                                        <td style={{ border: "1px solid black" }}>{selectedUser.name}</td>
                                    </tr>
                                    <tr style={{ fontWeight: "bold", border: "1px solid black", textAlign: "center" }}>
                                        <td style={{ fontSize: "1.5rem" }}><strong>Email:</strong></td>
                                        <td style={{ border: "1px solid black" }}>{selectedUser.email}</td>
                                    </tr>
                                    <tr style={{ fontWeight: "bold", border: "1px solid black", textAlign: "center" }}>
                                        <td style={{ fontSize: "1.5rem" }}><strong>Phone:</strong></td>
                                        <td style={{ border: "1px solid black" }}>{selectedUser.number}</td>
                                    </tr>
                                    <tr style={{ fontWeight: "bold", border: "1px solid black", textAlign: "center" }}>
                                        <td style={{ fontSize: "1.5rem" }}><strong>Roles:</strong></td>
                                        <td style={{ border: "1px solid black" }}>{selectedUser.roles}</td>
                                    </tr>
                                    <tr style={{ fontWeight: "bold", border: "1px solid black", textAlign: "center" }}>
                                        <td style={{ fontSize: "1.5rem" }}><strong>Address:</strong></td>
                                        <td style={{ border: "1px solid black" }}>{selectedUser.address}</td>
                                    </tr>
                                    <tr style={{ fontWeight: "bold", border: "1px solid black", textAlign: "center" }}>
                                        <td style={{ fontSize: "1.5rem" }}><strong>Vehicles:</strong></td>
                                        <td style={{ border: "1px solid black" }}>
                                            <ol>
                                                {selectedUser.vehicle.map((vehicle, index) => (
                                                    <li key={vehicle.id}>
                                                      {index+1})  {vehicle.category}({vehicle.plateNumber})
                                                    </li>
                                                ))}
                                            </ol>
                                        </td>
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

export default TotalUser;
