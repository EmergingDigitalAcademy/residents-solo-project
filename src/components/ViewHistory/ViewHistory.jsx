import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Card from 'react-bootstrap/Card';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

function ResidentInfo() {
   const residents = useSelector((store) => store.residentsReducer);
   const tasks = useSelector((store) => store.tasksReducer);
   const transactions = useSelector((store) => store.transactionReducer)
   const dispatch = useDispatch();
   const params = useParams();
   const { id } = params;
   console.log('Resident Id ', params);

   const history = useHistory();

   useEffect(() => {
      dispatch({type: 'FETCH_TRANSACTIONS', payload: {resident_id: id}})
   }, []);

   return (
      <div className="container">
         <h2>Resident History</h2>
         <table>
        <thead>
          <tr>
            <th>Log Type</th>
            <th>Date</th>
            <th>Room Number</th>
          </tr>
        </thead>
        <tbody>
         {transactions.map((transaction, i) =>
         <tr key={i}>
              <td>{transaction.log_type}</td>
              <td>{transaction.date}</td>
              <td>{transaction.Room_Number}</td>
            </tr>
        )
    }
        </tbody>
      </table>
   </div>
)}

export default ResidentInfo;