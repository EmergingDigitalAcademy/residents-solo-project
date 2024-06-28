import Card from "react-bootstrap/Card";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./ResidentInfo.css";

function TaskDetail({ task, residentId, filteredTasksResidents }) {
  const history = useHistory();

  return (
    <div className="container, taskDetailCard">
      <Card
        style={{
          width: "18rem",
          cursor: "pointer",
          backgroundColor: filteredTasksResidents?.find(
            (r) => Number(r.tasks_id) === Number(task.id)
          )?.assistance_id
            ? "lightgreen"
            : "white",
        }}
      >
        <Card.Body
          className="taskdetailcardbody"
          onClick={() => {
            history.push(`/residents/${residentId}/tasks/${task.id}`);
          }}
        >
          <Card.Text className="embNameTaskDetail">
            {task.emblem} {task.name}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default TaskDetail;
