import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Card from "react-bootstrap/Card";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Button } from "react-bootstrap";
import TaskDetail from "./TaskDetail";
import "./ResidentInfo.css";
import moment from "moment";

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
    <div id="ResidentInfo-Return" className="container">
      <h2 style={{marginLeft: "70px"}}>Resident Info</h2>
      <div className="container">
        <Card style={{ width: "500px", height: "auto", border: "0"}}>
          <Card.Body>
            <Card.Img style={{width: "200px", height: "200px"}} variant="top" src="/images/default-profile-picture.jpg" />
            <Card.Text>
              {resident[0]?.first_name} {resident[0]?.last_name}
            </Card.Text>
            <Card.Text>ID: {resident[0]?.room_number}</Card.Text>
            <Card.Text>Allergies: {resident[0]?.allergies}</Card.Text>
            <Card.Text>
              Birthday: {moment(resident[0]?.birthday).format("MM/DD/YYYY")}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>

      <div>
        <button style={{marginLeft: "70px"}} onClick={() => history.push("/residents")}>
          Back to Active Residents
        </button>
      </div>

      <div className="container">
        {tasks.map((task, i) => (
          <TaskDetail
            id="tasks-resident-info"
            key={i}
            task={task}
            residentId={id}
            filteredTasksResidents={filteredTasksResidents}
          />
        ))}
      </div>
    </div>
  );
}

export default ResidentInfo;
