import Card from 'react-bootstrap/Card';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


function TaskDetail({task, residentId, filteredTasksResidents}) {
    const history = useHistory();

    return (
        <div className="container">
         <Card style={{ width: '18rem', backgroundColor: filteredTasksResidents?.find((r) => Number(r.tasks_id) === Number(task.id))?.assistance_id ? 'green' : 'white'}}>
            <Card.Body onClick={() => {history.push(`/residents/${residentId}/tasks/${task.id}`)}}>
                    <Card.Text>{task.emblem} {task.name}</Card.Text>
            </Card.Body>
         </Card>
         </div>
        )
    }

export default TaskDetail;

/*
<div className="container">
         {tasksResidents.filter((t) => Number(t.resident_id) === Number(id)).map((task, i) => <div key={i}>
         <Card style={{ width: '18rem', backgroundColor: task.assistance_id ? 'green' : 'white'}}>
            <Card.Body>
                    <Card.Text>{task.assistance_id}</Card.Text>
            </Card.Body>
         </Card>
         </div>
        )
    }
    </div>
*/