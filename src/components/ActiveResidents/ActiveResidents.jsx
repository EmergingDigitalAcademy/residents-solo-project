import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

function ActiveResidents() {
    const user = useSelector((store) => store.user);
   const residents = useSelector((store) => store.residentsReducer);
//    const [newResident, setNewResident] = useState('');
   const dispatch = useDispatch();
   const history = useHistory();

//    const handleSubmit = (e) => {
//       e.preventDefault();
//     //   dispatch({ type: 'ADD_RESIDENTS', payload: { name: newResident } });
//     //   setNewResident('');
//    }

   useEffect(() => {
      dispatch({type: 'FETCH_RESIDENTS'})
   }, []);

   return (
      <div className="container">
         <h2>Active Residents</h2>

         {residents.filter((r) => r.status !== 'Discharged').map((resident, i) => <div key={i}>
         <Card style={{ width: '18rem' }}>
            <Card.Body onClick={() => {history.push(`/tasks/${resident.id}`)}}>
                    <Card.Img variant='top' src={resident.image} />
                    <Card.Text>{resident.first_name} {resident.last_name}</Card.Text>
                    <Card.Text></Card.Text>
                    <Card.Text>{resident.birthday}</Card.Text>
            </Card.Body>
            {user.role === 'admin' && <Button onClick={() => history.push(`/residents/housing/${resident.id}`)}>Assign Room</Button>}
         </Card>
         </div>
        )
    }
   </div>
)}

export default ActiveResidents;