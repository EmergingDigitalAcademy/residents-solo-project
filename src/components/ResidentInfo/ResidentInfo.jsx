import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Card from "react-bootstrap/Card";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Button } from "react-bootstrap";
import TaskDetail from "./TaskDetail";
import './ResidentInfo.css';

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
    <div>
      <h2>Resident Info</h2>
      <div className="container">
        <Card style={{ width: "200px", height: "auto"}}>
          <Card.Body>
            <Card.Img variant="top" src="/images/default-profile-picture.jpg" />
            <Card.Text>
              {resident[0]?.first_name} {resident[0]?.last_name}
            </Card.Text>
            <Card.Text>
               {resident[0]?.type}
            </Card.Text>
            <Card.Text>{resident[0]?.birthday}</Card.Text>
          </Card.Body>
        </Card>
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
      <div>
        <Button onClick={() => history.push("/residents")}>
          Back to Active Residents
        </Button>
      </div>
    </div>
  );
}

export default ResidentInfo;
