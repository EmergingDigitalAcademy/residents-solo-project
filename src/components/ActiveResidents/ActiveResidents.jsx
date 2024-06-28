import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./ActiveResidents.css";
import moment from "moment";
import { Card, Row, Col } from "react-bootstrap";

function ActiveResidents() {
  const user = useSelector((store) => store.user);
  const residents = useSelector((store) => store.residentsReducer);
  const tasksResidents = useSelector((store) => store.tasksResidentsReducers);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: "FETCH_RESIDENTS" });
    dispatch({ type: "FETCH_TASKS_RESIDENTS" })
  }, []);

  const allComplete = (res) => {
    const tasksByResident = tasksResidents?.filter((s) => Number(s.resident_id) === Number(res.id));
    const allTrue = tasksByResident.every((g) => g.assistance_id);
    return allTrue;
  }

  return (
    <div className="container">
      <h2 className="activeResidentsTitle">Active Residents</h2>
      <Row className="mb-4">
        <Col>
          {residents
            .filter((r) => r.status !== "Discharged")
            .map((resident, i) => (
              <div className="active-residents" key={i}>
                <Card
                  className="cardActiveResident"
                  style={{ width: "200px", height: "auto", backgroundColor: allComplete(resident) ? "lightgreen" : "white" }}
                >
                  <div>
                    <Card.Body
                      style={{ backgroundColor: "gray" }}
                      onClick={() => {
                        history.push(`/tasks/${resident.id}`);
                      }}
                    >
                      <Card.Img className="active-resident-img"
                        id="active-resident-img"
                        variant="top"
                        src={resident.image ?? "/images/default-profile-picture.jpg"}
                      />
                    </Card.Body>
                    <Card.Body
                      onClick={() => {
                        history.push(`/tasks/${resident.id}`);
                      }}
                    >
                      <Card.Text>
                        <strong>{resident.first_name} {resident.last_name}</strong>
                      </Card.Text>
                      <Card.Text><strong>Room ID:</strong> {resident.room_number}</Card.Text>
                      <Card.Text>
                        <strong>Birthday:</strong>{" "}
                        {moment(resident.birthday).format("MM/DD/YYYY")}
                      </Card.Text>
                    </Card.Body>
                  </div>
                  <div className="d-flex flex-row">
                    {user.role === "admin" && (
                      <button
                        variant="custom"
                        className="activeResidentbtn"
                        onClick={() =>
                          history.push(`/residents/housing/${resident.id}`)
                        }
                      >
                        Assign Room
                      </button>
                    )}
                    {user.role === "admin" && (
                      <button
                        variant="custom"
                        className="activeResidentbtn"
                        onClick={() =>
                          history.push(`/residents/allergies/${resident.id}`)
                        }
                      >
                        Assign Allergies
                      </button>
                    )}
                  </div>
                </Card>
              </div>
            ))}
        </Col>
      </Row>
    </div>
  );
}

export default ActiveResidents;
