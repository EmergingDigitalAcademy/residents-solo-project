import { useState } from "react";
import { useDispatch } from "react-redux";
import "./AdmitResident.css";
import {
  Form,
  FormControl,
  ToggleButtonGroup,
  InputGroup,
  Card,
  Row,
  Col,
} from "react-bootstrap";

function AdmitResident() {
  const [term, setTerm] = useState("short");
  const initialResident = {
    first_name: "",
    last_name: "",
    birthday: "",
    term: "short-term",
  };
  const [newResident, setNewResident] = useState(initialResident);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("NEW RESIDENT", newResident);
    dispatch({
      type: "ADD_RESIDENTS",
      payload: newResident,
    });
    setNewResident(initialResident);
  };

  const handleTerm = (selectedTerm) => {
    let updateResident = { ...newResident };
    updateResident.term = selectedTerm === "short" ? "short-term" : "long-term";
    console.log("What term?", selectedTerm);
    setNewResident(updateResident);
  };

  return (
    <div className="container">
      <h2>Admit Resident</h2>
      <div>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-4">
            <Col id="columnadmit" xs={12} md={6} lg={3}>
              <Card>
                <Card.Body>
                  <Card.Title>First Name</Card.Title>
                  <InputGroup className="mb-3">
                    <FormControl
                      placeholder="First Name"
                      aria-label="Enter text"
                      value={newResident.first_name}
                      onChange={(e) =>
                        setNewResident({
                          ...newResident,
                          first_name: e.target.value,
                        })
                      }
                    />
                  </InputGroup>
                </Card.Body>
              </Card>
            </Col>
            <Col id="columnadmit" xs={12} md={6} lg={3}>
              <Card>
                <Card.Body>
                  <Card.Title>Last Name</Card.Title>
                  <InputGroup className="mb-3">
                    <FormControl
                      placeholder="Last Name"
                      aria-label="Enter text"
                      value={newResident.last_name}
                      onChange={(e) =>
                        setNewResident({
                          ...newResident,
                          last_name: e.target.value,
                        })
                      }
                    />
                  </InputGroup>
                </Card.Body>
              </Card>
            </Col>
            <Col id="columnadmit" xs={12} md={6} lg={3}>
              <Card>
                <Card.Body>
                  <Card.Title>Birthday</Card.Title>
                  <InputGroup className="mb-3">
                    <FormControl
                      placeholder="YYYY-MM-DD"
                      aria-label="Enter text"
                      value={newResident.birthday}
                      onChange={(e) =>
                        setNewResident({
                          ...newResident,
                          birthday: e.target.value,
                        })
                      }
                    />
                  </InputGroup>
                </Card.Body>
              </Card>
            </Col>
            {/* <Col id="columnadmit" xs={12} md={6} lg={3}>
              <Card>
                <Card.Body>
                  <Card.Title>Image</Card.Title>
                  <InputGroup className="mb-3">
                    <FormControl
                      placeholder="Image"
                      aria-label="Enter text"
                      value={newResident.image}
                      onChange={(e) =>
                        setNewResident({
                          ...newResident,
                          image: e.target.value,
                        })
                      }
                    />
                  </InputGroup>
                </Card.Body>
              </Card>
            </Col> */}
            <Col id="columnadmit" xs={12} md={6} lg={3}>
              <Card style={{ height: "120px" }}>
                <Card.Body>
                  <Card.Title>Length of Stay</Card.Title>
                  <ToggleButtonGroup type="radio" name="term">
                    <label id="labelradio">
                      <input
                        type="radio"
                        id="short"
                        name="term"
                        value="short"
                        checked={term === "short"}
                        onChange={() => {
                          setTerm("short");
                          handleTerm("short");
                        }}
                      />
                      Short-term
                    </label>
                    <label id="labelradio">
                      <input
                        type="radio"
                        id="long"
                        name="term"
                        value="long"
                        checked={term === "long"}
                        onChange={() => {
                          setTerm("long");
                          handleTerm("long");
                        }}
                      />
                      Long-term
                    </label>
                  </ToggleButtonGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col className="admitbtn-col" xs={3}>
              <button id="admitbtn" type="submit">
                Add Resident
              </button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}

export default AdmitResident;
