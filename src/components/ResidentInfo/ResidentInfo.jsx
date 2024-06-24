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
   console.log('resident info params', params);
   console.log('Resident Id ', id);

   const history = useHistory();

   const resident = residents.filter(res => res.id === id);
   console.log('resident', resident);

   useEffect(() => {
      dispatch({type: 'FETCH_TASKS'})
      dispatch({type: 'FETCH_RESIDENTS'})
   }, []);

   return (
      <div>
         <h2>Resident Info</h2>
         <div className="container">
               <Card style={{width: '18rem'}}>
                  <Card.Body>
                     <Card.Img variant='top' src='/images/default-profile-picture.jpg' />
                     <Card.Text>{resident[0].first_name} {resident[0].last_name}</Card.Text>
                     <Card.Text>{resident[0].birthday}</Card.Text>
                  </Card.Body>
               </Card>
      </div>
      <div className="container">
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
   </div>
)}

export default ResidentInfo;