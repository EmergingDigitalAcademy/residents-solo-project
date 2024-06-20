import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function AdmitResident() {
//    const residents = useSelector((store) => store.residentsReducer);
   const [newResident, setNewResident] = useState('');
   const dispatch = useDispatch();

   const history = useHistory();

   const handleSubmit = (e) => {
      e.preventDefault();
      dispatch({ 
        type: 'ADD_RESIDENTS', 
        payload: { 
            first_name: newResident,
            last_name: newResident,
            birthday: newResident,
            image: newResident,
            term: newResident,
        } });
      setNewResident('');
   }

//    useEffect(() => {
//       dispatch({type: 'FETCH_RESIDENTS'})
//    }, []);

   return (
      <div className="container">
         <h2>Admit Resident</h2>
         <form onSubmit={handleSubmit}> 
            <input onChange={e => setNewResident(e.target.value)} value={newResident.first_name} placeholder='First Name'/>
            <input onChange={e => setNewResident(e.target.value)} value={newResident.last_name} placeholder='Last Name'/> 
            <input onChange={e => setNewResident(e.target.value)} value={newResident.birthday} placeholder='Birthday'/> 
            <input onChange={e => setNewResident(e.target.value)} value={newResident.image} placeholder='Image'/> 
            <button type='radio' value={newResident.term} >Term</button>
            <button onClick={() => {history.push('./residents')}}>Add Resident</button>
          </form>
         {/* {residents.map((resident, i) => <div key={i}>
         <Card style={{ width: '18rem' }}>
            <Card.Body onClick={() => {history.push('./tasks')}}>
                    <Card.Img variant='top' src={resident.image} />
                    <Card.Text>{resident.first_name} {resident.last_name}</Card.Text>
                    <Card.Text></Card.Text>
                    <Card.Text>{resident.birthday}</Card.Text>
            </Card.Body>
         </Card>
         </div>
        )
    } */}
   </div>
)}

export default AdmitResident;