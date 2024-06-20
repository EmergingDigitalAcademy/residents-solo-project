import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Card from 'react-bootstrap/Card';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

function ResidentInfo() {
   const residents = useSelector((store) => store.residentsReducer);
   const tasks = useSelector((store) => store.tasksReducer);
   const dispatch = useDispatch();
   const params = useParams();
   const {id} = params;
   console.log('Resident Id ', id);

   const history = useHistory();

   useEffect(() => {
      dispatch({type: 'FETCH_TASKS'})
   }, []);

   return (
      <div className="container">
         <h2>Resident Info</h2>
         {tasks.map((task, i) => <div key={i}>
         <Card style={{ width: '18rem' }}>
            <Card.Body onClick={() => {history.push(`/residents/${id}/tasks/${task.id}`)}}>
                    <Card.Text>{task.emblem} {task.name}</Card.Text>
            </Card.Body>
         </Card>
         </div>
        )
    }
   </div>
)}

export default ResidentInfo;