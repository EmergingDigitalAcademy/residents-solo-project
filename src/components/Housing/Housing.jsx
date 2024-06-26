import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import './Housing.css';
import {
  Container,
  Navbar,
  Nav,
  Button,
  Dropdown,
  InputGroup,
  Card,
  Row,
  Col,
  Alert,
  Modal,
  ListGroup,
} from "react-bootstrap";

function AssignResident() {
  const housing = useSelector((store) => store.housingReducer);
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const { resident_id } = params;
  console.log("resident id params", resident_id);

  const handleAssignRoom = (roomNumber) => {
    console.log(`Assign ${resident_id} to room ${roomNumber} `);
    dispatch({
      type: "UPDATE_HOUSING",
      payload: { resident_id, room_number: roomNumber },
    });
  };

  useEffect(() => {
    dispatch({ type: "FETCH_HOUSING" });
  }, []);

  return (
    <div className="container">
      <h2>Housing</h2>
      <Row>
        <div>
          <button onClick={() => history.push("/residents")}>
            Back to Active Residents
          </button>
        </div>
        <Col xs={12} md={6}>
          <Card style={{border: "0"}}>
            <Card.Body>
              <Card.Title>Available Rooms</Card.Title>
              <ListGroup >
                {housing
                  .filter((h) => !h.resident_id)
                  .map((house, i) => (
                    <div key={i}>
                      <ListGroup.Item>
                        <div>
                          <strong>Room Number:</strong> {house.room_number},
                          <strong> Hall:</strong> {house.hall},
                          <strong> Floor:</strong> {house.floor} 
                          <button className="assignroombtn"
                            onClick={() => handleAssignRoom(house.room_number)}
                          >
                            Assign Room
                          </button>
                        </div>
                      </ListGroup.Item>
                    </div>
                  ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default AssignResident;
