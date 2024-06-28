import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import TaskDetail from "./TaskDetail";
import "./ResidentInfo.css";
import moment from "moment";
import { Card, Row, Col } from "react-bootstrap";

function ResidentInfo() {
  const residents = useSelector((store) => store.residentsReducer);
  const tasks = useSelector((store) => store.tasksReducer);
  const tasksResidents = useSelector((store) => store.tasksResidentsReducers);
  const assistance = useSelector((store) => store.assistanceReducer);
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;
  const filteredTasksResidents = tasksResidents.filter(
    (t) => Number(t.resident_id) === Number(id)
  );
  console.log("Filtered Resident Tasks", filteredTasksResidents);

  console.log("tasks resident with assistance");
  console.log("tasks residents", tasksResidents);
  console.log("resident info params", params);
  console.log("Resident Id ", id);
  console.log("assistance", assistance[0]?.id);
  console.log("residents", residents[0]?.id);

  const history = useHistory();

  const resident = residents?.filter((res) => res.id === id);
  console.log("resident", resident);

  useEffect(() => {
    dispatch({ type: "FETCH_TASKS" });
    dispatch({ type: "FETCH_RESIDENTS" });
    dispatch({ type: "FETCH_TASKS_RESIDENTS" });
    dispatch({ type: "FETCH_ASSISTANCE" });
  }, []);

  return (
    <div className="container">
      <h2 className="residentInfoTitle">Resident Tasks</h2>
      <Row className="mb-4">
        <Col xs="12">
          <div className="container">
            <Card style={{ width: "auto", height: "auto", border: "0" }}>
              <Card.Body className="d-flex flex-row">
                <Card.Img
                  style={{ width: "200px", height: "200px" }}
                  variant="top"
                  src={
                    resident[0].image ?? "/images/default-profile-picture.jpg"
                  }
                />
                <Card.Body className="residentInfoText">
                  <Card.Text className="residentInfoName">
                    {resident[0]?.first_name} {resident[0]?.last_name}
                  </Card.Text>
                  <Card.Text className="residentInfoID">
                    <strong>Room ID:</strong> {resident[0]?.room_number}
                  </Card.Text>
                  <Card.Text className="residentInfoAllergy">
                    <strong>Allergies:</strong> {resident[0]?.allergies}
                  </Card.Text>
                  <Card.Text className="residentInfoBirthday">
                    <strong>Birthday:</strong>{" "}
                    {moment(resident[0]?.birthday).format("MM/DD/YYYY")}
                  </Card.Text>
                </Card.Body>
              </Card.Body>
            </Card>
          </div>
        </Col>
        <Col xs="12">
          <div className="container">
            <button
              className="backbtnResidentInfo"
              onClick={() => history.push("/residents")}
            >
              Back to Active Residents
            </button>
          </div>
        </Col>
        <Col>
          <div className="container">
            {tasks.map((task, i) => (
              <TaskDetail
                key={i}
                task={task}
                residentId={id}
                filteredTasksResidents={filteredTasksResidents}
              />
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default ResidentInfo;
