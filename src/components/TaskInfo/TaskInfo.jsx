import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import "./TaskInfo.css";
import {
  Container,
  Navbar,
  Nav,
  Button,
  Dropdown,
  Card,
  Row,
  Col,
  Alert,
  ListGroup,
} from "react-bootstrap";

function TaskInfo() {
  const tasksResidents = useSelector((store) => store.tasksResidents);
  console.log("tasks residents reducer", tasksResidents);
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  console.log("params", params);
  const { tasks_id, resident_id } = params;
  console.log("Task Id, resident id ", tasks_id, resident_id);
  const assistanceReducer = useSelector((store) => store.assistanceReducer);
  const tasksReducer = useSelector((store) => store.tasksReducer);

  const tasks = tasksReducer?.filter((tasks) => tasks.id === tasks_id);
  console.log("resident", tasks);

  useEffect(() => {
    dispatch({
      type: "FETCH_ASSISTANCE",
      payload: params,
    });
    dispatch({ type: "FETCH_TASKS" });
  }, []);

  const handleUpdateTask = (assistance_id, params) => {
    dispatch({
      type: "UPDATE_TASKS",
      payload: { assistance_id, ...params },
    });
    console.log(params);
    console.log("assistance", assistance_id);
  };

  return (
    <div className="container">
      <h2 className="taskInfoTitle">Assistance Info</h2>
      <Row>
        <Col xs="12">
          <div className="container">
            <Card
              className="taskInfoName"
              style={{ width: "18rem", border: "0" }}
            >
              <Card.Body>
                <Card.Text>{tasks[0]?.name}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        </Col>
        <Col xs="12">
          <div className="container">
            <button
              className="backbtnTaskInfo"
              onClick={() => history.push(`/tasks/${resident_id}`)}
            >
              Back to Resident Info
            </button>
          </div>
        </Col>
        <Col xs="12">
          {assistanceReducer.map((assistance, i) => (
            <div className="container, taskInfoCard" key={assistance.id}>
              <Card style={{ width: "18rem" }}>
                <Card.Body className="taskInfocardbody">
                  <Card.Text
                    onClick={() => handleUpdateTask(assistance.id, params)}
                  >
                    {assistance.type}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
        </Col>
      </Row>
    </div>
  );
}

export default TaskInfo;
