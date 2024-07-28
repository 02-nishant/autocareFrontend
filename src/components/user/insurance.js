import { useEffect, useState } from "react";
import { getAllInsurance} from "../auth/checklogin";


const Insurance = () => {

  const [insurances, setInsurances] = useState([]);


  useEffect(() => {
      getAllInsurance()
        .then(insurances => {
          setInsurances(insurances);
        })
        .catch(error => {
          console.error("Error fetching insurances:", error.message);
        });
    }, []);



  return (
      <div className='insurance'>

<div style={{ color: "black", display: "flex" }}>
      <h1>EXISTING Insurance</h1>
    </div>

    <div style={{ color: "black", marginTop: "1rem", height: "500px", overflowY: "scroll" }}>
      <div className="row">
        {insurances.map(insurance => (
          <div key={insurance.id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body ">
               <h4>Provider Name :- {insurance.insuranceProvider}</h4>
               <h5>Insurance Number :- {insurance.insuranceNumber}</h5>
               <button className="btn btn-primary ml-32 mt-2"  >Buy Insurance</button>
               
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>


      </div>
  );
  };
  
  export default Insurance;
  
  
  
  