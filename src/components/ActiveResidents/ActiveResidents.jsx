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
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: "FETCH_RESIDENTS" });
  }, []);

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
                  style={{ width: "200px", height: "auto" }}
                >
                  <div>
                    <Card.Body
                      style={{ backgroundColor: "gray" }}
                      onClick={() => {
                        history.push(`/tasks/${resident.id}`);
                      }}
                    >
                      <Card.Img
                        id="active-resident-img"
                        variant="top"
                        src="/images/default-profile-picture.jpg"
                      />
                    </Card.Body>
                    <Card.Body
                      onClick={() => {
                        history.push(`/tasks/${resident.id}`);
                      }}
                    >
                      <Card.Text>
                        {resident.first_name} {resident.last_name}
                      </Card.Text>
                      <Card.Text>ID: {resident.room_number}</Card.Text>
                      <Card.Text>
                        Birthday:{" "}
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
