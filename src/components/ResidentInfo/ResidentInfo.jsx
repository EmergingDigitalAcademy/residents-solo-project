import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

function ActiveResidents() {
   // const residents = useSelector((store) => store.residentsReducer);
   const tasks = useSelector((store) => store.tasksReducer);
//    const [newResident, setNewResident] = useState('');
   const dispatch = useDispatch();
   const params = useParams();
   const {id} = params;
   console.log('Resident Id ', id);

   const history = useHistory();

//    const handleSubmit = (e) => {
//       e.preventDefault();
//     //   dispatch({ type: 'ADD_RESIDENTS', payload: { name: newResident } });
//     //   setNewResident('');
//    }

   useEffect(() => {
      dispatch({type: 'FETCH_TASKS'})
   }, []);

   return (
      <div className="container">
         <h2>Active Residents</h2>
         {/* <form onSubmit={handleSubmit}> */}
            {/* <input onChange={e => setNewPet(e.target.value)} /*value={newResident} /> */}
            {/* <button>Add Resident</button> */}
         {/* </form> */}
         {tasks.map((task, i) => <div key={i}>
         <Card style={{ width: '18rem' }}>
            <Card.Body onClick={() => {history.push(`/${resident.id}`)}}>
                    <Card.Text>{task.emblem} {task.name}</Card.Text>
            </Card.Body>
         </Card>
         </div>
        )
    }
   </div>
)}

export default ActiveResidents;