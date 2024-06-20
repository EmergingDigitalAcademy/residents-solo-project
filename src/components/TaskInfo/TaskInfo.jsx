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
   const tasksResidents = useSelector((store) => store.tasksResidents);
   console.log('tasks residents reducer', tasksResidents);
//    const [newResident, setNewResident] = useState('');
   const dispatch = useDispatch();
   const history = useHistory();
   const params = useParams();
   console.log('params', params);
   const {id} = params;
   console.log('Task Id ', id);
   const assistanceReducer = useSelector((store) => store.assistanceReducer);

   useEffect(() => {
      dispatch({
        type: 'FETCH_ASSISTANCE',
        payload: params
        })
   }, []);

   const handleUpdateTask = (assistance_id, params) => {
    dispatch({
       type: 'UPDATE_TASKS',
       payload: {assistance_id, ...params}
    });
    console.log(params);
    console.log('assistance', assistance_id);
 };
  

   return (
      <div className="container">
         <h2>Assistance Info</h2>
         {assistanceReducer.map((assistance, i) => <div key={assistance.id}>
         <Card style={{ width: '18rem' }}>
            <Card.Body>
                    <Card.Text onClick={() => handleUpdateTask(assistance.id, params)}>{assistance.type}</Card.Text>
            </Card.Body>
         </Card>
         </div>
        )
    }
   </div>
)}

export default TaskInfo;