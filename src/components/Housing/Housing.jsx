import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

function AssignResident() {
   const housing = useSelector((store) => store.housingReducer);
//    const [newResident, setNewResident] = useState('');
   const dispatch = useDispatch();
   const history = useHistory();
   const params = useParams();
   const { resident_id } = params
   console.log('resident id params', resident_id);

//    const handleSubmit = (e) => {
//       e.preventDefault();
//     //   dispatch({ type: 'ADD_RESIDENTS', payload: { name: newResident } });
//     //   setNewResident('');
//    }

const handleAssignRoom = (roomNumber) => {
    console.log(`Assign ${resident_id} to room ${roomNumber} `)
    dispatch({
        type: 'UPDATE_HOUSING',
        payload: {resident_id, room_number: roomNumber}
    })
}

   useEffect(() => {
      dispatch({type: 'FETCH_HOUSING'})
   }, []);

   return (
      <div className="container">
         <h2>Housing</h2>

         {housing.filter((h) => !h.resident_id).map((house, i) => <div key={i}>
                    <div>
                        room number: {house.room_number}, hall: {house.hall}, floor: {house.floor}
                        <Button onClick={() => handleAssignRoom(house.room_number)}>Assign Room</Button>
                    </div>
         </div>
        )
    }
   </div>
)}

export default AssignResident;