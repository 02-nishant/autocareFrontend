import about from "../homepage/abouT.jpg"

const About = () => {
    return (
        <div >
            <div className="about">
                {/* <img src={about} style={{ marginTop: "0.4rem", width: "150%" }} /> */}

                <p style={{ marginTop: "7rem", marginLeft: "2rem", fontSize:"1.2rem"}}>

                    <b style={{fontSize:"2rem"}}>A</b> utoCare is a  website project developed by <b>Nishant Verma</b> , an MCA student from <br />
                   <b> NIT Agartala</b>. AutoCare offers a seamless user experience for purchasing vehicle <br />
                    insurance for various vehicles. The frontend,  built on ReactJS, ensures a modern <br />
                    and responsive interface, while the backend, powered by Spring Boot and  Spring<br />
                    Security,  ensures robustness and security in handling user data and transactions.<br />
                    With REST API integration,users can easily navigate through the website,  select <br />
                    their desired insurance plans for different vehicles, and make purchases securely. <br />
                    Additionally, AUTOCARE provides an admin panel for efficient management of <br />
                    insurance policies, user  accounts, and vehicle details, ensuring smooth operations<br />
                    and oversight  for administrators.




                </p>
            </div>
        </div>
    );
};

export default About;