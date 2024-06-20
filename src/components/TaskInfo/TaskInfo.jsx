import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import assistanceReducer from '../../redux/reducers/assistance.reducer';

function TaskInfo() {
   const residents = useSelector((store) => store.residentsReducer);
//    const [newResident, setNewResident] = useState('');
   const dispatch = useDispatch();
   const history = useHistory();
   const params = useParams();
   const {id} = params;
   console.log('Task Id ', id);
   const assistanceReducer = useSelector((store) => store.assistanceReducer);

   useEffect(() => {
      dispatch({type: 'FETCH_ASSISTANCE'})
   }, []);

   return (
      <div className="container">
         <h2>Task Info</h2>

         {assistanceReducer.map((assistance, i) => <div key={i}>
         <Card style={{ width: '18rem' }}>
            <Card.Body>
                    <Card.Text>{assistance.type}</Card.Text>
            </Card.Body>
         </Card>
         </div>
        )
    }
   </div>
)}

export default TaskInfo;