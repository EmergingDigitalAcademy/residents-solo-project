import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

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
      <h2>Assistance Info</h2>
      <div className="container">
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Text>
              {tasks[0]?.name} {tasks[0]?.emblem}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      <div>
        <Button onClick={() => history.push(`/tasks/${resident_id}`)}>
          Back to Resident Info
        </Button>
      </div>
      {assistanceReducer.map((assistance, i) => (
        <div key={assistance.id}>
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Text
                onClick={() => handleUpdateTask(assistance.id, params)}
              >
                {assistance.type}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default TaskInfo;
