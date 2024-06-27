import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./LandingPage.css";
import { Card } from "react-bootstrap";

// CUSTOM COMPONENTS
import RegisterForm from "../RegisterForm/RegisterForm";

function LandingPage() {
  const [heading, setHeading] = useState("Welcome");
  const history = useHistory();

  const onLogin = (event) => {
    history.push("/login");
  };

  return (
    <div className="landingPage vh-100 vh-100">
      <div className="container">
        <Card
          style={{
            backgroundColor: "#efefef",
            width: "150px",
            alignItems: "center",
            marginLeft: "8px"
          }}
        >
          <h2>{heading}</h2>
        </Card>
        <div className="grid">
          <div className="grid-col grid-col_8">
            <Card style={{backgroundColor: "#efefef", width: "500px", alignItems: "center"}}>
              <p>
                This application is made for CNA's to chart tasks on how much
                assistance each resident needs.
              </p>
              <p>
                Also, an admin will be able to add and assign residents to their
                room.
              </p>
            </Card>
          </div>
          <div className="grid-col grid-col_4">
            <RegisterForm />
            <Card style={{ backgroundColor: "#efefef", width: "250px", marginLeft: "8px" }}>
              <center className="registerLandingPage">
                <h4>Already a User?</h4>
                <button className="btn btn_sizeSm, login" onClick={onLogin}>
                  Login
                </button>
              </center>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
